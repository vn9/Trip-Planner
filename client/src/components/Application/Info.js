import React, {Component} from 'react'
import {Card, CardImg, CardBody, CardText, Row, Media, Col, CardTitle} from 'reactstrap'
import kira_photo from '../../../../server/src/main/resources/kira_photo.jpg'
import john_deere from '../../../../server/src/main/resources/john_deer_photo.jpg'

export default class Info extends Component {

  makeCard(image, title, text){
    let newCard =
        <Card>
          <CardBody>
          <Row>
            <Col><CardImg src={image} align={"left"}/></Col>
            <Col>
                <CardTitle algin="center">{title}</CardTitle>
                <CardText>{text}</CardText>
            </Col>
          </Row>
          </CardBody>
          </Card>;
    return(newCard)
  }

  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <h2 align="Center">About Us</h2>
              <CardText> Here at TripCo we specialize in planning. Our dedicated team has worked hard to bring you a
                product that is simple and easy to use, but sleek and elegant. Whether you've already got your
                  itinerary or need to search for places, this app has you covered. Simply add your places, customize,
                  and save! We've provided a variety of personalization options so your trip is exactly the way you
                  want.
              </CardText>
            <br/>
            <h2 align="Center">Meet the Team</h2>
              {this.makeCard(kira_photo,"Kira Deming","Some Text")}<br/>
              {this.makeCard(john_deere,"John Deere","Nothing Runs Like a Deere")}
          </CardBody>
        </Card>
      </div>
    )
  }
}