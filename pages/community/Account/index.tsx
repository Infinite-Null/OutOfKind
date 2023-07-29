import { Button, Loading, Text } from "@nextui-org/react";
import classes from "../../../styles/Home.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MyBlogs from "@/Components/CardMyBlog/MyBlogs";
import axios from "axios";
export default function App() {
    const Data:any=useSession()
    const router=useRouter()
    type blogs={
        message:string,
        Blogs: {
            _id: string,
            myBlog:
                {
                    _id: string,
                    users: {
                        _id:string,
                        name: string
                    },
                    title: string,
                    discription: string,
                    createdAt: string
                }[]
        }
    }
   const [blogs,setBlogs]:[blogs,Dispatch<SetStateAction<blogs>>]=useState({
    message:"",
    Blogs: {
        _id: "",
        myBlog:
            [{
                _id: "",
                users: {
                    _id:"",
                    name: ""
                },
                title: "",
                discription:"",
                createdAt: ""
            }]
    }
})
const [loding,setLoding]=useState(false)
async function FetchBlogs() {
  setLoding(()=>true)
  try{
    const response= await axios.get(`/api/Users/GetUserBlogs?UserId=${Data.data?.user._id}`,{
      headers:{
        Authorization:`Bearer ${Data.data?.user.token}`
      }
    })
    setBlogs((prev)=>prev=response.data)
  }catch(e){
    console.log(e)
  }
  setLoding(()=>false)
}
 
useEffect(()=>{
  if(Data.status=='unauthenticated'||Data.status=='loading'){
    return
  }
  FetchBlogs()
  return()=>{

  }
},[])

  if(Data.status!=='loading'){
    if(Data.status==='unauthenticated'){
      return <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"80vh"
      }}>
        <Button 
      auto ghost
      onPress={()=>{
        router.push('/Login')
      }}
      css={{
        width:"fit-content",
        marginTop:"10px"
       }}>Login</Button>
      </div>
    }
  return (
  <div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"40px",flexDirection:"column"}}>
    <Text b css={{
        fontSize:"$4xl",
    }}>{Data.data?.user?.Name}</Text>
    <Text css={{
        fontSize:"$2xl",
    }}>{Data.data?.user?.email}</Text>
  </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"40px",flexDirection:"row"}}>
      <Text b color="secondary" size='$4xl'>Your Stories</Text>
    </div>
    {loding===true&&<div style={{height:"70vh", display:"flex",alignItems:"center",justifyContent:"center"}}><Loading size='xl' color='secondary'/></div>}
   {(loding===false)&&<div className={classes.blogs}>
        {blogs?.Blogs?.myBlog?.map((e,i)=><MyBlogs title={e.title} date={e.createdAt} discription={e.discription} id={e._id} name={e.users.name} key={i} fetchBlog={FetchBlogs}/>)}
    </div>}
  </div>
  );
  }
}