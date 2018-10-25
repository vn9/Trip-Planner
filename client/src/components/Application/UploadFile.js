import React, {Component} from 'react'
import {Card, CardBody, Button, Input, Row, Col, Collapse, Form, InputGroup, InputGroupAddon} from 'reactstrap'


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
        this.addOwn = this.addOwn.bind(this);
        this.addManual = this.addManual.bind(this);
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

    clearPlace(){
        let noPlace = this.state.place;
        noPlace.id = '';
        noPlace.name= '';
        noPlace.latitude = '';
        noPlace.longitude = '';
        this.setState(noPlace);
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
        this.clearPlace();
    }

    addManual(){
        let myAdd =
            <Col md={6}>
                <p align="Center"> Add Your Own </p>
                <Input type="text" placeholder="Id  ex. den" onChange={(e)=>this.updatePlace('id', e.target.value)}/>
                <Input type="text" placeholder="Name  ex. Denver" onChange={(e)=>this.updatePlace('name', e.target.value)}/>
                <Input type="text" placeholder="Latitude  ex. 39.73" onChange={(e)=>this.updatePlace('latitude', e.target.value)}/>
                <Input type="text" placeholder="Longitude  ex.-104.99" onChange={(e)=>this.updatePlace('longitude', e.target.value)}/>
                <br/>
                <Button type={"button"} onClick={this.addPlace}>Add Place</Button>
            </Col>;
        return(myAdd)
    }

    addOwn(){
        let place = this.state.place;
        let myAdd =
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">ID</InputGroupAddon>
                    <Input type="text" placeholder="ex. den" value={place.id} onChange={(e)=>this.updatePlace('id', e.target.value)}/>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                    <Input type="text" placeholder="ex. Denver" value={place.name} onChange={(e)=>this.updatePlace('name', e.target.value)}/>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                    <Input type="text" placeholder="ex. 39.73" value={place.latitude} onChange={(e)=>this.updatePlace('latitude', e.target.value)}/>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                    <Input type="text" placeholder="ex. -104.99" value={place.longitude} onChange={(e)=>this.updatePlace('longitude', e.target.value)}/>
                </InputGroup>
            </div>;
        return(myAdd)
    }


    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='btn-dark' block>Create Trip: I Have Places</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <p align="Center">Name Your Trip</p>
                            <Input placeholder="Name Your Trip" value={this.props.trip.title}
                                   onChange={(event)=>this.updateTrip('title', event.target.value)}/><br/>
                            <Row>
                                <Col md={6}>
                                    <p align="Center"> Upload Your File </p>
                                    <Input title="upload" type="file" id="fileInput" onChange={(event)=>this.loadFile(event)}/>
                                </Col>
                                <Col md={6}>
                                    <p align="Center"> Add Your Own </p>
                                    {this.addOwn()}
                                    <br/>
                                    <Button type={"button"} onClick={this.addPlace}>Add Place</Button>
                                </Col>
                                {this.addManual()}
                            </Row>
                            <br/>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
