import React, {Component} from 'react';
import {Button, Collapse, Alert, Card} from "reactstrap";
import { Map, Marker, TileLayer, Polyline} from 'react-leaflet'


/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class myMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0.00,
            lng: -104.99,
            zoom: 2,
        };
        this.makeLine = this.makeLine.bind(this);
        this.getCordPairs = this.getCordPairs.bind(this);
    }

    getCordPairs() {
        let myPlaces = this.props.trip.places;
        let coordinateList = [];
        for (let i = -1; i < myPlaces.length; i++) {
            let place = myPlaces[(i + 1) % myPlaces.length];
            let coord = [parseFloat(place.latitude), parseFloat(place.longitude)];
            coordinateList.push(coord);
        }
        return(coordinateList);
    }

    makeLine() {
        let cordList = this.getCordPairs();
        let path = <Polyline positions={cordList} color={"purple"}/>;
        return(path)
    }

    render() {
        if (this.props.trip.distances.length === 0){
            return(
                <div>
                    <Map id={"map"} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
                        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                   url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                    </Map>
                </div>
            )
        } else {
            return(
            <div>
                <Map id={"map"} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                    {this.makeLine()}
                </Map>
            </div>);

        }
    }

}

export default myMap;

