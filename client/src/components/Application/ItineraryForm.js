import {Button, Card, CardBody, Table, Collapse} from 'reactstrap';
import React, {Component} from 'react'


class ItineraryForm extends Component {

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
    }
}
export default ItineraryForm;
