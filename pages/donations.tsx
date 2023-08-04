import { useSession } from 'next-auth/react';
import React from 'react'
import { useState, Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';
import  axios  from 'axios';
import DonationCardAccount from '@/Components/DonationCardAccount/DonationCardAccount';
import { Loading } from '@nextui-org/react';

export default function Donations() {
    const Data:any=useSession()
    type donation={
           "_id": string,
           "users": {
               "_id": string,
               "name": string
           },
           "title": string,
           "discription": string,
           "address": string,
           "contact": string,
           "image1": string,
           "image2": string,
           "image3": string,
           "avaliable": any,
           "createdAt": string,
           "updatedAt": string,
       }[]
    const [donations,setDonstions]:[donation,Dispatch<SetStateAction<donation>>]=useState( [
        {
            "_id": "",
            "users": {
                "_id": "",
                "name": ""
            },
            "title": "",
            "discription": "",
            "address": "",
            "contact": "",
            "image1": "",
            "image2": "",
            "image3": "",
            "avaliable": false,
            "createdAt": "",
            "updatedAt": "",
        }
    ]);
    const [loding,setLoding]=useState(false)
    async function Fetch(){
        const response=await axios.get('/api/Donations?UserId='+Data.data?.user._id)
        setDonstions((prev)=>prev=response.data.details.myDonations)
    }
    async function Loding(){
        setLoding(()=>true)
         await Fetch()
        setLoding(()=>false)
    }
    useEffect(()=>{
        Loding()
        return ()=>{}
    },[])
    if(!Data.data?.user._id){
        return <div>Please wait</div>
    }
  return (
    <div style={{height:"100vh",width:"100vw",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"start", paddingTop:"20px"}}>
        {loding&&<Loading size='xl'/>}
        {!loding&&donations.map((e,i)=><DonationCardAccount title={e.title} discription={e.discription} image1={e.image1} UserName={e.users.name} ava={e.avaliable} key={i} _id={e._id} fetch={Fetch}/>)}
    </div>
  )
}
