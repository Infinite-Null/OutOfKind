import { Button, Card, Input, Loading, Text } from "@nextui-org/react";
import classes from '../../styles/Create/Create.module.css'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, SetStateAction, Dispatch, useContext } from 'react';
import axios from "axios";
import dayjs from "dayjs";
export default function App(){
  
  type Fetched={
    message: string,
    details: {
        _id: string,
        users: {
            _id: string,
            name: string
        },
        title: string,
        discription: string,
        createdAt: string,
    }
  }
  const Data:any=useSession()
  const router=useRouter()
  const [Blog,SetBlog]:[Fetched,Dispatch<SetStateAction<Fetched>>]=useState({
    message: "Success",
    details: {
        _id: "",
        users: {
            _id: "",
            name: ""
        },
        title: "",
        discription: "",
        createdAt: "",
    }
  })
  const [loding,setLoding]=useState(false)
  const [liked,setLiked]=useState(false)
  const [likedLoding,setLikedLoding]=useState(false)
   async function FetchData(){
    try{
      const Data1=await axios.get(`/api/DetailsBlogs?BlogId=${router.query.id}`)
      const FinalData=Data1.data
      SetBlog((prev)=>prev=FinalData)
      if(Data.status!=='loading'&&Data.status!=='unauthenticated'){
        const response=await axios.get(`/api/Users/GetUserLiked?UserId=${Data.data?.user?._id}`,{
          headers:{
            Authorization:`Bearer ${Data.data?.user?.token}`
          }
        })
        const found=response.data.Blogs.liked.find((e:any)=>e._id==router.query.id)
        if(found!==undefined){
          setLiked(()=>true)
        }else{
          setLiked(()=>false)
        }
      }
      
    }catch(e){
      console.log(e)
    }
   }
 async function GetInitialData() {
  setLoding(()=>true)
  await FetchData()
  setLoding(()=>false)
 }

 async function AddLiked(){
  setLikedLoding(()=>true)
  await axios.post('/api/Users/AddLiked',{
    blogId:router.query.id,
    userId:Data.data?.user?._id
},{
  headers:{
    Authorization:`Bearer ${Data.data?.user?.token}`
  }
})
await FetchData()
setLikedLoding(()=>false)
}
async function RemoveLiked(){
  setLikedLoding(()=>true)
  await axios.post('/api/Users/RemoveLiked',{
    blogId:router.query.id,
    userId:Data.data?.user?._id
},{
  headers:{
    Authorization:`Bearer ${Data.data?.user?.token}`
  }
})
await FetchData()
setLikedLoding(()=>false)
}


  useEffect(()=>{
  if(!router.query.id){
      router.replace('/')
      return;
    }
    GetInitialData()
    return ()=>{

    }
  },[])
  useEffect(()=>{
     return()=>{

     }
  },[Blog,liked,loding])
  console.log(loding)
   return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      {(loding)&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh"}}><Loading size="xl" color='secondary'/></div>}
        {(!loding)&&<><div className={classes.bLogContainer}>
        <Card>
        <Card.Header css={{display:"flex",flexDirection:"column",alignItems:"start",justifyContent:"start"}}>
        <Text  b css={{
          fontSize:"3rem",
        }}>{Blog.details.title}</Text>
         <Text b css={{
          fontSize:"0.9rem",
          fontWeight:"100"
        }}>{(dayjs(Date.parse(Blog.details.createdAt)).format("MM/DD/YYYY")).toString()}</Text>
        <Text css={{
          fontSize:"0.9rem"
        }}>{`by: ${Blog?.details?.users?.name??""}`}</Text>
         </Card.Header>
         <hr/>
         <Text css={{
            padding:"20px"
         }}>{Blog.details.discription}</Text>
         <hr/>
        </Card>
        {Data.status!=='loading'&& (Data.status==="unauthenticated")?<Button 
        auto ghost
        onPress={()=>{
          router.push('/Login')
        }}
        css={{
          width:"fit-content",
          marginTop:"10px"
         }}>Login</Button>:(liked===true)?<Button color="error" css={{
          width:"fit-content",
          marginTop:"10px"
         }}
         onPress={()=>{
          if(likedLoding===false){
            RemoveLiked()
          }
         }}
         >{(likedLoding===false)?"Liked":<Loading type="points-opacity" color="currentColor" size="sm" />}</Button>:<Button color="secondary" css={{
          width:"fit-content",
          marginTop:"10px"
         }}
         onPress={()=>{
          if(likedLoding===false){
            AddLiked()
          }
         }}
         >{(likedLoding===false)?"Like":<Loading type="points-opacity" color="currentColor" size="sm" />}</Button>}
        </div>
         <Comments id={router.query.id as string}/></>}
    </div>
   )
}




