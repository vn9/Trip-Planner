import React, {Component} from 'react';
import {Button, Collapse, Alert} from "reactstrap";


/* Map obtains and renders the map for the trip.
 * Might be an SVG or KML contained in the server response.
 */
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: true,
        };

        this.toggle = this.toggle.bind(this);

    }

    toggle(){
        this.setState({collapse: !this.state.collapse})
    }


    render() {
         if(this.props.options.map === "kml" && this.props.trip.distances.length === 0){
            return(
                <div>
                    <Alert align="center" color={"danger"}>Plan Your Trip in Order to Get Your Map</Alert>
                </div>
            )
        } else if(this.props.options.map === "kml" && this.props.trip.distances.length > 0) { return(
                <div>
                    <Alert align="center" color={"success"}>Your Map is Ready for Download!</Alert>
                </div>
            )
        } else{
            let svgHeader='data:image/svg+xml;charset=UTF-8,';
            let svgData = this.props.trip.map;
            return (
                <div>
                    <Button onClick={this.toggle} className='btn-dark' block>Map</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <img className="figure-img img-fluid" alt="Map"
                             src={svgHeader.concat(svgData)} width="100%" height="100%"/>
                    </Collapse>
                </div>
            )
        }
    }
}

export default Map;