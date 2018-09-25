import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'


export default class UploadFile extends React.Component {
    constructor(){
        super();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state =  {
            origin_latitude: '',
            origin_longitude: '',
            destination_latitude: '',
            destination_longitude: ''
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
                        origin_latitude="text"
                        placeholder="101.00"
                        value={this.state.origin_latitude}
                        onChange={e => this.setState({origin_latitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Origin Longitude:</Label>
                    <Input
                        type="text"
                        origin_longitude="text"
                        placeholder="101.00"
                        value={this.state.origin_longitude}
                        onChange={e => this.setState({origin_longitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destination Latitude:</Label>
                    <Input
                        type="text"
                        destination_latitude="text"
                        placeholder="101.00"
                        value={this.state.destination_latitude}
                        onChange={e => this.setState({destination_latitude: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destination Longitude:</Label>
                    <Input
                        type="text"
                        destination_longitude="text"
                        placeholder="101.00"
                        value={this.state.destination_longitude}
                        onChange={e => this.setState({destination_longitude: e.target.value})}
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