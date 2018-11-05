import {Button, Table, Collapse} from 'reactstrap';
import React, {Component} from 'react'

class ItineraryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
        };
        this.begFunc = this.begFunc.bind(this);
        this.removeFunc = this.removeFunc.bind(this);
        this.tableHeader = this.tableHeader.bind(this);
        this.tableGenerator = this.tableGenerator.bind(this);
        this.reverseTable = this.reverseTable.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    getDistanceName(){
        let units = this.props.trip.options.units;
        if(units === "user defined") {
            units = this.props.trip.options.unitName;
        }
        return units.charAt(0).toUpperCase() + units.slice(1);
    }

    tripTitle(){
        let name = "Untitled Trip";
        if(this.props.trip.title !== null) {
            name = this.props.trip.title;
        }
        return name;
    }

    begFunc(e,i) {
        let newStart = this.props.trip.places.splice(i);
        this.props.trip.places = newStart.concat(this.props.trip.places);

        if (this.props.trip.distances.length !== 0) {
            newStart = this.props.trip.distances.splice(i);
            this.props.trip.distances = newStart.concat(this.props.trip.distances);
        }
        this.props.updateTrip(this.props.trip);
    }

    removeFunc(e,i){
        this.props.trip.places.splice(i,1); //remove place at i
        this.props.trip.distances = []; //clears out array since it's wrong after the deletion
        this.props.updateTrip(this.props.trip);
        this.props.planTrip();
    }

    action(number){
        // Dropdown function is taking from the bootstrap-dropdown page
        return(
            <div className="dropdown">
                <button className="dropdown-toggle"
                        type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                    {number}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button className="dropdown_item"
                            type="button"
                            onClick={(e) => this.begFunc(e,number-1)}>Start
                    </button>
                    <button className="dropdown_item"
                            type="button"
                            onClick={(e) => this.removeFunc(e,number-1)}>Remove
                    </button>
                </div>
            </div>
        )
    }

    tableHeader(){
        let attributes = this.props.attributes;
        let table = [];
        let item = [];
            item.push(<th key='count'>{"#"}</th>);  //index
        if(attributes.id === true)
            item.push(<th key='id1'>{"ID"}</th>);  //id
        if(attributes.name === true)
            item.push(<th key='origin'>{"Name"}</th>);  //origin
            //item.push(<th key='destination'>{"Destination"}</th>);  //destination
        if(attributes.latitude === true)
            item.push(<th key='latitude='>{"Latitude"}</th>);  //latitude & longitude
        if(attributes.longitude === true)
            item.push(<th key='longitude='>{"Longitude"}</th>);
        if(attributes.showLegDistance === true)
            item.push(<th key='distance'>{"Distance to Next Place " + "(" + this.getDistanceName() + ")"}</th>);  //distance
        if(attributes.showTotalDistance === true)
            item.push(<th key='total'>{"Total Distance " + "("+ this.getDistanceName() + ")"}</th>);  //total distance
            table.push(<tr key='header'>{item}</tr>);
        return table;
    }

    tableGenerator() {
        let wholeTrip = 0;
        let table = this.tableHeader();
        let trip = this.props.trip;
        let totalPlaces = trip.places.length;
        let attributes = this.props.attributes;

        // Add each origin-destination pair to the table
        for (let i = 0; i < totalPlaces; i++) {
            let cell = [];
            let origin = trip.places[i];

            cell.push(<td key={'id' + i}>{this.action(i+1)}</td>);  //index
            if(attributes.id === true)
                cell.push(<td key={'id1' + i}>{origin.id}</td>);  //id
            if(attributes.name === true) {
                cell.push(<td key={'origin' + i}>{origin.name}</td>);  //origin
                //cell.push(<td key={'destination' + i}>{dest.name}</td>);  //destination
            }
            if(attributes.latitude === true)
                cell.push(<td key={'latitude' + i}>{
                    origin.latitude }</td>);  //latitude
            if(attributes.longitude === true)
                cell.push(<td key={'Longitude' + i}>{
                    origin.longitude }</td>);  //longitude
            if (trip.distances.length === 0) {
                if(attributes.showLegDistance === true)
                    cell.push(<td key={'distance' + i}>{' '}</td>);  //distance
                if(attributes.showTotalDistance === true)
                    cell.push(<td key={'totalDistance' + i}>{' '}</td>);  //total distance
                table.push(<tr key={'row' + i}>{cell}</tr>)
            }
            else{
                if(attributes.showLegDistance === true)
                    cell.push(<td key={'distance' + i}>{trip.distances[i]}</td>);  //distance
                if(attributes.showTotalDistance === true) {
                    wholeTrip += trip.distances[i];
                    cell.push(<td key={'totalDistance' + i}>{wholeTrip}</td>);  //total distance
                }
                table.push(<tr key={'row' + i}>{cell}</tr>)
            }
        }
        return table;
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

    toggle() {
        this.setState({collapse: !this.state.collapse})
    }

    render() {
        return(
            <div id="itinerary">
                <Button onClick={this.toggle} className='btn-dark' block>
                    Itinerary</Button>
                <Collapse isOpen={this.state.collapse}>
                    <h4 align="Center">{this.tripTitle()}</h4>
                    <div style={{'height': '300px', 'overflow':'scroll',
                        'display':'block', 'width':'100%'}} align="center">
                        <Table>
                            <tbody>{this.tableGenerator()}</tbody>
                        </Table>
                    </div>
                    <Button id="reverse-button" onClick={this.reverseTable}>
                        Reverse
                    </Button>
                </Collapse>
            </div>
        )
    }
}
export default ItineraryForm;
