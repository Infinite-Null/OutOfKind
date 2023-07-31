import Quote from "@/Components/Quote/Quote";
import { Input, Grid, Button, Loading, Text } from "@nextui-org/react";
import classes from "../styles/Create/Create.module.css"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
export default function create(){
  const Data:any=useSession()
  const router=useRouter()
  const [image1,SetImage1]=useState({})
  const [image2,SetImage2]=useState({})
  const [image3,SetImage3]=useState({})

    return <>
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
      />
      <p className={classes.title}>Discription</p>
      <textarea  aria-label="discription" name="discription" className={classes.dis} cols={30} onChange={(e)=>{

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
      />
      <Text>Select 3 images of item</Text>
     <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
     <input type="file" onChange={(e)=>SetImage1(()=>e.target.files)}/>
     <input type="file"/>
     <input type="file"/>
     </div>
     <Button shadow color="secondary" auto >
        Donate
      </Button>
      </div>
      <div className={classes.imageConatiner2}>

      </div>
     </>}
  </div>
    </>
}