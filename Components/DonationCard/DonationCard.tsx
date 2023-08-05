import { Button, Card, Row, Text } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function DonationCard({image1,image2,image3,title,discription,UserName,ava,_id,contact,address}:{
  image1:string,
  image2:string,
  image3:string,
  title:string,
  discription:string,
  UserName:string,
  ava:any,
  _id:string,
  contact:string,
  address:string
}) {
  const router=useRouter()
  return (<Card isHoverable css={{ mw: "330px", border:"2px solid black"}}>
    <Card.Image src={image1} alt="Not Found" width="400px" height="200px" objectFit='cover'>

    </Card.Image>
    <Card.Header>
      <Text b>{title}</Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body css={{ py: "$10", height:"220px",overflow:"scroll"}}>
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
       <Text b color={(ava===true)?"green":"secondary"} css={{
        paddingRight:"10px"
       }}>{(ava===true)?"Available":"Donated"}</Text>
        <Link style={{
          marginLeft:"10px",
          marginRight:"10px",
          paddingLeft:"20px",
          paddingRight:"20px",
          borderRadius:"10px",
          backgroundColor:"blue",
          color:"white"
        }} href={{
          pathname:'/'+_id,
          query:{image1,image2,image3,title,discription,UserName,ava,_id,contact,address}
        }}>Details</Link>
      </Row>
    </Card.Footer>
  </Card>
  )
}
