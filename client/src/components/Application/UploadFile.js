import React, {Component} from 'react'
import {Card, CardBody, Button, Input, Row, Col, Collapse, Form} from 'reactstrap'

import {request} from '../../api/api'

import {serverURL} from './SetServer'
//export var serverURL =  'http://' + location.host;  //Sets the default server to some local host

class Node {
    constructor(place){
        this.place = place;
        this.next = null;
    }
}

class LinkedList {
    constructor(length = 0, head = null) {
        this.head = head;
        this.length = length;
        this.addNode = this.addNode.bind(this);
    }

    addNode(place) {
        var newNode = new Node(place);
        let current = this.head;
        console.log(newNode);
        if (!current) {
            this.head = newNode;
        }
        else{
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }
}

export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            place: {
                id: "",
                name: "",
                latitude: "",
                longitude: "",
            }
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.saveTFFI = this.saveTFFI.bind(this);
        this.updatePlace = this.updatePlace.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.toggle = this.toggle.bind(this);
        this.createLinkedList = this.createLinkedList.bind(this);

    }

    createLinkedList(){
        let places = this.props.trip.places;
        var myPlacesLL = new LinkedList();
        for (let i = 0; i < places.length; i++){
            let value = places[i];
            myPlacesLL.addNode(value);
        }
        console.log(myPlacesLL);
        console.log(typeof(myPlacesLL));

        return(myPlacesLL);
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
            this.createLinkedList();
        }
    };

    // This function sends the trip to the server for distance calcultions

    onFormSubmit(){
        request(this.props.trip, 'plan', serverURL).then(
            (response) => {
                console.log(response);
                this.props.updateBasedOnResponse(response);
            })
    }

    updatePlace(field, value){
        let place = this.state.place;
        place[field] = value;
        this.setState(place);

    }

    addPlace(){
        console.log(JSON.stringify(this.state.place))
    }


    updateTitle(event) {
        let mytitle = event.target.value;
        console.log("myTitle:"+mytitle);
        this.props.updateTrip('title', mytitle);
    }

    /* Saves the map and itinerary to the local file system. */

    saveTFFI(){
        var tripTitle = this.props.trip.title;

        //Convert data to TFFI formatted string
        let trip = this.props.trip;
        trip['map'] = '';
        var tffi = JSON.stringify(trip); // make the map attributes to be ''


        //add .json extension if not already added by user
        if(!tripTitle.endsWith(".json")){
            tripTitle += ".json";
        }

        //generate file and download
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tffi));
        element.setAttribute('download', tripTitle);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='btn-dark' block>Create Your Trip</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md={6}>
                                    <p> Upload Your File </p>
                                    <Input title="upload" type="file" id="fileInput" onChange={(event)=>this.loadFile(event)}/>
                                </Col>
                                <Col md={6}>
                                    <p> Add Your Own </p>
                                    <Input type="text" placeholder="Id  ex. den" onChange={(e)=>this.updatePlace('id', e.target.value)}/>
                                    <Input type="text" placeholder="Name  ex. Denver" onChange={(e)=>this.updatePlace('name', e.target.value)}/>
                                    <Input type="text" placeholder="Latitude  ex. 39.73" onChange={(e)=>this.updatePlace('latitude', e.target.value)}/>
                                    <Input type="text" placeholder="Longitude  ex.-104.99" onChange={(e)=>this.updatePlace('longitude', e.target.value)}/>
                                    <br/>
                                    <Button type={"button"} onClick={this.addPlace}>Add Place</Button>
                                </Col>
                            </Row>
                            <br/>
                            <Input type="text" className="form-control" placeholder="Trip title..." value={this.props.trip.title} onChange={this.updateTitle} />
                            <Button onClick={this.saveTFFI} type="Button">Save Trip</Button>
                            <div align="center">
                                <Button color="primary" type="button" onClick={this.onFormSubmit}>Plan Trip</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

