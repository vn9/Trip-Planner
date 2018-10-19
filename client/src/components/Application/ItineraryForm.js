import {Button, Collapse} from 'reactstrap';
import React, {Component} from 'react'
import DropDown from './DropDown'
import {serverURL} from "./SetServer";

class ItineraryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
        };

        this.toggle = this.toggle.bind(this);
        this.reverseTable = this.reverseTable.bind(this);
    }

    getDistanceName(){
        let units = this.props.trip.options.units;
        if(units === "user defined") {
            units = this.props.trip.options.unitName;
        }
        return units;
    }

    isTrip() {
        return this.props.trip.places.length !== 0;
    }

    toggle() {
        this.setState({collapse: !this.state.collapse})
    }

    distancesQ(){
        return this.props.trip.distances.length !== 0;
    }

    removeFunc(e,i){
        this.props.trip.places.splice(i,1); //remove place at i
        this.props.trip.distances = []; //clears out array since it's wrong after the deletion
        this.props.updateTrip(this.props.trip);
        this.props.planTrip();
    }

    begFunc(e,i) {
        let newStart = this.props.trip.places.splice(i);
        this.props.trip.places = newStart.concat(this.props.trip.places);

        if (this.distancesQ()) {
            newStart = this.props.trip.distances.splice(i);
            this.props.trip.distances = newStart.concat(this.props.trip.distances);
        }
        this.props.updateTrip(this.props.trip);
    }

    tripTitle(){
        let name = "Untitled Trip";
        if(this.props.trip.title !== null) {
            name = this.props.trip.title;
        }
        return name;
    }

    tableRow() {
        let funcNames = ["Remove", "New Start"];
        let funcs = [this.removeFunc.bind(this), this.begFunc.bind(this)];
        let destinations = this.props.trip.places.map(
            (item, index) => <DropDown //Dropdown was found on a stackOverflow post. This is me giving credit to it
                key={'place_' + item.id}
                value ={index}
                text = {item.name}
                funcNames = {funcNames}
                funcs={funcs} />
        );
        if(destinations.length === 0){
            return <tr><td>Create Your Trip to See This Function!</td></tr>
        }
        return(
            <tr className = "table-info table-light">
                <th className= "align-middle" >Destination</th>
                {destinations}
                <td key="dest_end">
                    {"Back to " + this.props.trip.places[0].name}
                </td>
            </tr>
        )
    }

    placesRow(){
        let distances = this.props.trip.distances.map(
            (item, index) => <td key={'dist_' + index}>{item}</td>
        );
        if(distances.length === 0){
            return <tr><td>Click Plan Trip</td></tr>
        }
        let units = this.getDistanceName();
        return(
            <tr>
                <th className="table-info align-middle table-light">{units}</th>
                <td key ="dist_end">0</td>
                {distances}
            </tr>
        );
    }

    totalDistanceRow(){
        let total = 0;
        let allDist = [0];
        for (let i = 0; i < this.props.trip.distances.length; i++){
            total += this.props.trip.distances[i];
            allDist.push(total);
        }
        let distances = allDist.map(
            (item, index) => <td key={'cum_dist_' + index}>{item}</td>
        );
        if (distances.length === 1) {
            return <tr><td>Click Plan Trip</td></tr>
        }
        let units = this.getDistanceName();
        return(
            <tr>
                <th className="table-info align-middle table-light"> Total {units}</th>
                {distances}
            </tr>
        );
    }

    renderDistance() {
        let placesRow = this.placesRow();
        let totalDistanceRow = this.totalDistanceRow();
        if(this.distancesQ()){
        return(
            <tbody >
            {placesRow}
            {totalDistanceRow}
            </tbody>)
        }
    }

    reverseTable(){
      let places = this.props.trip.places;
      let arr = [places.length];
      for(let i = 0; i < places.length; i++){
        arr[i] = places[i]
      }
      arr.reverse();
      this.props.updateTrip("places",arr);
      this.props.planTrip();
    }

    render() {
        if(this.isTrip()) {
            return(
                <div id="itinerary">
                    <Button onClick={this.toggle} className='btn-dark' block>
                      Itinerary</Button>
                    <Collapse isOpen={this.state.collapse}>
                      <h4 align="Center">{this.tripTitle()}</h4>
                      <table className="table table-responsive table-bordered"
                             id={"tripItinerary"}>
                        <thead className="thead-light">
                          {this.tableRow()}
                          </thead>
                            {this.renderDistance()}
                            </table>
                        <div align="center">
                        <Button id="reverse-button" onClick={this.reverseTable}>
                          Reverse
                        </Button>
                        </div>
                    </Collapse>
                </div>
            )
        }
        else{
            return(
                <div id="itinerary" >
                    <Button onClick={this.toggle} className='btn-dark' block>
                      Itinerary
                    </Button>
                    <Collapse isOpen={this.state.collapse}>
                    <h4 align="center">No trip created yet</h4>
                    </Collapse>
                </div>
            )
        }
    }
}
export default ItineraryForm;
