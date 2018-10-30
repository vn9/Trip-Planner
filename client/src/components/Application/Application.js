import React, {Component} from 'react';
import {Container, Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Collapse, Card, CardBody, Input} from 'reactstrap';
import Info from './Info'
import Options from './Options';
import UploadFile from './UploadFile';
import Map from './Map';
import ItineraryForm from './ItineraryForm';
import TwoPtCalculator from './twoPointCalc';
import SetServer, {serverURL} from './SetServer';
import Search from './Search';
import Optimization from './Optimization';


import {get_config, request} from '../../api/api';


/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props){
        super(props);
        this.state = {
            config: null,
            modal: false,
            collapse: true,
            trip: {
                type: "trip",
                title: "",
                options: {
                    units: "miles",
                    unitName: "",
                    unitRadius: 0.0000,
                    optimization: "",
                },
                places: [],
                distances: [],
                map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
            }
        };

        this.planTrip = this.planTrip.bind(this);
        this.updateTrip = this.updateTrip.bind(this);
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.saveTFFI = this.saveTFFI.bind(this);
        this.saveMap = this.saveMap.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.createOptions = this.createOptions.bind(this);
        this.createTrip = this.createTrip.bind(this);
        this.clearTrip = this.clearTrip.bind(this);
    }


    componentWillMount() {
        get_config().then(
            config => {
                this.setState({
                    config:config
                })
            }
        );
    }

    updateTrip(field, value){
        let trip = this.state.trip;
        trip[field] = value;
        this.setState(trip);
    }

    updateBasedOnResponse(value) {
        this.setState({'trip': value});
    }

    updateOptions(option, value){
        let trip = this.state.trip;
        trip.options[option] = value;
        this.setState(trip);
    }

    planTrip(){
        request(this.state.trip, 'plan', serverURL).then(
            (response) => {
                console.log(response);
                this.updateBasedOnResponse(response);
            })
    }

    toggleModal(){
        this.setState({modal: !this.state.modal})
    }

    toggle(){
        this.setState({collapse: !this.state.collapse})
    }

    clearTrip(){
        let myTrip = this.state.trip;
        myTrip.distances= [];
        myTrip.title = '';
        myTrip.places = [];
        myTrip.map = '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>';
        myTrip.options = {units: 'miles'}
        this.setState(myTrip);

    }


    /* Saves the map and itinerary to the local file system. */

    saveTFFI(){
        var tripTitle = this.state.trip.title;

        //Convert data to TFFI formatted string
        let trip = this.state.trip;
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

    saveMap(){
        //generate file and download
        let element = document.createElement('a');
        element.setAttribute('href', this.state.trip.map);
        element.setAttribute('download', 'downlaod.svg');
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    createOptions(){
        let options =
            <Card>
                <CardBody>
                    <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}
                                trip={this.state.trip} updateTrip={this.updateTrip}/>
                    <Button size="sm" color="Link" onClick={this.toggleModal}>Advanced Options</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader>Advanced Options</ModalHeader>
                        <ModalBody>
                            <Optimization options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                            <SetServer/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModal}>Done</Button>
                        </ModalFooter>
                    </Modal>
                </CardBody>
            </Card>;
        return(options)
    }

    createTrip(){
        let tripBuilder =
            <Row>
                <Col md={6}>
                    <UploadFile trip={this.state.trip} config={this.state.config} updateTrip={this.updateTrip}/>
                </Col>
                <Col md={6}>
                    <Search config={this.state.config} trip={this.state.trip} updateTrip={this.updateTrip}/>
                </Col>
            </Row>;

        return(tripBuilder)

    }

    render() {
        if(!this.state.config) { return <div/> }

        return(
            <Container id="Application">
                <Info/><br/>
                <Row>
                    <Col md={6}>
                        <Button onClick={this.toggle} className="btn-dark" block>Trip Options</Button>
                        <Collapse isOpen={this.state.collapse}>
                            {this.createOptions()}
                        </Collapse>
                    </Col>
                    <Col md={6}>
                        <TwoPtCalculator config={this.state.config} options={this.state.trip.options}/><br/>
                    </Col>
                </Row><br/>
                {this.createTrip()} <br/>
                <Button color="primary" type="Submit" onClick={this.planTrip} block>Plan Trip</Button><br/>
                <ItineraryForm trip={this.state.trip} updateTrip={this.updateTrip} planTrip={this.planTrip}/><br/>
                <Map trip={this.state.trip} config={this.state.config}/><br/>
                <div align="center">
                    <Button onClick={this.saveTFFI} className="btn-dark">Save Trip</Button>{' '}
                    <Button onClick={this.saveMap} className="btn-dark">Save Map</Button>{' '}
                    <Button className="btn-dark" onClick={this.clearTrip}>Clear</Button></div>
            </Container>
        )
    }
}


export default Application;

/*
            <Container id="Application" >
                <Info/>
                <Row>
                    <Col md={6}>
                        <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                    </Col>
                    <Col md={6}>
                        <Optimization options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={6}>
                        <SetServer/>
                    </Col>
                    <br/>
                    <Col md={6}>
                        <TwoPtCalculator config={this.state.config} options={this.state.trip.options}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={6}>
                        <UploadFile trip={this.state.trip} config={this.state.config} updateTrip={this.updateTrip}/>
                    </Col>
                    <Col md={6}>
                        <Search config={this.state.config} trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </Col>
                </Row>
                <br/>
                <Button color="primary" type="Submit" onClick={this.planTrip} block>Plan Trip</Button>
                <br/>
                <Map trip={this.state.trip} config={this.state.config}/>
                <br/>
                <ItineraryForm trip={this.state.trip} updateTrip={this.updateTrip} planTrip={this.planTrip}/>
                <br/>
                <div align="Center"><Button onClick={this.saveTFFI} type="Button" className="btn-dark">Save Trip</Button></div>
            </Container>
 */

