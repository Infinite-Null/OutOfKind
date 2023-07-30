import { Pagination, Text } from '@nextui-org/react'
import React,{useState} from 'react'
import classes from '../styles/detailPage/detail.module.css'
import { motion } from 'framer-motion'
export default function Details() {
  const[number,setNumber]=useState(0)
 const images=['https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&width=1200',
  'https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&width=1200',
  'https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&width=1200'
]
  function Change(){
    return <motion.div
    initial={{
      x:200,
      opacity:0
    }}
    animate={{
      x:0,
      opacity:1
    }}
    style={{
      border:"2px solid black",
      borderRadius:"20px",
      width:"fit-content",
      margin:"10px",
      padding:"20px",
      boxShadow:"20px 0px 100px 1px rgba(0,0,0,0.15)"
     }}>
     <img src={images[number]}
      style={{
          objectFit:"cover",
          height:"400px",
          width:"400px",
      }}
      />
     </motion.div>
  }
  return <>
  <center><Text b size='$5xl'>Book</Text></center>
  <div className={classes.Conatiner}>
   <div>
   <Change key={number}/>
   <Pagination shadow  size='md' total={3} onChange={(e)=>{
    if(e!=number)
    setNumber(()=>e-1)
   }}/>
   </div>
  <div className={classes.Discrip}>
   <Text b size='$2xl'>A book description is a short summary of a book's story or content that is designed to “hook” a reader and lead to a sale. Typically, the book's description conveys important information about its topic or focus (in nonfiction) or the plot and tone (for a novel or any other piece of fiction).</Text><br/><br/>
   <Text b>By: Ankit Kumar Shah</Text>
   <br/><br/>
   <div style={{
    border:"2px solid rgba(0,0,0,0.2)",
    borderRadius:"20px",
    padding:"20px"
   }}>
   <Text  size='$1xl'>Sanikpuri, Khaprail p/o New Chumpta</Text>
   <Text >Contact: 7478856289</Text>
   </div>
   <br/><br/>
   <Text  size='$2xl' color='green'>Avaliable</Text>
  </div>
    </div>
  </>
}
