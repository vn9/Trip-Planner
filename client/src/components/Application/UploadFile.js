import React, {Component} from 'react'
import {Card, CardBody, Button, Input, Row, Col, Collapse, Form} from 'reactstrap'


export class Place {
    constructor(id, name, latitude, longitude){
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            place: {
                id: "",
                name: "",
                latitude: "",
                longitude: "",
            }
        };

        this.updatePlace = this.updatePlace.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
    }


    toggle(){
        this.setState({collapse: !this.state.collapse})
    }

    // Reads the file contents and updates trip in application
    loadFile(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event)=> {
            console.warn("file data",event.target.result);
            const object = JSON.parse(event.target.result);
            console.log(object);
            for (var key in object){
                var value = object[key];
                this.props.updateTrip(key,value);
            }
        }
    };


    updatePlace(field, value){
        let place = this.state.place;
        place[field] = value;
        this.setState(place);

    }


    addPlace(){
        let myPlaces = this.props.trip.places;
        console.log(myPlaces);
        let place = this.state.place;
        let newPlace = new Place(place.id, place.name, place.latitude, place.longitude);
        console.log(newPlace);
        myPlaces.push(newPlace);
        this.props.updateTrip('places', myPlaces);
        console.log(this.props.trip.places);
    }

    updateTitle(event) {
        let mytitle = event.target.value;
        console.log("myTitle:"+mytitle);
        this.props.updateTrip('title', mytitle);
    }


    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='btn-dark' block>Create Trip: I Have Places</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={6}>
                                    <p align="Center">Name Your Trip</p>
                                    <Input type="text" className="form-control" placeholder="ex. Epic Ski Trip" value={this.props.trip.title} onChange={this.updateTitle}/>
                                    <br/>
                                    <p align="Center"> Upload Your File </p>
                                    <Input title="upload" type="file" id="fileInput" onChange={(event)=>this.loadFile(event)}/>
                                </Col>
                                <Col md={6}>
                                    <p align="Center"> Add Your Own </p>
                                    <Input type="text" placeholder="Id  ex. den" onChange={(e)=>this.updatePlace('id', e.target.value)}/>
                                    <Input type="text" placeholder="Name  ex. Denver" onChange={(e)=>this.updatePlace('name', e.target.value)}/>
                                    <Input type="text" placeholder="Latitude  ex. 39.73" onChange={(e)=>this.updatePlace('latitude', e.target.value)}/>
                                    <Input type="text" placeholder="Longitude  ex.-104.99" onChange={(e)=>this.updatePlace('longitude', e.target.value)}/>
                                    <br/>
                                    <Button type={"button"} onClick={this.addPlace}>Add Place</Button>
                                </Col>
                            </Row>
                            <br/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
