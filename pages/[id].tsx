import { Pagination, Text } from '@nextui-org/react'
import React,{useState} from 'react'
import classes from '../styles/detailPage/detail.module.css'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
export default function Details() {
  const router:any=useRouter()
  const[number,setNumber]=useState(0)
 const images:any=[router.query.image1,router.query.image2,router.query.image3]
  function Change(){
    return <motion.div
    initial={{
      x:200,
      opacity:0
    }}
    animate={{
      x:0,
      opacity:1
    }}
    style={{
      border:"2px solid black",
      borderRadius:"20px",
      width:"fit-content",
      margin:"10px",
      padding:"20px",
      boxShadow:"20px 0px 100px 1px rgba(0,0,0,0.15)"
     }}>
     <img src={images[number]}
      style={{
          objectFit:"cover",
          height:"400px",
          width:"400px",
      }}
      />
     </motion.div>
  }
  return <>
  <center><Text b size='$5xl'>{router.query.title}</Text></center>
  <div className={classes.Conatiner}>
   <div>
   <Change key={number}/>
   <Pagination shadow  size='md' total={3} onChange={(e)=>{
    if(e!=number)
    setNumber(()=>e-1)
   }}/>
   </div>
  <div className={classes.Discrip}>
   <Text b size='$2xl'>{router.query.discription}</Text><br/><br/>
   <Text b>{`by: ${router.query.UserName}`}</Text>
   <br/><br/>
   <div style={{
    border:"2px solid rgba(0,0,0,0.2)",
    borderRadius:"20px",
    padding:"20px"
   }}>
   <Text  size='$1xl'>{router.query.address}</Text>
   <Text >{`Contact: ${router.query.contact}`}</Text>
   </div>
   <br/><br/>
   <Text  size='$2xl' color={(router.query.ava===true)?'green':'secondary'}>{(router.query.ava===true)?"Available":"Donated"}</Text>
  </div>
    </div>
  </>
}
