import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse, Fade, CardText} from 'reactstrap'

export var serverURL =  'http://' + location.host;  //Sets the default server to some local host
import {get_config} from "../../api/api";

class SetServer extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            collapse: false,
            server: "",
        };

        this.serverChange = this.serverChange.bind(this);
        this.toggleServer= this.toggleServer.bind(this);
        this.onClick = this.onClick.bind(this);
    };

    serverChange(e){
        let myServer = e.target.value;
        this.setState({server:myServer});

        console.log(serverURL);
        console.log(this.state.server);
    }

    onClick(){
        let aServer = this.state.server;
        if (aServer === "" || null){
            aServer = 'http://' + location.host;
        }
        serverURL = aServer;
        this.props.updateConfig();
    }

    toggleServer(){
        this.setState({collapse: !this.state.collapse})
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

/*
    render(){
        return(
            <div>
                <Button onClick={this.toggleServer} className='btn-dark' block>Choose a Server</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType={"prepend"}> Server URL</InputGroupAddon>
                                <Input id="newServer" defaultValue={serverURL}  onChange={(e)=> this.serverChange(e)}/>
                                <InputGroupAddon addonType={"append"}><Button onClick={this.resetServer}>Reset Server</Button></InputGroupAddon>
                            </InputGroup>
                            <CardText>
                                <small className="text-muted">The server updates automatically as you type. If you wish to restore the default, hit Reset Server.</small>
                            </CardText>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

        )
    }
 */



