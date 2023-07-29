import connectMongo from '@/Backend/Utils/connect'
import VerifyToken from '@/Backend/Utils/middleWare';
import type { NextApiRequest, NextApiResponse } from 'next'
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
    if(req.method=="POST"){
    const{blogId,userId}=req.body
    const user=require('../../../Backend/Models/userSchema')
    user.updateOne({_id:userId},{$push:{
        liked:blogId
    }}).then((doc:any)=>{
        const response:any={
            message:"success",
            details:doc
        }
        res.status(200).json(response)
    }).catch((e:any)=>{
        const response:any={
            message:"failed",
            details:e
        }
        res.status(500).json(response)
    })
    }
  }