import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api'

class TwoPtCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
          collapse: false,
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

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateDist = this.updateDist.bind(this);
        this.updateDestination = this.updateDestination.bind(this);
        this.updateOrigin = this.updateOrigin.bind(this);
        this.getUnits = this.getUnits.bind(this);
        this.displayUnits = this.displayUnits.bind(this);
    }

    getUnits() {
        let distance = this.state.distance;
        let options = this.props.options;

        distance.units = options.units;
        if (options.units === "user defined") {
            distance.unitName = options.unitName;
            distance.unitRadius = options.unitRadius;
        }
        this.setState(distance);
        console.log(distance);

    }

    onFormSubmit() {
        this.getUnits();
        console.log(JSON.stringify(this.state.distance));
        request(this.state.distance, 'distance', serverURL).then(
            (response) => {
                console.log(response);
                this.updateDist(response);
            }
        )
    }

    toggle(){
        this.setState({collapse: !this.state.collapse})
    }

    updateOrigin(coordinate, value){
        let place = this.state.distance.origin;
        place[coordinate] = value;
        this.setState(place);
    }

    updateDestination(coordinate, value){
        let place = this.state.distance.destination;
        place[coordinate] = value;
        this.setState(place);
    }

    updateDist(value){
        this.setState({'distance' : value});
    }

    displayUnits(){
        let unit = this.state.distance.units;
        if (unit === "user defined"){
            unit = this.state.distance.unitName;
        }
        return(unit);
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='btn-dark' block>Distance Calculator</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                          <Input placeholder="Origin Latitude in Degree ex. 45.00" onChange={(event) => this.updateOrigin('latitude', event.target.value)}/>
                          <Input placeholder="Origin Longitude in Degree ex. 101.00" onChange={(event) => this.updateOrigin('longitude', event.target.value)}/>
                          <br/>
                          <Input placeholder="Destination Latitude in Degree ex. 45.00" onChange={(event) => this.updateOrigin('latitude', event.target.value)}/>
                          <Input placeholder="Destination Longitude in Degree ex. 101.00" onChange={(event) => this.updateOrigin('longitude', event.target.value)}/>
                          <br/>
                          <Button type="submit" onClick={this.onFormSubmit}>Get Distance</Button>
                          <p>{"Your Distance: " + this.state.distance.distance + ' ' + this.state.distance.units}</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

export default TwoPtCalculator;
