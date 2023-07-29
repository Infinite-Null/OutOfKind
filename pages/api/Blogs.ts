// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongo from '@/Backend/Utils/connect'
import VerifyToken from '@/Backend/Utils/middleWare'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
const BlogS=require('../../Backend/Models/blogs')
const user=require('../../Backend/Models/userSchema')
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectMongo()
  //  if(req.method=="GET"){
  //   try{
  //     const doc=await BlogS.find().select("_id users title discription Date").populate("users","name").exec()
  //     const response:any={
  //       message:"success",
  //       Blogs:doc
  //     }
  //     res.status(200).json(response)
  //     return;
  //   }catch(e){
  //     const response:any={
  //       message:"failed",
  //       Blogs:e
  //     }
  //     res.status(200).json(response)
  //     return;
  //   }
  //  }

    if(req.method=="GET"){
      try{
        const {page}=req.query
        const page_no=parseInt(page as string)-1

        const skip=page_no*6
        console.log(page_no)
        const doc=await BlogS.find().exec()
        const Blogs=await BlogS.find().sort({ createdAt: -1 }).select("_id users title discription Date createdAt").populate("users","name").skip(skip).limit(6).exec()
        const response:any={
                message:"success",
                EachPage:6,
                Total:doc.length,
                Blogs:Blogs
          }
        res.status(200).json(response)
        return;
      }catch (e) {console.log(e)}
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
   if(req.method=="DELETE"){
    await connectMongo()
    const{BlogId}=req.query
    
    BlogS.deleteOne({_id:BlogId}).then((doc:any)=>{
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
      res.status(500).json(response)
    })
   }
   if(req.method=="PATCH"){
    const{BlogId}=req.query
    
    BlogS.updateOne({_id:BlogId},req.body).then((doc:any)=>{
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
      res.status(500).json(response)
    })
   }
   if(req.method=="POST"){
   const {Title,Discription,UserId}=req.body
   await connectMongo()
   console.log("Connected")
   const blogId=new mongoose.Types.ObjectId()
   const Blog=new BlogS({
    _id:blogId,
    title:Title,
    discription:Discription,
    Comments:[],
    users:UserId,
   })
   Blog.save().then((doc1:any)=>{
    user.updateOne({_id:UserId},{$push:{myBlog:blogId}}).then((doc:any)=>{
      const response:any={
        message:"Success",
        detail:doc1,
      }
      res.status(200).json(response)
    })
   }).catch((e:any)=> {
    const response:any={
      message:"Error",
      detail:e
    }
    res.status(500).json(response)
   })
  }
}
