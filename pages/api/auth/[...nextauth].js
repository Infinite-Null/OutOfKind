import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectMongo from '../../../Backend/Utils/connect'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userBase=require('../../../Backend/Models/userSchema')
export default NextAuth({
  session:{
    jwt:false
  },
  secret:"sece",
  providers: [
    CredentialsProvider({
      async authorize(credentials){
        await connectMongo()
       const result=await userBase.findOne({email:credentials.email})
       if(result===null){
        throw new Error("User Not Found")
       }
       const pass=await bcrypt.compare(credentials.password,result.password)
       if(pass===false){
        throw new Error("Incorrect Password")
       }
       console.log('Here')
       const head={
        name:result.name,
        _id:result._id
        }
       const token=await jwt.sign({},process.env.KEY,{ expiresIn: '30d' })
       const user={
        _id:result._id,
        Name:result.name,
        email:result.email,
        token:token
      }
      console.log(user)
      return user
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}){
      return {...token,...user}
    },
    async session({session,token,user}){
      session.user=token
      return session
    }
  }
})