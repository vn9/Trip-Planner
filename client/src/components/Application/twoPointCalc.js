import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import {serverURL} from  './UploadFile'

import {request} from '../../api/api'

class TwoPtCalculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: 'miles',
            unitName: '',
            unitRadius: '',
            origin: {
                latitude: '',
                longitude: '',
            },
            destination:{
                latitude: '',
                longitude: '',
            }
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.oLatChange = this.oLatChange.bind(this);
        this.oLonChange = this.oLonChange.bind(this);
        this.dLatChange = this.dLatChange.bind(this);
        this.dLonChange = this.dLonChange.bind(this);
    }

    onFormSubmit() {
        console.log(JSON.stringify(this.state));
        request(this.state, 'distance', serverURL).then(
            (response) => {
                console.log(response);s
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
        console.log(this.state);
    }

    dLatChange(event){
        let dLat = event.target.value;
        console.log("dLat:" + dLat);
        let dist = this.state.destination;
        dist.latitude = dLat;
        this.setState(dist);
        console.log(this.state);
    }

    dLonChange(event){
        let dLon = event.target.value;
        console.log("dLon:" + dLon);
        let dist = this.state.destination;
        dist.longitude = dLon;
        this.setState(dist);
    }

    render() {
        return (
            <Card>
            <CardBody>
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    <Label>Origin Latitude:</Label>
                    <Input
                        type="text"
                        originLatitude="text"
                        placeholder="101.00"
                        onChange={(event)=> this.oLatChange(event)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Origin Longitude:</Label>
                    <Input
                        type="text"
                        originLongitude="text"
                        placeholder="101.00"
                        onChange={(event)=> this.oLonChange(event)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destination Latitude:</Label>
                    <Input
                        type="text"
                        destinationLatitude="text"
                        placeholder="101.00"
                        onChange={(event)=> this.dLatChange(event)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destination Longitude:</Label>
                    <Input
                        type="text"
                        destinationLongitude="text"
                        placeholder="101.00"
                        onChange={(event)=> this.dLonChange(event)}
                    />
                    <Button type="submit">Calculate</Button>
                </FormGroup>
            </Form>
            </CardBody>
            </Card>
        )
    }

}
export default TwoPtCalculator;
