import { Button, Card, Row, Text } from '@nextui-org/react'
import React from 'react'

export default function DonationCard({image1,image2,image3,title,discription,UserName,ava,_id}:{
  image1:string,
  image2:string,
  image3:string,
  title:string,
  discription:string,
  UserName:string,
  ava:any,
  _id:string,
}) {
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
       <Text b color={(ava===true)?"green":"secondary"} css={{
        paddingRight:"10px"
       }}>{(ava===true)?"Available":"Donated"}</Text>
        <Button size="sm" >Details</Button>
      </Row>
    </Card.Footer>
  </Card>
  )
}
