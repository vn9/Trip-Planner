import React, {Component} from 'react'
import {Button} from 'reactstrap'

class Optimization extends Component{
    constructor(props) {
        super(props);
        this.changeOpt = this.changeOpt.bind(this);
    }

    changeOpt(event){
        this.props.updateOptions('optimization', event.target.value);
    }

    render() {
        let buttons = this.props.config.optimization.map((opt) =>
            <Button id={opt.label} key={'opt_button' + opt.label}
                    className='btn-outline-dark unit-button'
                    active={this.props.options.optimization === opt.label}
                    value={opt.label}
                    onClick={(event)=>this.changeOpt(event)}
                    block>{opt.label}
            </Button>
        );

        return(
            <div><br/>
                <h5 align="Center">Select Your Level of Optimization</h5>
                {buttons}
            </div>
        );
    }
}

export default Optimization;
