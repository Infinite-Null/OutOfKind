import {signIn, useSession} from 'next-auth/react'
import { Card,  Input, Text, Button, Row , Spacer, Loading} from "@nextui-org/react";
import { motion } from "framer-motion"
import {useState } from 'react';
import axios  from 'axios';
import { useRouter } from 'next/navigation'
import ModalComp from "@/Components/Modal/ModalComp";
export default function App(){
  const Data=useSession()
  if(Data.status==='authenticated'){
    const router = useRouter()
    router.back()
  }
    const [login,setlogin]=useState(true)
    function change(a:boolean){
        setlogin(()=>a)
    }
    return <div>
      {(Data.status!=='loading'||!Data)&&<div style={{display:"flex",height:"80vh",alignItems:"center",justifyContent:"center"}}>
        {(login==true)?<Login change={change}/>:
        <Signup change={change}/>}
    </div>}
    </div>
   
}





function Login({change}:{change:(a:boolean)=>void}){
  const [visible, setVisible] = useState(false)
  const [message,setMessage]=useState("")
  const[loading,setLoding]=useState(false)
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  async function LoginUser(){
    if(email==""||email==undefined||password==""||password==undefined){
      setMessage(()=>"Please fill all feilds")
      setVisible(()=>true)
      return;
    }
    setLoding(()=>true)
    const result=await signIn("credentials",{
      redirect:false,
      email:email,
      password:password
    })
    if(result?.error==="User Not Found"){
      setMessage(()=>"User Not Found")
      setVisible(()=>true)
    }
    if(result?.error==="Incorrect Password"){
      setMessage(()=>"Incorrect Password")
      setVisible(()=>true)
    }
    console.log(result)
    setLoding(()=>false)
  }

    return <div>
<ModalComp visible={visible} setVisible={setVisible} message={message}/>
<motion.div
    initial={{
        y:100
    }}
    animate={{
        y:0
    }}
    >
        <Card css={{ mw: "330px", border:"2px solid black"}} isHoverable>
    <Card.Header>
      <Text b>Login</Text>
    </Card.Header>
    <Card.Body css={{ py: "$10" }}>
    <Input 
    aria-label="email"
    underlined 
    labelLeft="Email" 
    placeholder="@gmail.com" 
    onChange={(val)=>{
      setEmail(()=>val.target.value)
    }}
  />
  <Spacer/>
  <Input.Password
  aria-label="password"
    underlined 
    labelLeft="Password" 
    placeholder="****" 
    onChange={(val)=>{
      setPassword(()=>val.target.value)
    }}
  />
    </Card.Body>
    <Card.Divider />
    <Card.Footer>
      <Row justify="flex-end">
        <Button size="sm"  light onClick={()=>{
            change(false)
        }}>
          Signup
        </Button>
        <Button size="sm" color="secondary" onPress={()=>{
          LoginUser()
        }}>{(loading)?<Loading color="currentColor" size="sm" />:"Login"}</Button>
      </Row>
    </Card.Footer>
  </Card>
    </motion.div>
    </div>
}

function Signup({change}:{change:(a:boolean)=>void}){
  const [visible, setVisible] = useState(false)
  const [message,setMessage]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const[loading,setLoding]=useState(false)
  const [good,setGood]=useState(false)

  function Singnup(){
      if(email==""||email==undefined||password==""||password==undefined||name==""||name==undefined){
        setGood(()=>false)
        setMessage(()=>"Please fill all fields")
        setVisible(()=>true)
        return;
      }
      setLoding(()=>true)
      axios.post("/api/Users/SignupUser",
      {
        Name:name,
        Email:email,
        Password:password
      }
    ).then((res)=>{
      if(res.data.details=="Email Already Exists"){
        setGood(()=>false)
        setMessage(()=>"Email is already connected.")
        setVisible(()=>true)
        setLoding(()=>false)
        return;
      }
      setGood(()=>true)
      setMessage(()=>"Account Successfully Created")
      setVisible(()=>true)
      setLoding(()=>false)
    })
  }
    return <div>
      <ModalComp visible={visible} setVisible={setVisible} message={message} Good={good}/>
     <motion.div
    initial={{
        y:100
    }}
    animate={{
        y:0
    }}
    >
        <Card css={{ mw: "330px", border:"2px solid black"}} isHoverable>
    <Card.Header>
      <Text b>Signup</Text>
    </Card.Header>
    <Card.Body css={{ py: "$10" }}>
    <Input 
    aria-label="Name"
    underlined 
    labelLeft="Name" 
    placeholder="" 
    onChange={(val)=>{
      setName(()=>val.target.value)
    }}
  />
  <Spacer/>
    <Input 
    underlined 
    aria-label="Email"
    labelLeft="Email" 
    placeholder="@gmail.com" 
    onChange={(val)=>{
      setEmail(()=>val.target.value)
    }}
  />
  <Spacer/>
  <Input.Password
    underlined 
    aria-label="Password"
    labelLeft="Password" 
    placeholder="****" 
    onChange={(val)=>{
      setPassword(()=>val.target.value)
    }}
  />
    </Card.Body>
    <Card.Divider />
    <Card.Footer>
      <Row justify="flex-end">
        <Button size="sm"  onClick={()=>{
            change(true)
        }} light>
          Login
        </Button>
        <Button size="sm" color="secondary" onClick={()=>{
          Singnup()
        }}>{(loading)?<Loading color="currentColor" size="sm" />:"Signup"}</Button>
      </Row>
    </Card.Footer>
  </Card>
    </motion.div>
    </div>
}