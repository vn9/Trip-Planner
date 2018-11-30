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
            lng: 0.00,
            zoom: 2,
            maxBounds: [[-90,-175], [90,180]]
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
        let map = this.state;
        if (this.props.trip.distances.length === 0){
            return(
                <div>
                    <Map maxBounds={map.maxBounds} id={"map"} center={[map.lat, map.lng]} zoom={map.zoom}>
                        <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
                        &copy; <a href="https://carto.com/attribution">CARTO</a>'
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"/>
                    </Map>
                </div>
            )
        } else {
            return(
            <div>
                <Map id={"map"} setView={true} zoom={map.zoom} maxBounds={map.maxBounds} minZoom={1}>
                    <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
                        &copy; <a href="https://carto.com/attribution">CARTO</a>'
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                        />
                    {this.makeLine()}
                </Map>
            </div>);
        }
    }

}

export default myMap;
