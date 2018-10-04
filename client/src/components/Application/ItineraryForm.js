import { Card, CardBody, Form, Table } from 'reactstrap';
import React, {Component} from 'react'


class ItineraryForm extends Component{


    constructor(props) {
        super(props);
        this.tableGenerator = this.tableGenerator.bind(this);
    }

    tableGenerator(){

        var wholeTrip = 0;
        let table = [];
        let children = [];

        if(this.props.trip.places.length === 0){ // no place inside the table
            children.push(<th key='origin'>{"Origin"}</th>);
            children.push(<th key='destination'>{"Destination"}</th>);
            children.push(<th key='distance'>{"Distance"}</th>);
            children.push(<th key='totalDistance'>{"Total Distance"}</th>);
            table.push(<tr key='header'>{children}</tr>);
            return table;
        }
        else {
            children.push(<th key='origin'>{"Origin"}</th>);
            children.push(<th key='destination'>{"Destination"}</th>);
            children.push(<th key='distance'>{"Distance"}</th>);
            children.push(<th key='totalDistance'>{"Total Distance"}</th>);
            table.push(<tr key='first row'>{children}</tr>);

            let cell = [];

            for (let i = 0; i < this.props.trip.places.length - 1; i++) {
                cell = [];
                cell.push(<th key={'origin' + i}>{this.props.trip.places[i].name}</th>);
                cell.push(<th key={'destination' + i}>{this.props.trip.places[i + 1].name}</th>);
                if (this.props.trip.distances.length === 0) {
                    cell.push(<th key={'distance' + i}>{'0'}</th>);
                    wholeTrip = 0;
                    cell.push(<th key={'totalDistance' + i}>{wholeTrip}</th>);
                }
                else {
                    cell.push(<th key={'distance' + i}>{this.props.trip.distances[i]}</th>);
                    wholeTrip += this.props.trip.distances[i];
                    cell.push(<th key={'totalDistance' + i}>{wholeTrip}</th>);

                }
                table.push(<tr key={'row' + i}>{cell}</tr>)
            }

            cell=[];
            cell.push(<th key="origin last" >{this.props.trip.places[this.props.trip.places.length - 1].name}</th>);
            cell.push(<th key="destination last">{this.props.trip.places[0].name}</th>);

            if (this.props.trip.distances.length === 0) {
                cell.push(<th key={'distance last'}>{'0'}</th>);
                cell.push(<th key={'TotalDistance last'}>{'0'}</th>);
            }
            else {
                cell.push(<th key="distance last">{this.props.trip.distances[this.props.trip.places.length - 1]}</th>)
                wholeTrip += this.props.trip.distances[this.props.trip.places.length - 1];
                cell.push(<th key={'TotalDistance last'}>{wholeTrip}</th>);
            }
            table.push(<tr key={'last row'}>{cell}</tr>);
            return table;
        }
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Form >
                        <Table>
                            <tbody className="Body">
                                {this.tableGenerator()}
                            </tbody>
                        </Table>
                    </Form>
                </CardBody>
            </Card>);
    }

}
export default ItineraryForm;
