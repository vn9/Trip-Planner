import React, {Component} from 'react'
import {Card, CardBody, Button, Input, Collapse} from 'reactstrap'
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
        this.getUnits = this.getUnits.bind(this);
        this.displayUnits = this.displayUnits.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
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

    updateLocation(coordinate,value,origin){
      let place;
      if(origin=== true)
        place = this.state.distance.origin;
      if(origin === false)
        place = this.state.distance.destination;
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
                          <Input placeholder="Origin Latitude in Degree ex. 45.00" onChange={(event) => this.updateLocation('latitude', event.target.value, true)}/>
                          <Input placeholder="Origin Longitude in Degree ex. 101.00" onChange={(event) => this.updateLocation('longitude', event.target.value, true)}/>
                          <br/>
                          <Input placeholder="Destination Latitude in Degree ex. 45.00" onChange={(event) => this.updateLocation('latitude', event.target.value, false)}/>
                          <Input placeholder="Destination Longitude in Degree ex. 101.00" onChange={(event) => this.updateLocation('longitude', event.target.value, false)}/>
                          <br/>
                          <Button type="submit" onClick={this.onFormSubmit}>Get Distance</Button>
                          <p>{"Your Distance: " + this.state.distance.distance + ' ' + this.displayUnits()}</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

export default TwoPtCalculator;
