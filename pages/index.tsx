import DonationCard from "@/Components/DonationCard/DonationCard"
import Section1 from "@/Components/Section1/MainSection1"
import Section2 from "@/Components/Section2/MainSection1"
import { Loading, Text } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState, Dispatch, SetStateAction, } from "react"

export default function App(){
   type donation={
      "message": string,
      "details": {
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
  }
   const[data,setData]:[donation,Dispatch<SetStateAction<donation>>]=useState({
      "message": "",
      "details": [
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
      ]
  })
  const [loding,setLoding]=useState(false)

    async function Fetch(){
      try{
      const response=await axios.get('/api/Donations/GetDonations')
      const FinalData=response.data
      setData((prev)=>prev=FinalData)
      }catch (e){
         console.log(e)
      }
    }
    useEffect(()=>{
        setLoding(()=>true)
        Fetch()
        setLoding(()=>false)
        return()=>{

        }
    },[])
    return <>
    <Section1 image={`url("https://images.pond5.com/happy-employees-connect-jigsaw-puzzles-illustration-201396481_iconl_nowm.jpeg")`} title="Community" discription="Here you can share your story of something good you have done and encourage others to do the same." Toref="/community" button="Connect Now"/>
    <Section2 image={`url("https://img.freepik.com/premium-vector/woman-pointing-web-browser-online-search-engine-bars-seo-optimization-concept-illustration_270158-291.jpg")`} title="Search" discription="Here you can search for nearby ngo and there details." Toref="/Search" button="Search Now"/>
     <center style={{
        marginTop:"30px"
     }}><Text b size='$7xl'>Donations</Text></center>
     <div style={{
        margin:"20px"
     }}>
     <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
        gap:"20px"
     }}>
      {(data.details.length===0)&&<Text>Be the frist one to donate</Text>}
   {(loding)&&<div style={{height:"60vh",display:"flex",alignItems:"center",justifyContent:"center"}}><Loading size="xl" color='secondary'/></div>}
     {(data.details.length!=0)&&!loding&&data.details.map((e)=><DonationCard title={e.title} discription={e.discription} image1={e.image1} image2={e.image2} image3={e.image3} UserName={e.users.name} ava={e.avaliable} _id={e._id}/>)}
     </div>
     </div>
    </>
}