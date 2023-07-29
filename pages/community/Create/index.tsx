import Quote from "@/Components/Quote/Quote";
import { Input, Grid, Button, Loading } from "@nextui-org/react";
import classes from "../../../styles/Create/Create.module.css"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import axios from "axios";
import ModalComp from "@/Components/Modal/ModalComp";
export default function create(){
  const Data:any=useSession()
  const router=useRouter()
  const [title,setTitle]=useState("")
  const [loding,setLoding]=useState(false)
  const [discription,setdiscription]=useState("")
  const [visible, setVisible] = useState(false)
  const [message,setMessage]=useState("")
  const [good,setGood]=useState(false)

  async function CreateBlog() {
    if(title===""||discription===""){
      setMessage(()=>"Please fill all feilds")
      setVisible(()=>true)
      setGood(()=>false)
      return
    }
    setLoding(()=>true)
    try{
      await axios.post('/api/Blogs',{
        "Title":title,
        "Discription":discription,
        "UserId":Data.data?.user._id,
        "Keyword":"Tech Wrold"
      },
      {
        headers:{
          Authorization:`Bearer ${Data.data.user.token}`
        }
      })
      setMessage(()=>"Blog Created Successfully...")
      setVisible(()=>true)
      setGood(()=>true)
    }catch (e){
      console.log(e)
    }
    setLoding(()=>false)
  }
    return <>
    <ModalComp visible={visible} setVisible={setVisible} message={message} Good={good}/>
    <Quote title1="Share Your" title2="Kind story."/>
    
    <div className={classes.main}>
      
      {Data.status!=='loading'&&(Data.status==='unauthenticated')?<Button
      auto ghost
      onPress={()=>{
        router.push("/Login")
      }}>Login</Button>:
     <>
      <div className={classes.contain}>
      <Input
      id="Title"
      aria-label="Title"
        rounded
        bordered
        size="xl"
        labelLeft="Title"
        placeholder="Rain In Hell"
        clearable
        color="secondary"
        onChange={(e)=>{
          setTitle(()=>e.target.value)
        }}
      />
      <p className={classes.title}>Discription</p>
      <textarea  aria-label="discription" name="discription" className={classes.dis} cols={30} onChange={(e)=>{
        setdiscription(()=>e.target.value)
      }}></textarea>
      {(loding===true)&&<Button shadow color="secondary" auto disabled
      >
       <Loading size="sm" type="points"/>
      </Button>}
      {(loding===false)&&<Button shadow color="secondary" auto 
      onPress={CreateBlog}
      >
        Create
      </Button>}
      </div>
      <div className={classes.imageConatiner}>

      </div>
     </>}
  </div>
    </>
}