import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse, Fade, CardText} from 'reactstrap'

export var serverURL =  'http://' + location.host;  //Sets the default server to some local host

class SetServer extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            collapse: false,
            server: "",
        };

        this.serverChange = this.serverChange.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    serverChange(e){
        let myServer = e.target.value;
        this.setState({server:myServer});
    }

    onClick(){
        let aServer = this.state.server;
        if (aServer === "" || null){
            aServer = 'http://' + location.host;
        }
        serverURL = aServer;
        this.props.updateConfig();
    }

    render(){
        return(
            <div>
                <Card>
                    <CardBody>
                        <p align="Center">Choose A Server</p>
                        <InputGroup>
                            <InputGroupAddon addonType={"prepend"}>URL</InputGroupAddon>
                            <Input id="newServer" defaultValue={serverURL}  onChange={(e)=> this.serverChange(e)}/>
                            <InputGroupAddon addonType={"append"}><Button onClick={this.onClick}>Set Server</Button></InputGroupAddon>
                        </InputGroup>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default SetServer;




