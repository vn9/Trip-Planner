import React, {Component} from 'react'
import {Form, Label, Input} from 'reactstrap';

class Attributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showName: true,
            showId: true,
            showLatitudeLongitude: true,
            showLegDistance: true,
            showTotalDistance: true
        };

        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <Form>
                <div>
                    <Input
                        name = "showId"
                        type = "checkbox"
                        checked = {this.state.showId}
                        onChange={this.handleCheckChange}/>
                    <Label>
                        Show ID
                    </Label>
                </div>
                <br />
                <div>
                    <Input
                        name = "showName"
                        type = "checkbox"
                        checked = {this.state.showName}
                        onChange={this.handleCheckChange}/>
                    <Label>
                        Show Name
                    </Label>
                </div>
                <br />
                <div>
                    <Input
                        name = "showLatitudeLongitude"
                        type = "checkbox"
                        checked = {this.state.showLatitudeLongitude}
                        onChange={this.handleCheckChange}/>
                    <Label>
                        Show Latitude/Longitude:
                    </Label>
                </div>
                <br />
                <div>
                    <Input
                        name = "showLegDistance"
                        type = "checkbox"
                        checked = {this.state.showLegDistance}
                        onChange={this.handleCheckChange}/>
                    <Label>
                        Show Leg Distance
                    </Label>
                </div>
                <br />
                <div>
                    <Input
                        name = "showTotalDistance"
                        type = "checkbox"
                        checked = {this.state.showTotalDistance}
                        onChange={this.handleCheckChange}/>
                    <Label>
                        Show Total Distance
                    </Label>
                </div>
            </Form>
        );
    }
}
export default Attributes;