import { Button, Card, Input, Row, Text } from "@nextui-org/react";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classes from "../Search/style.module.css"
import { useRouter } from "next/router";

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
        const response=await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDmvqc-dtVQCIMlCOGNtSpJeIzF-rX5LHM&cx=9867c733a42c0c643&q=list ngo in ${input}&start=0`)
        const FinalData=response.data.items
        setResult(()=>FinalData)
    }
    useEffect(()=>{
        return ()=>{

        }
    },[input])
    return  <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100vw"
    }}>
    <Button color='secondary'auto ghost onPress={()=>{
        router.push('/')
    }}>Home</Button>
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
    <div className={classes.container}>
        {result[0].title!==""&&result?.map((e,i)=><SearchBox key={i} title={e.title} discription={e.snippet} link={e.formattedUrl} image={(e?.pagemap?.cse_thumbnail===null||e?.pagemap?.cse_thumbnail===undefined)?"":e?.pagemap?.cse_thumbnail[0].src}/>)}
    </div>
   </div>
}

function SearchBox({title,discription,link,image}:{
    title:string,
    discription:string,
    link:string,
    image:string
}){
    return <Card css={{ mw: "100%", marginTop:"20px", border:"2px solid black"}}>
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
}