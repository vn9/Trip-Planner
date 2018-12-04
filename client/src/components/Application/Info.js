import React, {Component} from 'react'
import {Card, CardImg, CardBody, CardText, Row, Col, CardTitle} from 'reactstrap'
import kira_photo from '../../../../server/src/main/resources/kira_photo.jpg'
import vina_photo from '../../../../server/src/main/resources/vina_photo.jpg'
import abel_photo from '../../../../server/src/main/resources/abel_photo.jpg'

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

let vina_bio = new bio(vina_photo, "Vina Nguyen", "Vina is an undergraduate "
    + "student in Computer Science at CSU. She expects to receive her Bachelor's "
    + "Degree in May 2019. She is interested in making web pages, and therefore, "
    + "very much enjoyed working on this project. In her free time, she "
    + "likes to read, translates stories, draw, and solves puzzles.");

let abel_bio = new bio(abel_photo, "Abel Ykalo", "Abel is a third year undergraduate "
    + "student studying Computer Science at CSU. He expects to receive his Bachelor's "
    + "Degree in May 2020. He has a interest in learning about machine learning and AI. "
    + "In his free time, he enjoys playing single-player story based video games and seeing movies.");

export default class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bios: [kira_bio, vina_bio, abel_bio]
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
              <p className="lead">"Want to travel far and wide?"</p>
              <ol>
                  <li>Choose options for trip planning, information to display about locations,
                      and how the trip map and itinerary should be saved.</li>
                  <li>Choose your destinations by loading existing sets of destinations or
                      find more in an extensive database of locations worldwide.</li>
                  <li>Plan the trip with the options you selected.
                      Review and revise the trip origin and order.
                      Save the trip map and itinerary for future reference.</li>
              </ol>
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


/*
<h2 align="Center">About</h2>
              <CardText> Here at TripCo we specialize in planning. Our dedicated team has worked hard to bring you a
                product that is simple and easy to use, but sleek and elegant. Whether you've already got your
                  itinerary or need to search for places, this app has you covered. Simply add your places, customize,
                  and save! We've provided a variety of personalization options so your trip is exactly the way you
                  want.
              </CardText>
 */