import {Button, Card, CardBody, Form, Table, Collapse} from 'reactstrap';
import React, {Component} from 'react'


class ItineraryForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
        };
        this.tableHeader = this.tableHeader.bind(this);
        this.tableGenerator = this.tableGenerator.bind(this);
        this.toggle = this.toggle.bind(this);
    }

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

    tableGenerator(){

        var wholeTrip = 0;
        let table = [];

        if(this.props.trip.places.length === 0){ // no place inside the table
            table = this.tableHeader();
        }
        else {
            table = this.tableHeader();
            let cell = [];
            // Add each origin-destination pair to the table
            for (let i = 0; i < this.props.trip.places.length - 1; i++) {
                cell = [];
                cell.push(<td key={'origin' + i}>{this.props.trip.places[i].name}</td>);
                cell.push(<td key={'destination' + i}>{this.props.trip.places[i + 1].name}</td>);
                if (this.props.trip.distances.length === 0) {
                    cell.push(<td key={'distance' + i}>{'0'}</td>);
                    wholeTrip = 0;
                    cell.push(<td key={'totalDistance' + i}>{wholeTrip}</td>);
                }
                else {
                    cell.push(<td key={'distance' + i}>{this.props.trip.distances[i]}</td>);
                    wholeTrip += this.props.trip.distances[i];
                    cell.push(<td key={'totalDistance' + i}>{wholeTrip}</td>);
                }
                table.push(<tr key={'row' + i}>{cell}</tr>)
            }
            // Add the last pair to the table to make a round trip
            cell=[];
            cell.push(<td key="origin last" >{this.props.trip.places[this.props.trip.places.length - 1].name}</td>);
            cell.push(<td key="destination last">{this.props.trip.places[0].name}</td>);

            if (this.props.trip.distances.length === 0) {
                cell.push(<td key={'distance last'}>{'0'}</td>);
                cell.push(<td key={'TotalDistance last'}>{'0'}</td>);
            }
            else {
                cell.push(<td key="distance last">{this.props.trip.distances[this.props.trip.places.length - 1]}</td>)
                wholeTrip += this.props.trip.distances[this.props.trip.places.length - 1];
                cell.push(<td key={'TotalDistance last'}>{wholeTrip}</td>);
            }
            table.push(<tr key={'last row'}>{cell}</tr>);
            return table;
        }
    }

    toggle(){this.setState({collapse: !this.state.collapse})}

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
    }
}
export default ItineraryForm;
