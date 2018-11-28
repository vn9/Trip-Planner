import React, {Component} from 'react'
import {CardBody, Input, Form, Button} from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the
 * Trip object. Allows the user to set the options used by the application via
 * a set of buttons.
 */

class Options extends Component{
  constructor(props) {
    super(props);
    this.state = {userDefinedOn:false};

    this._userDefinedOn = this._userDefinedOn.bind(this);
  }

  _userDefinedOn(event){
      this.props.updateOptions('units', event.target.value);
      this.setState({userDefinedOn: false});
      if(event.target.value === 'user defined'){
        this.setState({userDefinedOn : !this.state.userDefinedOn});
      }
  }

  render() {
    let buttons = this.props.config.units.map((unit) =>
      <Button id={unit} key={unit} className='btn-outline-dark unit-button'
        active={this.props.options.units === unit}
              value={unit} onClick={this._userDefinedOn}
        block>
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );

    return(
        <CardBody>
            <h5 align="Center">Select Your Units</h5>
            {buttons}<br/>
            {this.state.userDefinedOn && (
                <Form>
                  <Input id={"uName"} placeholder="Unit Name ex. Miles"
                         onChange={(event) =>
                             this.props.updateOptions('unitName',
                                 event.target.value)}/><br/>
                  <Input id={"uRadius"} placeholder="Earth Radius ex. 3959"
                         onChange={(event) =>
                             this.props.updateOptions('unitRadius',
                                 event.target.value)}/>
                </Form>)
            }
        </CardBody>
    );
  }
}

export default Options;
