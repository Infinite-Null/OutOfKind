import { Button, Card, Loading, Text } from "@nextui-org/react";
import classes from "../Card/Card.module.css"
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from 'react';
export default function MyBlogs({title,date,discription,name,id,fetchBlog}:{
  title:string,
  date:string,
  discription:string,
  name:string,
  id:string,
  fetchBlog:()=>void
}){
  const router =useRouter()
  const Data:any=useSession()
  const [loding,setLoding]=useState(false)
  const text=discription
   async function DeleteBlog() {
    setLoding(()=>true)
    try{
        await axios.delete(`/api/Blogs?BlogId=${id}`,{
            headers:{
                Authorization:`Bearer ${Data.data?.user.token}`
            }
        })
    }catch(e){
        console.log(e)
    }
    setLoding(()=>false)
   fetchBlog()
   }
    return <motion.div  
    initial={{
      y:100,
    }}
    animate={{
      y:0
    }}
    className={classes.card}>
      <Card
      onClick={()=>{
        router.push(`/${id}`)
      }}
      isPressable
      isHoverable
      borderWeight="bold"
      variant="bordered"
    >
      <Card.Header>
            <Text b css={{
          fontSize:"1.8rem"
        }}>{title?.toUpperCase()}</Text>
          
      </Card.Header>
      <Card.Header>
            <Text b css={{
          fontSize:"1rem",
          fontWeight:"100"
        }}>{date}</Text>
      </Card.Header>
      
      <Card.Body>
        <Text css={{
         margin:"20px",
        }}>{(text?.length>659)?text?.slice(0,658)+"...":text}</Text>
         <Text css={{
          fontSize:"1.2rem"
        }}>{`- ${name}`}</Text>
      </Card.Body>
      <Card.Footer>
        {(loding==true)&&<Button disabled><Loading type="points" size="sm"/></Button>}
      {(loding===false)&& <Button color='error' onPress={DeleteBlog}>Delete</Button>}
      </Card.Footer>
      <Card.Footer>
        <Text b color="secondary">{"Tap For Detail Page of Blog ->"}</Text>
      </Card.Footer>
    </Card>
    </motion.div>
}