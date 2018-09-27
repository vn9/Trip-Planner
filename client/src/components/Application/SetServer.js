import React, {Component} from 'react'
import { ButtonGroup, Button, Form, Label, Input } from 'reactstrap'

class SetServer extends Component{
    constructor(props) {
        super(props);
        this.state= {
            serverAddress: '',       //Adds a state called serverAddress
        }
    }

    handleOnChange(event){          //When the text is updated, the local state is set
        this.setState({serverAddress: event.target.value})

    }

    handleOnClick(){
        this.props.updateServer(this.serverAddress)
    }

    render() {

    return (
        <Form>
            <Input type="text"
                   Address="text"
                   placeholder="http://black-bottle.cs.colostate.edu:31404"
                   value={this.state.serverAddress.value}
                   onChange={this.handleOnChange.bind(this)}/>
            <Button onClick={this.handleOnClick.bind(this)}>Set Server</Button>
        </Form>

    )
    }
}
export default SetServer;

/*If not working, seperate the bind function to above handle events*/


