import React, {Component} from 'react'
import {Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'

import {request} from '../../api/api'


var myObject;
var serverURL =  'http://' + location.host;  //Sets the default server to some local host

export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.serverChange = this.serverChange.bind(this)

    }

    loadFile(event){
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event)=> {
            console.warn("file data",event.target.result); // Print to console
            const object = JSON.parse(event.target.result); // Convert JSON string to java object
            myObject = object;
            console.log(myObject);


        }
    };

    serverChange(e){
        serverURL = e.target.value;
        console.log(serverURL)
    }

    onFormSubmit(){
        request(myObject, 'plan', serverURL).then(                 //Calls request function from api.js, takes a body object, api method/name)
            (response) => {                             //After resolved, we have a thing in response
                console.log(response);                  //Prints the response in the console
                for (var key in response){              //Key is a part of the tffi(version, type, places, options, etc)
                    var value = response[key];          //Sets a variable called value to the information of each part of
                    this.props.updateTrip(key, value);  //the tffi( version: 2, whats in the places, options,etc)
                    console.log(key);                   //Updates the state of the trip in application with the key and value
                    console.log(value);                 //Prints out the key and associated value in the console
                }
            })

    }

    render() {
        return (
            <Card>
                <CardBody>
                    <p> Choose Your Server </p>
                <Form>
                    <FormGroup>

                        <Input type="text"
                                //value="text"
                                placeholder="http://black-bottle.cs.colostate.edu:31404"
                                onChange={(e) =>this.serverChange(e)}/>
                        <FormText color="muted">
                            Input full server URL above if desired
                        </FormText>
                    </FormGroup>
                </Form>
                    <p> Upload Your File </p>
                <Form>
                    <FormGroup>

                        <Input
                            title="upload"
                            type="file"
                            id="fileInput"
                            onChange={(event)=>this.loadFile(event)}>
                        </Input>
                        <FormText color="muted">
                            Enter Something here
                        </FormText>
                        <Button type="button" onClick={this.onFormSubmit}>Submit</Button>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
        )
    }
}


//function with key, for key in json thing.  //14, Joe Eschen


