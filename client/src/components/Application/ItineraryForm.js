import {Button, Card, CardBody, Table, Collapse} from 'reactstrap';
import React, {Component} from 'react'
import DropDown from './DropDown'

class ItineraryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
        };
        //this.tableHeader = this.tableHeader.bind(this);
        //this.tableGenerator = this.tableGenerator.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    getDistanceName(){
        let units = this.props.trip.options.units;
        if(units === "user defined") {
            units = this.props.trip.options.units;
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
    }
    begFunc(e,i){
        let newStart = this.props.trip.places.splice(i);
        this.props.trip.places = newStart.concat(this.props.trip.places);

        if (this.distancesQ()) {
            newStart = this.props.trip.distances.splice(i);
            this.props.trip.distances = newStart.concat(this.props.trip.distances);
        }
        this.props.updateTrip(this.props.trip);
    }

    tripTitle(){
        let name = "Untitled Trip"
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
            <tr className = "table-info">
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
                <th className="table-info align-middle">{units}</th>
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
                <th className="table-info align-middle "> Total {units}</th>
                {distances}
            </tr>
        );
    }

    renderDistance() {


        let placesRow = this.placesRow();
        let totalDistanceRow = this.totalDistanceRow();
        if(this.distancesQ()){
        return(
            <tbody>
            {placesRow}
            {totalDistanceRow}
            </tbody>)
        } else {
            <tbody><tr><td> Click Plan Trip </td></tr></tbody>
        }
    }



    render() {

        if(this.isTrip()){
            return(
                <div id="itinerary">
                    <Button onClick={this.toggle} className='btn-dark' block>Itinerary</Button>
                    <Collapse isOpen={this.state.collapse}>
                    <h4>
                        {this.tripTitle()}
                    </h4>
                    <table className="table table-responsive table-bordered">
                    <thead>
                        {this.tableRow()}
                    </thead>
                        {this.renderDistance()}
                    </table>
                    </Collapse>
                </div>
            )
        }
        else{
            return(

                <div id="itinerary">
                    <Button onClick={this.toggle} className='btn-dark' block>Itinerary</Button>
                    <Collapse isOpen={this.state.collapse}>
                    <h4>No trip created yet</h4>
                    </Collapse>
                </div>
            )
        }

    }

/*
    tableHeader(){
      let table = [];
      let children = [];
      children.push(<th key='origin'>{"Origin"}</th>);
      children.push(<th key='destination'>{"Destination"}</th>);
      children.push(<th key='distance'>{"Distance"}</th>);
      children.push(<th key='totalDistance'>{"Total Distance"}</th>);
      table.push(<tr key='header'>{children}</tr>);
      return table;
    }

    tableGenerator() {

        var wholeTrip = 0;
        let table = this.tableHeader();
        let trip = this.props.trip;
        let totalPlaces = trip.places.length;

        // if distances haven't been calculated yet, show only table header
        if (trip.distances.length !== totalPlaces) {
            return table;
        }
        // Add each origin-destination pair to the table
        for (let i = 0; i < totalPlaces; i++) {
            let cell = [];
            let origin = trip.places[i];
            let dest = trip.places[(i + 1) % totalPlaces];

            cell.push(<td key={'origin' + i}>{origin.name}</td>);
            cell.push(<td key={'destination' + i}>{dest.name}</td>);
            cell.push(<td key={'distance' + i}>{trip.distances[i]}</td>);
            wholeTrip += trip.distances[i];
            cell.push(<td key={'totalDistance' + i}>{wholeTrip}</td>);
            table.push(<tr key={'row' + i}>{cell}</tr>)
        }
        return table;
    }

    toggle() {
        this.setState({collapse: !this.state.collapse})
    }

    render() {
        return (
            <div>
            <Button onClick={this.toggle} className='btn-dark' block>Itinerary</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <div style={{'height': '300px',
                                'overflow':'scroll', 'display':'block', 'width':'100%'}} align="center">
                                <Table>
                                    <tbody>
                                        {this.tableGenerator()}
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }*/
}
export default ItineraryForm;
