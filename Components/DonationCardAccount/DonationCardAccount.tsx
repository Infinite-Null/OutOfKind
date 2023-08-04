import { Button, Card, Loading, Row, Text } from '@nextui-org/react'
import React from 'react'
import axios  from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function DonationCardAccount({image1,title,discription,UserName,ava,_id,fetch}:{
  image1:string,
  title:string,
  discription:string,
  UserName:string,
  ava:any,
  fetch:any,
  _id:string
}) {
    const[loding,setLoding]=useState(false)
 const Data:any=useSession()
  async function Update(av:any) {
    setLoding(()=>true)
    await axios.patch('/api/Donations?DonationId='+_id,{
        value:!av
    },{
        headers:{
            Authorization:"Bearer "+Data.data?.user.token
        }
    })
    fetch()
    setLoding(()=>false)
  }
  return (<Card isHoverable css={{ mw: "330px", border:"2px solid black"}}>
    <Card.Image src={image1} alt="Not Found">
    </Card.Image>
    <Card.Header>
      <Text b>{title}</Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body css={{ py: "$10" }}>
      <Text>
       {discription}
      </Text>
      
    </Card.Body>
    <Card.Body css={{ py: "$10" }}>
      <Text>
       {`by: ${UserName}`}
      </Text>
      
    </Card.Body>
    <Card.Divider />
    <Card.Footer>
      <Row justify="flex-end">
      {loding&&<Button disabled><Loading size='sm'/></Button>}
      {(loding===true)?<></>:(ava===false)?<Button color='secondary' onPress={()=>{
        Update(ava)
      }}>Donated</Button>:<Button onPress={()=>{
        Update(ava)
      }}>Available</Button>}
      </Row>
    </Card.Footer>
  </Card>
  )
}
