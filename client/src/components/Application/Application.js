import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';
import UploadFile from './UploadFile';
import Map from './Map';
import ItineraryForm from './ItineraryForm';
import TwoPtCalculator from './twoPointCalc';
import SetServer from './SetServer';


import { get_config } from '../../api/api';


/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props){
        super(props);
        this.state = {
            config: null,
            trip: {
                type: "trip",
                title: "",
                options: {
                    units: "miles",
                    unitName: "",
                    unitRadius: 0.0000
                },
                places: [],
                distances: [],
                map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
            }

        };

        this.updateTrip = this.updateTrip.bind(this);
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        //this.updateServer = this.updateServer.bind(this);

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

    render() {
        if(!this.state.config) { return <div/> }

        return(
            <Container id="Application" >
                <Info/>
                <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                <UploadFile trip={this.state.trip} config={this.state.config} updateTrip={this.updateTrip}/>
                <SetServer/>
                <br/>
                <TwoPtCalculator/>
                <br/>
                <Map trip={this.state.trip} config={this.state.config}/>
                <br/>
                <ItineraryForm trip={this.state.trip}/>
            </Container>

        )
    }

}


export default Application;





/*
Add these back if we want to add back an entire js for setting the server port

import SetServer from './SetServer';
updateServer(value){
        let x= this.state.serverURL;
        x.serverURL = value;
        console.log(x);
        this.setState(x);
    }
    //serverURL: 'http://' + location.host,
    //<SetServer server= {this.state.serverURL} updateServer={this.updateServer}/>
 */