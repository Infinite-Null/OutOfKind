import { Button, Card, Row, Text } from '@nextui-org/react'
import React from 'react'

export default function DonationCard() {
  return (<Card isHoverable css={{ mw: "330px", border:"2px solid black"}}>
    <Card.Image src='https://i0.wp.com/www.michigandaily.com/wp-content/uploads/2019/03/amc.ART_.Textbook.3.27.19.0010.jpg?fit=720%2C480&ssl=1' alt="Not Found">

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
       <Text b color='green' css={{
        paddingRight:"10px"
       }}>Avaliable</Text>
        <Button size="sm" >Details</Button>
      </Row>
    </Card.Footer>
  </Card>
  )
}
