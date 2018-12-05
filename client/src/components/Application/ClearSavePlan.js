import {Component} from "react";
import {Button} from "reactstrap";
import React from "react";

export default class ClearSavePlan extends Component {
    constructor(props) {
        super(props);
        this.saveTFFI = this.saveTFFI.bind(this);
        this.saveMap = this.saveMap.bind(this);
        this.clearTrip = this.clearTrip.bind(this);
    }


    clearTrip(){
        let myTrip = this.props.trip;
        myTrip.title="";
        myTrip.distances= [];
        myTrip.title = '';
        myTrip.places = [];
        myTrip.map = '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>';
        myTrip.options = {units: 'miles'};
        document.getElementById('fileInput').value = null;
        this.props.updateBasedOnResponse(myTrip);
    }


    /* Saves the map and itinerary to the local file system. */

    saveTFFI(){
        let trip = this.props.trip;
        let tripTitle = trip.title;

        //Convert data to TFFI formatted string
        trip['map'] = trip.map;
        let tffi = JSON.stringify(trip); // make the map attributes to be ''

        //add .json extension if not already added by user
        if(!tripTitle.endsWith(".json")){
            tripTitle += ".json";
        }

        //generate file and download
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tffi));
        element.setAttribute('download', tripTitle);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    saveMap(){
        //generate file and download
        let trip = this.props.trip;
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + trip.map);

        if (trip.options.map === "kml"){
            element.setAttribute('download', 'download.kml');
        } else {
            element.setAttribute('download', 'download.svg');
        }

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    render() {
        return(
            <div align="center" className={"inline"}>
                <Button id="plan" color="primary" type="Submit" onClick={this.props.planTrip} >Plan Trip</Button>{' '}
                <Button id="tripSave" onClick={this.saveTFFI} className="btn-dark">Save Trip</Button>{' '}
                <Button id="mapSave" onClick={this.saveMap} className="btn-dark">Save Map</Button>{' '}
                <Button id="clear" className="btn-dark" onClick={this.clearTrip}>Clear</Button>
            </div>
        )
    }
}