import connectMongo from '@/Backend/Utils/connect'
import type { NextApiRequest, NextApiResponse } from 'next'
const BlogS=require('../../Backend/Models/blogs')
type Data = {
    name: string
  }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
  if(req.method=="GET"){
    await connectMongo()
    const {BlogId}=req.query
    BlogS.findOne({_id:BlogId}).select("message details title discription createdAt").populate("users","_id name").then((doc:any)=>{
        const response:any={
            message:"Success",
            details:doc
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