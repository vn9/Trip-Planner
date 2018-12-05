import {Component} from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import React from "react";

export default class ManualAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            myPlace: {},
        };

        for (let attributes of this.props.config.attributes) {
            let values = {};
            values[attributes] = "";
            this.state.myPlace = values;
        }
        this.updatePlace = this.updatePlace.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.addOwn = this.addOwn.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    updatePlace(field, value){
        let place = this.state.myPlace;
        place[field] = value;
        this.setState(place);
    }

    clearFields(){
        let place = this.state.myPlace;
        for (let attr in place){
            document.getElementById(attr).value = "";
        }
    }

    addPlace(){
        let myPlaces = this.props.trip.places;
        let place = {};
        for (let attributes of this.props.config.attributes){
            place[attributes] = this.state.myPlace[attributes];
        }
        myPlaces.push(place);
        this.props.updateTrip('places', myPlaces);
        this.clearFields();
    }

    addOwn(){
        let place = this.state.myPlace;
        let myAdd = this.props.config.attributes.map((att) =>
            <InputGroup key={att}>
                <InputGroupAddon key={att} addonType="prepend">
                    {att.charAt(0).toUpperCase() + att.slice(1)}
                    </InputGroupAddon>
                <Input id={att} type="text" defaultValue={place[att]}
                       onChange={(e)=>this.updatePlace(att, e.target.value)}/>
            </InputGroup>);
        return(myAdd)
    }

    render() {
        return (
            <div><br/>
                <h5 align="Center"> Add Your Own </h5>
                {this.addOwn()}
                <br/>
                <Button id={"myAdd"} type={"button"} onClick={this.addPlace}>
                    Add Place
                </Button>
            </div>
        )
    }

}