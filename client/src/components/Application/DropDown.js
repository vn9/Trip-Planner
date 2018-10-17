import React, {Component} from 'react';



class DropDown extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let dropdownItems = this.props.funcs.map((func,i) =>{
            let name = this.props.funcNames[i];
            return <a key={name+i.toString()}
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                      e.preventDefault();
                      func(e, this.props.value)
                      }}>
                      {name}
                      </a>
        });
        return(
            <td value={this.props.value}>
                <div className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded = "false">
                    {this.props.text}
                </div>
                <div className="dropdown-menu">
                    {dropdownItems}
                </div>
            </td>
             )
    }
}
export default DropDown;