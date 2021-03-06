import React, {Component} from 'react'
import {Button} from 'reactstrap'

export default class MapType extends Component{
    constructor(props) {
        super(props);
        this.changeOpt = this.changeOpt.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
    }

    changeOpt(event){
        this.props.updateOptions('map', event.target.value);
    }

    getButtonText(value){
        let text = "Static";
        if (value === "kml"){
            text = "Dynamic";
        }
        return(text)
    }

    render() {
        let buttons = this.props.config.maps.map((opt) =>
            <Button id={opt} key={'map_' + opt} className='btn-outline-dark'
                    active={this.props.options.map === opt} value={opt}
                    onClick={(event)=>this.changeOpt(event)}
                    block>{this.getButtonText(opt)}
            </Button>
        );

        return(
                <div>
                    <br/>
                    <h5 align="Center">Select Your Map Type</h5>
                    {buttons}
                </div>
        );
    }
}