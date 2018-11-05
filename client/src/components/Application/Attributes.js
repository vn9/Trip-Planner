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
        let items = this.props.config.attributes.map((attribute) =>
        <div key={attribute}>
            <Label check>
                <Input name={attribute} type = "checkbox" value={'!this.state.' + attribute}
                       defaultChecked={true} onChange={this.handleCheckChange}/>
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}</Label>
        </div>);

        return(
            <Form>
                <div>
                    {items}
                </div>
            </Form>
        );
    }
}
export default Attributes;