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
            },

            distance: {
                type: "distance",
                version: 0,
                units: "miles",
                unitName: "",
                unitRadius: 0.00,
                origin: {
                    latitude: "",
                    longitude: "",
                },
                destination: {
                    latitude: "",
                    longitude: "",
                },
                distance: 0,
            }

        };

        this.updateTrip = this.updateTrip.bind(this);
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateDistDeLat = this.updateDistDeLat.bind(this);
        this.updateDistDeLon = this.updateDistDeLon.bind(this);
        this.updateDistOrLat = this.updateDistOrLat.bind(this);
        this.updateDistOrLon = this.updateDistOrLon.bind(this);
        this.updateDist = this.updateDist.bind(this);


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

    updateDistOrLat(value){
        let place= this.state.distance.origin;
        place.latitude = value;
        this.setState(place);
    }
    updateDistOrLon(value){
        let place= this.state.distance.origin;
        place.longitude = value;
        this.setState(place);
    }

    updateDistDeLat(value){
        let place = this.state.distance.destination;
        place.latitude = value;
        this.setState(place);
    }
    updateDistDeLon(value){
        let place = this.state.distance.destination;
        place.longitude = value;
        this.setState(place);
    }

    updateDist(value){
        let place=this.state.distance;
        place.distance = value;
        this.setState(place);
    }

    render() {
        if(!this.state.config) { return <div/> }

        return(
            <Container id="Application" >
                <Info/>
                <Options options={this.state.trip.options} config={this.state.config} updateOptions={this.updateOptions}/>
                <UploadFile trip={this.state.trip} config={this.state.config} updateTrip={this.updateTrip}
                            updateBasedOnResponse={this.updateBasedOnResponse}/>
                <SetServer/>
                <br/>
                <TwoPtCalculator distance={this.state.distance} config={this.state.config} updateDist={this.updateDist}
                                 updateDistOrLat={this.updateDistOrLat} updateDistDeLat={this.updateDistDeLat}
                                 updateDistOrLon={this.updateDistOrLon} updateDistDeLon={this.updateDistDeLon}/>
                <br/>
                <Map trip={this.state.trip} config={this.state.config}/>
                <br/>
                <ItineraryForm trip={this.state.trip}/>
            </Container>

        )
    }

}


export default Application;

