import { Card, Text } from "@nextui-org/react";
import classes from "./Card.module.css"
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
export default function CardB({title,date,discription,name,id}:{
  title:string,
  date:string,
  discription:string,
  name:string,
  id:string
}){
  const router =useRouter()
  const text=discription

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
        router.push(`/community/${id}`)
      }}
      isPressable
      isHoverable
      borderWeight="bold"
      variant="bordered"
      css={{
        height:"455px"
      }}
    >
      <Card.Header>
            <Text b css={{
          fontSize:"1.8rem"
        }}>{title.toUpperCase()}</Text>
          
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
        }}>{(text.length>659)?text.slice(0,658)+"...":text}</Text>
      </Card.Body>
      <Card.Footer>
        <Text css={{
          fontSize:"1.2rem"
        }}>{`- ${name}`}</Text>
      </Card.Footer>
      <Card.Footer>
        <Text b color="secondary">{"Tap For Detail Page of Story ->"}</Text>
      </Card.Footer>
    </Card>
    </motion.div>
}