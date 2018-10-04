import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api'

class TwoPtCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false ,
            units: 'miles',
            unitName: '',
            unitRadius: '',
            origin: {
                latitude: null,
                longitude: null,
            },
            destination:{
                latitude: null,
                longitude: null,
            }
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.oLatChange = this.oLatChange.bind(this);
        this.oLonChange = this.oLonChange.bind(this);
        this.dLatChange = this.dLatChange.bind(this);
        this.dLonChange = this.dLonChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    onFormSubmit() {
        console.log(JSON.stringify(this.state));
        request(this.state, 'distance', serverURL).then(
            (response) => {
                console.log(response);
            }
        )
    }

    oLatChange(event){
        let oLat = event.target.value;
        console.log("oLat:" + oLat);
        let dist = this.state.origin;
        dist.latitude = oLat;
        this.setState(dist);
        console.log(this.state)
    }

    oLonChange(event){
        let oLon = event.target.value;
        console.log("oLon:" + oLon);
        let dist = this.state.origin;
        dist.longitude = oLon;
        this.setState(dist);
        console.log(this.state)
    }

    dLatChange(event){
        let dLat = event.target.value;
        console.log("dLat:" + dLat);
        let dist = this.state.destination;
        dist.latitude = dLat;
        this.setState(dist);
        console.log(this.state)
    }

    dLonChange(event){
        let dLon = event.target.value;
        console.log("dLon:" + dLon);
        let dist = this.state.destination;
        dist.longitude = dLon;
        this.setState(dist);
        console.log(this.state)
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
                                    <Input placeholder="45.00" onChange={(event)=> this.oLatChange(event)}/>
                                <InputGroupAddon addonType={"prepend"}>Origin Longitude</InputGroupAddon>
                                    <Input placeholder="101.00" onChange={(event)=> this.oLonChange(event)}/>
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}>Destination Latitude</InputGroupAddon>
                                    <Input placeholder="45.00" onChange={(event)=> this.dLatChange(event)}/>
                                <InputGroupAddon addonType={"prepend"}>Destination Longitude</InputGroupAddon>
                                    <Input placeholder="101.00" onChange={(event)=> this.dLonChange(event)}/>
                            </InputGroup>
                            <br/>
                            <Button type="submit" onClick={this.onFormSubmit}>Calculate</Button>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
export default TwoPtCalculator;
