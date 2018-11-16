import React, {Component} from 'react'
import {Card, CardImg, CardBody, CardText, Row, Col, CardTitle} from 'reactstrap'
import kira_photo from '../../../../server/src/main/resources/kira_photo.jpg'
import john_deere from '../../../../server/src/main/resources/john_deer_photo.jpg'

let bio = class biography {
    constructor(image, name, text){
        this.image = image;
        this.name = name;
        this.text = text;
    }
};

let kira_bio = new bio(kira_photo, "Kira Deming", "Kira is a graduate student at CSU working to develop " +
    "forest" + "planning software for the US Forest Service. She also works as a GIS Analyst for the Colorado " +
    "Forest Restoration Institute and the Department of Forestry and Rangeland Stewardship. An avid " +
    "runner, her free time is spent training for marathons and mountain ultras.");

let john_bio = new bio(john_deere, "John Deere", "Nothing runs like a Deere");

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bios: [kira_bio, john_bio]
        }
    }

  makeBios(){
    let newCard = this.state.bios.map((myBio)=>
        <div key={myBio.name}>
          <Row>
            <CardImg src={myBio.image} align={"left"} style={{height: "130px", width: "130px"}}/>
            <Col>
                <CardTitle alt={myBio.name} algin="center">{myBio.name}</CardTitle>
                <CardText>{myBio.text}</CardText>
            </Col>
          </Row>
        <br/>
        </div>);
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
              <CardBody>
                  {this.makeBios()}
              </CardBody>
          </CardBody>
        </Card>
      </div>
    )
  }
}