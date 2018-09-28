import React, {Component} from 'react'
import { Card, CardHeader, CardBody, Label, Input, FormGroup, Form} from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */



class Options extends Component{
  constructor(props) {
    super(props);
    this.state = {userDefinedOn:false};
    this._userDefinedOn = this._userDefinedOn.bind(this);
  }



  _userDefinedOn(event){
      this.props.updateOptions('unit', event.target.value);

        if(event.target.value == 'user defined'){
            this.setState({userDefinedOn : true});
        }
        else {
            this.setState({userDefinedOn : false});
        }
  }



  render() {
    const buttons = this.props.config.units.map((unit) =>
      <Button
        key={'distance_button_' + unit}
        className='btn-outline-dark unit-button'
        active={this.props.options.unit === unit}
        value={unit}
        onClick={this._userDefinedOn}
      >
        {unit.charAt(0).toUpperCase() + unit.slice(1)}
      </Button>
    );


    return(
      <Card>
        <CardBody>
          <p>Select the options you wish to use</p>
            <ButtonGroup>
            {buttons}
            </ButtonGroup>
            {this.state.userDefinedOn && (<Form>
                <FormGroup>
                    <Label>Unit Name:</Label>
                    <Input
                        type="text"
                        originLatitude="text"
                        placeholder="ex. Mile"
                        value={this.state.unitName}
                        onChange={e => this.setState({unitName: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Earth Radius (in specified unit):</Label>
                    <Input
                        type="text"
                        originLongitude="text"
                        placeholder="ex. 3959"
                        value={this.state.unitRadius}
                        onChange={e => this.setState({unitRadius: e.target.value})}
                    />
                </FormGroup>
            </Form>)}
        </CardBody>
      </Card>

    );
  }
}

export default Options;
