import connectMongo from '@/Backend/Utils/connect'
import VerifyToken from '@/Backend/Utils/middleWare'
import type { NextApiRequest, NextApiResponse } from 'next'
const user=require('../../../Backend/Models/userSchema')
const blog=require('../../../Backend/Models/blogs')
type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        if(VerifyToken(token)===false){
            const response:any={
                message:"failed",
                details:"token invaild"
            }
            return  res.status(403).json(response)
        }
    } else {
        const response:any={
            message:"failed",
            details:"token invaild"
        }
        return  res.status(403).json(response)
    }
    await connectMongo()
    if(req.method=="GET"){
        const {UserId}=req.query
        try{
            const doc=await user.findOne({_id:UserId}).select("_id name liked myBlog email").populate("myBlog","_id users title discription date").populate("liked").exec()
            const response:any={
                message:"success",
                Blogs:doc
              }
              res.json(response)
        }catch(e){
            console.log(e)
            const response:any={
                message:"failed",
                Blogs:e
              }
              res.json(response)
        }
    }
  }