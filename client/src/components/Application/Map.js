import React, {Component} from 'react';
import { Map, TileLayer, Polyline} from 'react-leaflet'


/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class myMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 5.00,
            lng: -5.00,
            zoom: 2,
            maxBounds: [[-90,-180], [90,180]]
        };
        this.makeLine = this.makeLine.bind(this);
        this.getCordList = this.getCordList.bind(this);
        this.getPairs = this.getPairs.bind(this);
    }

    makeLine() {
        let lines = [];
        let coordinateList = this.getCordList();
        for (let i = 0; i < coordinateList.length; i++){
            let myLine =
                <Polyline key={coordinateList[i]} positions={[coordinateList[i]]} color={"purple"}/>;
            lines.push(myLine);
        }
        return(lines)
    }

    getCordList(){
        let places = this.props.trip.places;
        let myCoordinates = [];
        for (let i = 0; i < places.length; i++){
            let current = places[i];
            let next = places[(i+1) % places.length];
            let pair = this.getPairs(current,next);

            for (let i = 0; i< pair.length; i++){
                myCoordinates.push(pair[i]);
            }
        }
        return(myCoordinates)

    }

    getPairs(current, next) {
        let pair = [];
        let cLat = parseFloat(current.latitude);
        let cLon = parseFloat(current.longitude);
        let nLat = parseFloat(next.latitude);
        let nLon = parseFloat(next.longitude);
        let cLon2;
        let nLon2;
        if (Math.abs(cLon-nLon) > 180){
            if (cLon < nLon){
                cLon2 = cLon + 360;
                nLon2 = nLon - 360;
            } else{
                cLon2 = cLon - 360;
                nLon2 = nLon + 360;
            }
            pair = [[[cLat, cLon], [nLat, nLon2]] ,[[nLat, nLon], [cLat, cLon2]]]
        } else {
            pair = [[[cLat, cLon], [nLat, nLon]]]
        }
        return(pair)
    }

    render() {
        let map = this.state;
        if (this.props.trip.distances.length === 0){
            return(
                <div>
                    <Map maxBounds={map.maxBounds} id={"map"} center={[map.lat, map.lng]} zoom={map.zoom} minZoom={2}>
                        <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
                        &copy; <a href="https://carto.com/attribution">CARTO</a>'
                            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                                   noWrap={true} minZoom={2}/>
                    </Map>
                </div>
            )
        } else {
            return(
            <div>
                <Map id={"map"} setView={true} zoom={map.zoom} maxBounds={map.maxBounds} minZoom={2}>
                    <TileLayer noWrap={true} attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
                        &copy; <a href="https://carto.com/attribution">CARTO</a>'
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" minZoom={2}
                        />
                    {this.makeLine()}
                </Map>
            </div>);
        }
    }

}

export default myMap;
