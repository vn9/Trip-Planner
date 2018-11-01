import React, {Component} from 'react'
import {Form, Label, Input} from 'reactstrap';

class Attributes extends Component {
    constructor(props) {
        super(props);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange(event) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.props.updateAttributes(name,value);
    }

    render(){
        return(
            <Form>
                <div>
                    <Input
                        name = "showId"
                        type = "checkbox"
                        checked = {this.props.attributes.showId}
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
                        checked = {this.props.attributes.showName}
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
                        checked = {this.props.attributes.showLatitudeLongitude}
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
                        checked = {this.props.attributes.showLegDistance}
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
                        checked = {this.props.attributes.showTotalDistance}
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