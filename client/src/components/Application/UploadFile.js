import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'


export default class UploadFile extends React.Component {
    constructor(){
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state =  {
            originLatitude: '',
            originLongitude: '',
            destinationLatitude: '',
            destinationLongitude: ''
        };
    }

    onFormSubmit(){
        alert(JSON.stringify(this.state, null, ' '));
    }

    render() {
        return (
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    <Label>Origin Latitude:</Label>
                    <Input
                        type="text"
                        originLatitude="text"
                        placeholder="101.00"
                        value={this.state.originLatitude}
                        onChange={e => this.setState({originLatitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Origin Longitude:</Label>
                    <Input
                        type="text"
                        originLongitude="text"
                        placeholder="101.00"
                        value={this.state.originLongitude}
                        onChange={e => this.setState({originLongitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destination Latitude:</Label>
                    <Input
                        type="text"
                        destinationLatitude="text"
                        placeholder="101.00"
                        value={this.state.destinationLatitude}
                        onChange={e => this.setState({destinationLatitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destination Longitude:</Label>
                    <Input
                        type="text"
                        destinationLongitude="text"
                        placeholder="101.00"
                        value={this.state.destinationLongitude}
                        onChange={e => this.setState({destinationLongitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        Enter Something here
                    </FormText>
                    <Button type="submit">Submit</Button>
                </FormGroup>
            </Form>
        )
    }
}