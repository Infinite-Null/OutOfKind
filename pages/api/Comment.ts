import connectMongo from '@/Backend/Utils/connect'
import VerifyToken from '@/Backend/Utils/middleWare'
import type { NextApiRequest, NextApiResponse } from 'next'
const BlogS=require('../../Backend/Models/blogs')
type Data = {
    name: string
  }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
   

    if(req.method=="GET"){
        await connectMongo()
        const {BlogId}=req.query
        BlogS.findOne({_id:BlogId}).select("Comments").then((doc:any)=>{
            const response:any={
                message:"Success",
                details:doc
            }
            res.status(200).json(response)
            return;
        }).catch((e:any)=>{
            const response:any={
                message:"Failed",
                details:e
            }
            res.status(200).json(response)
            return;
        })
        return;
    }




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
    if(req.method=="POST"){
        const{Name,Comment,BlogId}=req.body
        BlogS.updateOne({_id:BlogId},{$push:{
            Comments:{
                Name:Name,
                Comment:Comment
            }
        }}).then((blog:any)=>{
            const response:any={
                message:"Success",
                details:blog
            }
            res.status(200).json(response)
        }).catch((e:any)=>{
            const response:any={
                message:"Failed",
                details:e
            }
            res.status(200).json(response)
        })
    }
  }