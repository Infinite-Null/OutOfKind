import { Button, Card, Row, Text } from '@nextui-org/react'
import React from 'react'

export default function DonationCard() {
  return (<Card isHoverable css={{ mw: "330px", border:"2px solid black"}}>
    <Card.Image src='https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&width=1200' alt="Not Found">

    </Card.Image>
    <Card.Header>
      <Text b>Books</Text>
    </Card.Header>
    <Card.Divider />
    <Card.Body css={{ py: "$10" }}>
      <Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Text>
      
    </Card.Body>
    <Card.Body css={{ py: "$10" }}>
      <Text>
        by: Ankit Kumar Shah
      </Text>
      
    </Card.Body>
    <Card.Divider />
    <Card.Footer>
      <Row justify="flex-end">
       <Text b color='secondary' css={{
        paddingRight:"10px"
       }}>Avaliable</Text>
        <Button size="sm" >Details</Button>
      </Row>
    </Card.Footer>
  </Card>
  )
}
