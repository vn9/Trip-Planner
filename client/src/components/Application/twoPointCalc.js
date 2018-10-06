import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse, Col, Row} from 'reactstrap'
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
    }

    onFormSubmit() {
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
        let place=this.state.distance;
        place.distance = value;
        this.setState(place);
    }


    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='btn-dark' block>Distance Calculator</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}> Origin Latitude</InputGroupAddon>
                                    <Input placeholder="45.00" onChange={(event)=> this.updateOrigin('latitude',event.target.value)}/>
                                <InputGroupAddon addonType={"prepend"}>Origin Longitude</InputGroupAddon>
                                    <Input placeholder="101.00" onChange={(event)=> this.updateOrigin('longitude', event.target.value)}/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}>Destination Latitude</InputGroupAddon>
                                    <Input placeholder="45.00" onChange={(event)=> this.updateDestination('latitude', event.target.value)}/>
                                <InputGroupAddon addonType={"prepend"}>Destination Longitude</InputGroupAddon>
                                    <Input placeholder="101.00" onChange={(event)=> this.updateDestination('longitude', event.target.value)}/>
                            </InputGroup>
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
