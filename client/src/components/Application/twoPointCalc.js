import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse, Col, Row} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api'

class TwoPtCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onFormSubmit() {
        console.log(JSON.stringify(this.props.distance));
        request(this.props.distance, 'distance', serverURL).then(
            (response) => {
                console.log(response);
                this.props.updateDist(response);

            }
        )
    }

    toggle(){
        this.setState({collapse: !this.state.collapse})
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
                                    <Input placeholder="45.00" onChange={(event)=> this.props.updateDistOrLat(event.target.value)}/>
                                <InputGroupAddon addonType={"prepend"}>Origin Longitude</InputGroupAddon>
                                    <Input placeholder="101.00" onChange={(event)=> this.props.updateDistOrLon(event.target.value)}/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}>Destination Latitude</InputGroupAddon>
                                    <Input placeholder="45.00" onChange={(event)=> this.props.updateDistDeLat(event.target.value)}/>
                                <InputGroupAddon addonType={"prepend"}>Destination Longitude</InputGroupAddon>
                                    <Input placeholder="101.00" onChange={(event)=> this.props.updateDistDeLon(event.target.value)}/>
                            </InputGroup>
                            <br/>
                            <Button type="submit" onClick={this.onFormSubmit}>Get Distance</Button>
                            <p>{"Your Distance: " + this.props.distance.distance + ' ' + this.props.distance.units}</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
export default TwoPtCalculator;
