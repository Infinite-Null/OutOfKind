import { Button, Card, Input, Loading, Row, Text } from "@nextui-org/react";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classes from "../Search/style.module.css"
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import Image from "next/image";

export default function Search(){
    type REult={
        title: string,
        snippet: string,
        formattedUrl: string,
        htmlFormattedUrl: string,
        pagemap: {
            cse_thumbnail: {
                src: string,
                width: string,
                height: string
            }[]
        }
    }[]
    const[input,useInput]=useState("")
    const[loding,setLoding]=useState(false)
    const router=useRouter()
   const string=""
    const [result,setResult]:[REult,Dispatch<SetStateAction<REult>>]=useState([
        {
            title: string,
            snippet: string,
            formattedUrl: string,
            htmlFormattedUrl: string,
            pagemap: {
                cse_thumbnail: [{
                    src: string,
                    width: string,
                    height: string
                }]
            }
        }
    ])
    async function Fetch() {
        if(input===""){
            alert("Fill all feild")
        }
        setLoding(()=>true)
        const response=await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDmvqc-dtVQCIMlCOGNtSpJeIzF-rX5LHM&cx=9867c733a42c0c643&q=list ngo in ${input}&start=0`)
        const FinalData=response.data.items
        setResult(()=>FinalData)
        setLoding(()=>false)
    }
    useEffect(()=>{
        return ()=>{

        }
    },[input])
    return  <motion.div 
    initial={{
        opacity:0,
        y:100
    }}
    animate={{
        opacity:1,
        y:0
    }}
    style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100vw"
    }}>
    <Text b size='$6xl'>Search</Text>
    <Input 
    labelLeft="Ngo_in:"
    clearable
    aria-label="Search"
    placeholder="Search your city"
    bordered 
    color="secondary"
    onChange={(prev)=>{
        useInput(()=>prev.target.value)
    }} 
    />
    <Button color='secondary'auto ghost css={{
        marginTop:"10px"
    }}
    onPress={()=>{
        Fetch()
    }}
    >Search</Button>
    {loding&&<div style={{
        height:"70vh",
        width:"100vw",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }}><Loading color="secondary" size="xl"/></div>}
    {!loding&&<div className={classes.container}>
        {result[0].title===""&&<img src="https://cdn.pixabay.com/animation/2022/07/29/14/46/14-46-54-82_512.gif" alt="Not found" width={200} height={200}/>}
        {result[0].title!==""&&result?.map((e,i)=><SearchBox key={i} title={e.title} discription={e.snippet} link={e.formattedUrl} image={(e?.pagemap?.cse_thumbnail===null||e?.pagemap?.cse_thumbnail===undefined)?"":e?.pagemap?.cse_thumbnail[0].src}/>)}
    </div>}
   </motion.div>
}

function SearchBox({title,discription,link,image}:{
    title:string,
    discription:string,
    link:string,
    image:string
}){
    return <motion.div
    style={{
        flexGrow: "1"
    }}
    initial={{
        y:200
    }}
    animate={{
        y:0
    }}
    >
        <Card css={{ mw: "100%", marginTop:"20px", border:"2px solid black"}}>
    <Card.Image src={image}>

    </Card.Image>
    <Card.Header>
      <Text b>{title.toUpperCase()}</Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body css={{ py: "$10" }}>
      <Text>
        {discription}
      </Text>
    </Card.Body>
    <Card.Divider />
    <Card.Footer>
      <Row justify="center">
      <a href={link} target="_blank"><Button size="sm" color="secondary">
         Learn More
        </Button></a>
      </Row>
    </Card.Footer>
  </Card>
    </motion.div>
}