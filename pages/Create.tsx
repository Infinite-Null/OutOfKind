import Quote from "@/Components/Quote/Quote";
import { Input, Grid, Button, Loading, Text } from "@nextui-org/react";
import classes from "../styles/Create/Create.module.css"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import axios from "axios";
import ModalComp from "@/Components/Modal/ModalComp";
export default function create(){
  const Data:any=useSession()
  const router=useRouter()
  const [image1,SetImage1]=useState({})
  const [image2,SetImage2]=useState({})
  const [image3,SetImage3]=useState({})
  const [title,setTitle]=useState("")
  const [discription,setDiscription]=useState("")
  const [address,setAddress]=useState("")
  const [contact,setContact]=useState("")
  const[loding,setLoding]=useState(false)
  const [visible, setVisible] = useState(false)
  const [message,setMessage]=useState("")
  const [good,setGood]=useState(false)
  async function handleSubmit() {
  if(title==""||discription==""||address==""||contact==""){
    alert("Fill all the feilds..")
    return;
  }
  setLoding(()=>true)
   const link1= await Upload(image1)
   const link2= await Upload(image2)
   const link3= await Upload(image3)
   axios.post("/api/Donations",{
    "users":Data.data?.user._id,
    "title":title,
    "discription":discription,
    "address":address,
    "contact":contact,
    "image1":link1,
    "image2":link2,
    "image3":link3,
    "avaliable":true
},
{
  headers:{
    Authorization:`Bearer ${Data.data?.user.token}`
  }
})
setLoding(()=>false)
setMessage(()=>"Your Donation was saved successfully")
setVisible(()=>true)
setGood(()=>true)
}
  async function Upload(params:any) {
    const file=new FormData()
    file.append("file",params)
    file.append("upload_preset","hwgmzlxp")
    file.append("cloud_name","dy0ejrc3m")
    const response:any=await fetch('https://api.cloudinary.com/v1_1/dy0ejrc3m/image/upload',{
      method:"post",
      body:file
    })
    const finalData=await response.json()
    return finalData.secure_url
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
        placeholder="Book"
        clearable
        color="secondary"
        onChange={(e)=>{
          setTitle(()=>e.target.value)
      }}
      />
      <p className={classes.title}>Discription</p>
      <textarea  aria-label="discription" name="discription" className={classes.dis} cols={30} onChange={(e)=>{
          setDiscription(()=>e.target.value)
      }}></textarea>
      <Input
      id="Address"
      aria-label="Address"
        rounded
        bordered
        size="xl"
        labelLeft="Address"
        placeholder="Xyz road .."
        clearable
        color="secondary"
        onChange={(e)=>{
          setAddress(()=>e.target.value)
      }}
      />
       <Input
      id="Contact"
      aria-label="Contact"
        rounded
        bordered
        size="xl"
        labelLeft="Contact"
        placeholder="number, email etc."
        clearable
        color="secondary"
        onChange={(e)=>{
          setContact(()=>e.target.value)
      }}
      />
      <Text>Select 3 images of item</Text>
     <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
     <input type="file" onChange={(e)=>SetImage1(()=>e.target.files![0])}/>
     <input type="file" onChange={(e)=>SetImage2(()=>e.target.files![0])}/>
     <input type="file" onChange={(e)=>SetImage3(()=>e.target.files![0])}/>
     </div>
     {loding&&<Button shadow color="secondary" disabled auto>
     <Loading size="sm"/>
      </Button>}
     {!loding&&<Button shadow color="secondary" auto onPress={handleSubmit}>
        Donate
      </Button>}
      </div>
      <div className={classes.imageConatiner2}>

      </div>
     </>}
  </div>
    </>
}