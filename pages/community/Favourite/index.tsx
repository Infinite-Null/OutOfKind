
import CardB from '@/Components/Card/Card'
import Quote from '@/Components/Quote/Quote'
import classes from '../../../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { Button, Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios'
export default function Favourite(){
  type blogs={
    message: string,
    Blogs: {
        _id: string,
        liked: {
          _id: string,
          title: string,
          discription: string,
          createdAt: string
      }[]
    }
  }
  const [blogs,Setblogs]:[blogs,Dispatch<SetStateAction<blogs>>]=useState({message: "",
    Blogs: {
        _id: "",
        liked:[{
          _id: "",
          title: "",
          discription:"",
          createdAt:""
      }]
    }})
    const [loding,setLoding]=useState(false)
  const Data:any=useSession()
  const router=useRouter()
  async function FetchLiked(){
      setLoding(()=>true)
      const response= await axios.get(`/api/Users/GetUserLiked?UserId=${Data.data?.user._id}`,{
        headers:{
          Authorization:`Bearer ${Data.data?.user.token}`
        }
      })
      Setblogs((prev)=>prev=response.data)
      setLoding(()=>false)
  }

  useEffect(()=>{
    if(Data.status=='unauthenticated'||Data.status=='loading'){
      return
    }
    FetchLiked()
    return ()=>{

    }
  },[])

  useEffect(()=>{

    return()=>{

    }
  },[blogs])
    return <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
    <Quote title1='Your Liking' title2='Is what defines you.'/>
    {(loding===true)&&<div style={{height:"80vh", display:"flex",alignItems:"center",justifyContent:"center"}}><Loading size='xl' color='secondary'/></div>}
    {(loding===false)&&(Data.status!=='loading')&&(Data.status==='unauthenticated')?<Button css={
      {
        marginTop:"40px"
      }
    }
    auto ghost
    onPress={()=>{
      router.push('/Login')
    }}
    >Login</Button>:<div className={classes.blogs}>
      {blogs.Blogs.liked.map((e,i)=><CardB title={e.title} date={e.createdAt} discription={e.discription} id={e._id} name="" key={i}/>)}
    </div>
    }
  </div>
}