function Comments({id}:{id:string}){
  type comments={
    message: string,
    details: {
        _id: string,
        Comments: {
          Name: string,
          Comment: string
      }[]
    }
}
  const Data:any=useSession()
  const router=useRouter()
  const [Comments,SetComments]:[comments,Dispatch<SetStateAction<comments>>]=useState({
    message:"",
    details: {
        _id: "",
        Comments: [{
          Name: "",
          Comment: ""
        }]
    }
})


const [input,setInput]=useState("")
 const[loding,setLoding]=useState(false)
 const[commentLoding,setcommentLoding]=useState(false)
async function GetComments(){
  const data=await axios.get(`/api/Comment?BlogId=${id}`)
  SetComments((prev)=>prev=data.data)
}

 
 async function AddComment(){
  if(input==""){
    alert("Please write something..")
    return
  }
  try{
  setcommentLoding(true)
  const response=await axios.post("/api/Comment",{
      Name:Data.data?.user?.Name??"",
      Comment:input,
      BlogId:id
  },{
    headers:{
      Authorization:`Bearer ${Data?.data?.user?.token}`
    }
  })
  setcommentLoding(false)
   GetComments()
   
}catch(e){
    console.log(e)
  }
 }


useEffect(()=>{
  setLoding(()=>true)
  GetComments()
  setLoding(()=>false)
  return()=>{}
},[])

    return  <div className={classes.comment}>
      {(loding)&&<Loading color='secondary' size="md"/>}
       {(!loding)&&<>
        <div style={{width:"100%",height:"300px",overflow:"scroll"}}> 
        {(Comments?.details?.Comments?.length===0)&&<Text b>Be the frist one to comment</Text>}
        {(Comments?.details?.Comments?.length!=0)&&Comments?.details?.Comments?.map((e,i)=><EachComment comment={e.Comment} name={e.Name} key={i}/>)}
        </div>
         <div style={{
            display:"flex"
         }}>
         <Input 
        size="lg" 
        aria-label="Comments" 
        placeholder="Write a comment.." 
        clearable
        underlined
        onChange={(inp)=>{
          setInput(()=>inp.target.value)
        }}
      /> {Data.status!=='loading'&& (Data.status==="unauthenticated")?<Button 
      auto ghost
      onPress={()=>{
        router.push('/Login')
      }}
      css={{
        width:"fit-content",
        marginTop:"10px"
       }}>Login</Button>:(commentLoding===false)?<Button color="secondary" 
       onPress={AddComment}
       auto ghost css={{marginTop:"10px",marginLeft:"10px"}}>
      {">"}
    </Button>:<Button disabled auto ghost  css={{marginTop:"10px",marginLeft:"10px"}}>
          <Loading type="points-opacity" color="currentColor" size="sm" />
        </Button>}
         </div>
       </>}
    </div>
}


function EachComment({comment,name}:{comment:string,name:string}){
    return <div style={{width:"fit-content",margin:"10px"}}>
      <Text  b css={{
          fontSize:"0.9rem",
        }}>{name}</Text>
    <Card.Divider/>
    <Card.Body>
        {comment}
    </Card.Body>
</div>
}