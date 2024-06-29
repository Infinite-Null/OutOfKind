import type { NextApiRequest, NextApiResponse } from 'next'
const Donation = require("../../../Backend/Models/donationsSchema")
import connectMongo from '@/Backend/Utils/connect';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo()
    if(req.method=='GET'){
     Donation.find({}).populate("users","name").then((doc:any)=>{
        const response:any={
            message:"success",
            details:doc
        }
        res.status(200).json(response)
     }).catch((e:any)=>console.log(e))
    }
}
export default handler;
