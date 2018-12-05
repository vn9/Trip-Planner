import React, {Component} from 'react'
import { Button, Input, InputGroup, InputGroupAddon} from 'reactstrap'

//Sets the default server to some local host
export var serverURL =  'http://' + location.host;

class SetServer extends Component {
    constructor(props) {
        super(props);
        this.state ={
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
            <div><br/>
                <h5 align="Center">Choose A Server</h5>
                <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>URL</InputGroupAddon>
                    <Input id="newServer" defaultValue={serverURL}
                           onChange={(e)=> this.serverChange(e)}/>
                    <InputGroupAddon addonType={"append"}><Button
                        onClick={this.onClick}>Set Server</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}

export default SetServer;




