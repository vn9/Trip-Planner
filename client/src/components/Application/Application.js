import React, {Component} from 'react';
import {Container, Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Collapse, Card, CardBody, Input,
    InputGroup, InputGroupAddon} from 'reactstrap';
import Info from './Info'
import Options from './Options';
import UploadFile from './UploadFile';
import Map from './Map';
import ItineraryForm from './ItineraryForm';
import TwoPtCalculator from './twoPointCalc';
import SetServer, {serverURL} from './SetServer';
import Search from './Search';
import Optimization from './Optimization';
import MapType from './MapType';
import ManualAdd from './ManualAdd';
import ClearSavePlan from './ClearSavePlan';


import {get_config, request} from '../../api/api';


/* Renders the application.
 * Holds the destinations and options state shared with showName: true,
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
                    map : "svg"
                },
                places: [],
                distances: [],
                map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
            },

        };
        this.bindFunctions = this.bindFunctions.bind(this);
    }

    bindFunctions(){
        this.planTrip = this.planTrip.bind(this);
        this.updateTrip = this.updateTrip.bind(this);
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.createOptions = this.createOptions.bind(this);
        this.createTrip = this.createTrip.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
    }


    componentWillMount() {
        this.updateConfig();
        }

    updateConfig() {
        if(serverURL === 'http://localhost:31428'){
            get_config('http://localhost:31404').then(
                config => {
                    this.setState({
                        config:config
                    })
                }
            );
        } else{
            get_config(serverURL).then(
                config => {
                    this.setState({
                        config:config
                    })
                }
            );
        }
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

    updateTitle(){
        let title = document.getElementById("title").value;
        this.updateTrip('title', title);
    }

    createOptions(){
        let options =
            <Card>
                <CardBody>
                    <InputGroup>
                        <InputGroupAddon addonType={"prepend"}>Trip Title</InputGroupAddon>
                        <Input id={"title"} value={this.state.trip.title} onChange={this.updateTitle}/>
                    </InputGroup><br/>
                    <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}
                                trip={this.state.trip} updateTrip={this.updateTrip}/>
                    <Button size="sm" color="Link" onClick={this.toggleModal}>Advanced Options</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader>Advanced Options</ModalHeader>
                        <ModalBody>
                            <Optimization options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                            <MapType options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                            <SetServer config={this.state.config} updateConfig={this.updateConfig}/>
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
                <Col md={4}>
                    <UploadFile trip={this.state.trip} config={this.state.config} updateTrip={this.updateTrip} clearTrip={this.clearTrip}/>
                </Col>
                <Col md={4}>
                    <Search config={this.state.config} trip={this.state.trip} updateTrip={this.updateTrip}/>
                </Col>
                <Col md={4}>
                    <ManualAdd config={this.state.config} trip={this.state.trip} updateTrip={this.updateTrip}/>
                </Col>
            </Row>;

        return(tripBuilder)
    }

    render() {
        this.bindFunctions();
        if(!this.state.config) { return <div/> }

        return(
            <Container id="Application">
                <Info/><br/>
                <Row>
                    <Col md={6}>
                        <Button onClick={this.toggle} className="btn-dark" block>Trip Options</Button>
                        <Collapse isOpen={this.state.collapse}>{this.createOptions()}</Collapse>
                    </Col>
                    <Col md={6}>
                        <TwoPtCalculator config={this.state.config} options={this.state.trip.options}/><br/>
                    </Col>
                </Row><br/>
                {this.createTrip()} <br/>
                <ItineraryForm trip={this.state.trip} updateTrip={this.updateTrip} planTrip={this.planTrip} config={this.state.config} /><br/>
                <Map trip={this.state.trip}/><br/>
                <ClearSavePlan trip={this.state.trip} updateBasedOnResponse={this.updateBasedOnResponse}
                               planTrip={this.planTrip}/>
            </Container>
        )
    }
}


export default Application;
