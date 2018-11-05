import React, {Component} from 'react';
import {Button, Collapse} from "reactstrap";


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
        {
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