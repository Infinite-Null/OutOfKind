import type { NextApiRequest, NextApiResponse } from 'next'
const Donation = require("../../../Backend/Models/donationsSchema")
const user = require("../../../Backend/Models/userSchema")
import mongoose from 'mongoose'
import VerifyToken from '@/Backend/Utils/middleWare';
import connectMongo from '@/Backend/Utils/connect';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectMongo()
    if(req.method=='GET'){
        const {UserId}=req.query
        user.findOne({_id:UserId}).select("myDonations").populate({
            path:"myDonations",
            populate:{
                path:"users",
                select:"name"
            }
        }).then((doc:any)=>{
            const response:any={
                message:"success",
                details:doc
            }
            return  res.status(200).json(response)
        }).catch((e:any)=>{
            console.log(e)
            return
        })
        return
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


   if(req.method==='POST'){
    const n={
     ...req.body
    }
    n._id=new mongoose.Types.ObjectId()
    const newDonation=new Donation(n)
    newDonation.save().then((doc:any)=>{
       user.updateOne({_id:n.users},{$push:{myDonations:n._id}}).then((doc1:any)=>{
        const response:any={
          message:"Success",
          detail:doc,
        }
        res.status(200).json(response)
      }).catch((e:any)=>console.log(e))
    }).catch((e:any)=>console.log(e))
   }
  if(req.method==='PATCH'){
    const {DonationId}=req.query
    const {value}=req.body
    Donation.updateOne({_id:DonationId},{avaliable:value}).then((doc:any)=>{
        const response:any={
            message:"Success",
            detail:doc,
          }
          res.status(200).json(response)
    }).catch((e:any)=>{console.log(e)})

  }
}

export default handler;