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
export default class Application extends Component {
    constructor(props){
        super(props);
        this.state = {
            config: null,
            modal: false,
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
                //console.log(response);
                this.updateBasedOnResponse(response);
            })
    }


    updateTitle() {
        let title = document.getElementById("title").value;
        this.updateTrip('title', title);
    }

    createOptions(){
        let options =
            <div>
                <Row>
                    <Col md={4}>
                        <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}
                                trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </Col>
                    <Col md={4}>
                        <Optimization options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                    </Col>
                    <Col md={4}>
                        <MapType options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                    </Col>
                </Row>
                <SetServer config={this.state.config} updateConfig={this.updateConfig}/>
            </div>;
        return(options)
    }

    myNav(){
        return(
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-upload-tab" data-toggle="tab"
                       href="#nav-upload" role="tab" aria-controls="nav-upload" aria-selected="true">Upload File</a>
                    <a className="nav-item nav-link" id="nav-manual-tab" data-toggle="tab" href="#nav-manual" role="tab"
                       aria-controls="nav-manual" aria-selected="false">Manual Add</a>
                    <a className="nav-item nav-link" id="nav-search-tab" data-toggle="tab" href="#nav-search" role="tab"
                       aria-controls="nav-search" aria-selected="false">Search</a>
                    <a className="nav-item nav-link" id="nav-options-tab" data-toggle="tab" href="#nav-options"
                       role="tab" aria-controls="nav-options" aria-selected="false">Options</a>
                </div>
            </nav>
        );
    }

    smallTabs(){
        return(
            <div>
                {this.myNav()}
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-upload"
                         role="tabpanel" aria-labelledby="nav-upload-tab">
                        <UploadFile trip={this.state.trip} config={this.state.config}
                                    updateTrip={this.updateTrip} clearTrip={this.clearTrip}/>
                    </div>
                    <div className="tab-pane fade" id="nav-manual" role="tabpanel" aria-labelledby="nav-manual-tab">
                        <ManualAdd config={this.state.config} trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </div>
                    <div className="tab-pane fade" id="nav-search" role="tabpanel" aria-labelledby="nav-search-tab">
                        <Search config={this.state.config} trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </div>
                    <div className="tab-pane fade" id="nav-options" role="tabpanel" aria-labelledby="nav-options-tab">
                        {this.createOptions()}
                    </div>
                </div>
            </div>
        );
    }

    planPill(){
        let pill =
            <Card>
                <CardBody>

                    <Map trip={this.state.trip}/>
                    <ItineraryForm trip={this.state.trip} updateTrip={this.updateTrip} planTrip={this.planTrip} config={this.state.config}/><br/>
                    <ClearSavePlan trip={this.state.trip} updateBasedOnResponse={this.updateBasedOnResponse}
                                   planTrip={this.planTrip}/><br/>
                    {this.smallTabs()}
                </CardBody>
            </Card>;
        return(pill);
    }

    generateTabs(){
        let tabs =
            <ul className="nav nav-pills mb-3" id="pills-tab"
                role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab"
                       data-toggle="pill" href="#pills-home" role="tab"
                       aria-controls="pills-home"
                       aria-selected="true">Plan Trip</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-profile-tab"
                       data-toggle="pill" href="#pills-profile" role="tab"
                       aria-controls="pills-profile"
                       aria-selected="false">Distance Calculation</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-contact-tab"
                       data-toggle="pill" href="#pills-contact" role="tab"
                       aria-controls="pills-contact"
                       aria-selected="false">About Us</a>
                </li>
            </ul>;
        return(tabs);
    }

    tabContents() {
        return(
            <div className="tab-content">
                {this.generateTabs()}
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home"
                         role="tabpanel" aria-labelledby="pills-home-tab">
                        {this.planPill()}
                    </div>
                    <div className="tab-pane fade" id="pills-profile"
                         role="tabpanel" aria-labelledby="pills-profile-tab">
                        <TwoPtCalculator config={this.state.config}
                                         options={this.state.trip.options}/>
                    </div>
                    <div className="tab-pane fade" id="pills-contact"
                         role="tabpanel" aria-labelledby="pills-contact-tab">
                        <Info/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        this.bindFunctions();
        if(!this.state.config) { return <div/> }
        return(
            <Container id="Application">
                {this.tabContents()}
            </Container>
        )
    }
}