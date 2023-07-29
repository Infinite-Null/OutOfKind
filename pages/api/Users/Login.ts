import connectMongo from '@/Backend/Utils/connect';
import type { NextApiRequest, NextApiResponse } from 'next'
const user=require('../../../Backend/Models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
type Data = {
    name: string
  }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    await connectMongo()
    if(req.method=='POST'){
        const{email,password}=req.body
        user.findOne({email:email}).then((doc:any)=>{
            if(doc==null){
                const response:any={
                    message:"Success",
                    details:"No User Found"
                }
                res.status(200).json(response)
            }
            else{
                bcrypt.compare(password,doc.password).then((r:boolean)=>{
                    if(r){
                        const head={
                            name:doc.name,
                            _id:doc._id
                        }
                        jwt.sign({head},process.env.KEY as string,{ expiresIn: '30d' },(err:any,token:string)=>{
                            if(err){
                                const response:any={
                                    message:"Failed",
                                    details:err
                                }
                                res.status(500).json(response)
                            }else{
                                const response:any={
                                    message:"Success",
                                    details:{
                                        _id:doc._id,
                                        Name:doc.name,
                                        email:doc.email
                                    },
                                    token:token
                                }
                                res.status(200).json(response)
                            }
                        })
                    }else{
                        const response:any={
                            message:"Failed",
                            details:"Password Incorrect"
                        }
                        res.status(200).json(response)
                    }
                })
                
            }
        }).catch((e:any)=>{
            const response:any={
                message:"Auth Failed",
                details:e
            }
            res.status(404).json(response)
        })
    }
  }