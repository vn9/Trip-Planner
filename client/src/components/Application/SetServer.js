import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Collapse, Fade, CardText} from 'reactstrap'

export var serverURL =  'http://' + location.host;  //Sets the default server to some local host

class SetServer extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            collapse: false,
        };

        this.serverChange = this.serverChange.bind(this);
        this.toggleServer= this.toggleServer.bind(this);
        this.resetServer = this.resetServer.bind(this);
    };

    serverChange(e){
        serverURL = e.target.value;
        console.log(serverURL)
    }

    toggleServer(){
        this.setState({collapse: !this.state.collapse})
    }

    resetServer(){
        serverURL = 'http://' + location.host;
        document.getElementById("newServer").value = serverURL;
        console.log(serverURL)
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
                            <InputGroupAddon addonType={"append"}><Button onClick={this.resetServer}>Reset Default</Button></InputGroupAddon>
                        </InputGroup>
                        <CardText>
                            <small className="text-muted">The server updates automatically as you type. If you wish to restore the default, hit Reset Default.</small>
                        </CardText>
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



