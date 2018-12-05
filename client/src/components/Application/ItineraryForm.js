import {Button, Table, Collapse, Label, Input, Form, FormGroup} from 'reactstrap';
import React, {Component} from 'react'

class ItineraryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            myAttributes: [],
            DistanceToNext: true,
            TotalDistance: true,
        };
        for (let attributes of this.props.config.attributes) {
            let check = true;
            this.state.myAttributes[attributes] = check;
        }

        this.begFunc = this.begFunc.bind(this);
        this.removeFunc = this.removeFunc.bind(this);
        this.tableHeader = this.tableHeader.bind(this);
        this.tableGenerator = this.tableGenerator.bind(this);
        this.reverseTable = this.reverseTable.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.getActiveAttributes = this.getActiveAttributes.bind(this);
        this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
        this.handOnChange = this.handOnChange.bind(this);
    }

    getDistanceName(){
        let units = this.props.trip.options.units;
        if(units === "user defined") {
            if(!(this.props.trip.options.unitName))
                return units;
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

    onCheck(e) {
        let checked = e.target.checked;
        let attr = e.target.name;
        this.state.myAttributes[attr] = checked;
        this.setState({'attributes': this.getActiveAttributes()});
    }

    getActiveAttributes () {
        let attrs = [];
        for (let attribute in this.state.myAttributes) {
            if (this.state.myAttributes[attribute] === true){
                attrs.push(attribute);
            }
        }
        this.state.attributes = attrs;
    }
    handOnChange(e){
        let name = e.target.value;
        let myState = this.state;
        myState[name] = e.target.checked;
        this.setState(myState);
    }

    makeCheckBoxes(){
        let items =
            <div>{this.props.config.attributes.map((attribute) =>
            <FormGroup check inline key={attribute}>
                <Label check>
                    <Input name={attribute} type = "checkbox" value={'!this.state.' + attribute}
                           defaultChecked={true} onChange={this.onCheck}/>
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                </Label>
            </FormGroup>
            )}
            <FormGroup check inline>
                <Label check>
                    <Input name={"showLegDist"} type={"checkbox"} value={'DistanceToNext'}
                           onChange={this.handOnChange} defaultChecked={true}>
                    </Input>{'Leg Distance'}</Label>
            </FormGroup>
            <FormGroup check inline>
                <Label check>
                    <Input name={"showTDist"} type={"checkbox"} value={'TotalDistance'}
                           onChange={this.handOnChange} defaultChecked={true}>
                    </Input>{'Total Distance'}
                </Label>
            </FormGroup>
            </div>;
        return(items);
    }

    tableHeader(){
        this.getActiveAttributes();
        let attributes = this.state.attributes;
        let table = [];
        let item = [];

        item.push(<th key={'count'}>{"#"}</th>);  //index

        for (let i = 0; i < attributes.length; i++ ){
            let attr = attributes[i];
            item.push(<th key={attr}>{attr.charAt(0).toUpperCase() + attr.slice(1)}</th>);
        }
        if(this.state.DistanceToNext === true)
            item.push(<th key='distance'>{"Distance to Next Place " + "(" + this.getDistanceName() + ")"}</th>);  //distance
        if(this.state.TotalDistance === true)
            item.push(<th key={'total'}>{"Total Distance " + "("+ this.getDistanceName() + ")"}</th>);  //total distance
        table.push(<tr className={"header"} key={'header'}>{item}</tr>);

        return table;
    }

    tableGenerator() {
        let wholeTrip = 0;
        let table = this.tableHeader();
        let trip = this.props.trip;
        let attributes = this.state.attributes;
        for (let i = 0; i < trip.places.length; i++) {
            let cell = [];
            let place = trip.places[i];
            cell.push(<td key={'index' + i}>{this.action(i+1)}</td>);  //index
            this.addAttr(attributes,place,i,cell); // generate attributes
            if(this.state.DistanceToNext === true) { //distance between two places
                cell.push(<td key={'distance' + i}>{trip.distances[i]}</td>);
            }
            wholeTrip += trip.distances[i];
            if(this.state.TotalDistance === true) { // total trip's distances
                this.addTotalDis(trip, cell, i, wholeTrip);
            }
            table.push(<tr className={place.name} key={'row' + i}>{cell}</tr>)
        }
        return table;
    }

    addAttr(attributes,place,index,cell){
        for (let j=0; j< attributes.length; j++){
            let attr = attributes[j];
            cell.push(<td key={attr + index}>{place[attr]}</td>)
        }
        return cell;
    }

    addTotalDis(trip,cell,index,wholeTrip){
        if (trip.distances.length === 0)
            cell.push(<td key={'totalDistance' + index}>{' '}</td>);  //total distance
        else
            cell.push(<td key={'totalDistance' + index}>{wholeTrip}</td>);  //total distance
        return cell;
    }

    render() {
        return(
            <div id="itinerary"><br/>
                    <h4 align="Center">{this.tripTitle()}</h4>
                    <div style={{'height': '300px', 'overflow':'scroll',
                        'display':'block', 'width':'100%'}} align="center">
                        <Table>
                            <tbody>{this.tableGenerator()}</tbody>
                        </Table>
                    </div>
                    <Form>{this.makeCheckBoxes()}
                    </Form>
                    <Button id="reverse-button" onClick={this.reverseTable}>Reverse</Button>
            </div>
        )
    }
}
export default ItineraryForm;
