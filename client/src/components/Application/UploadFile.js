import React, {Component} from 'react'

import {Card, CardBody, Button, Input, Row, Col, Collapse, Form, InputGroup, InputGroupAddon} from 'reactstrap'



export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            myPlace: {},
        };

        for (let attributes of this.props.config.attributes) {
            let values = {};
            values[attributes] = "";
            this.state.myPlace = values;
        }

        this.updatePlace = this.updatePlace.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addOwn = this.addOwn.bind(this);
        this.clearFields = this.clearFields.bind(this);

    }


    toggle(){
        this.setState({collapse: !this.state.collapse})
    }

    // Reads the file contents and updates trip in application
    loadFile(event){
        this.props.updateTrip('distances', []);
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
        let place = this.state.myPlace;
        place[field] = value;
        this.setState(place);
    }

    clearFields(){
        let place = this.state.myPlace;
        for (let attr in place){
            document.getElementById(attr).value = "";
        }
    }

    addPlace(){
        let myPlaces = this.props.trip.places;
        let place = {};
        for (let attributes of this.props.config.attributes){
            place[attributes] = this.state.myPlace[attributes];
        }
        console.log(place);
        myPlaces.push(place);
        this.props.updateTrip('places', myPlaces);
        this.clearFields();
    }

    addOwn(){
        let place = this.state.myPlace;
        let myAdd = this.props.config.attributes.map((att) =>
            <InputGroup key={att}>
                <InputGroupAddon key={att} addonType="prepend">{att.charAt(0).toUpperCase() + att.slice(1)}</InputGroupAddon>
                <Input id={att} type="text" defaultValue={place[att]} onChange={(e)=>this.updatePlace(att, e.target.value)}/>
            </InputGroup>);
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
                                   onChange={(event)=>this.props.updateTrip('title', event.target.value)}/><br/>
                            <Row>
                                <Col md={6}><p align="Center"> Upload Your File </p>
                                    <Input title="upload" type="file" id="fileInput" onChange={(event)=>this.loadFile(event)}/>
                                </Col>
                                <Col md={6}><p align="Center"> Add Your Own </p>
                                    {this.addOwn()}
                                    <br/>
                                    <Button type={"button"} onClick={this.addPlace}>Add Place</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
