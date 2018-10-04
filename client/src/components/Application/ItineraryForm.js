import {Button, Card, CardBody, Form, Table, Collapse} from 'reactstrap';
import React, {Component} from 'react'


class ItineraryForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
        };

        this.tableGenerator = this.tableGenerator.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    tableGenerator(){

        let table = [];
        let children = [];

        if(this.props.trip.places.length === 0){ // no place inside the table
            children.push(<th key='origin'>{"Origin"}</th>);
            children.push(<th key='destination'>{"Destination"}</th>);
            children.push(<th key='distance'>{"Distance"}</th>);
            table.push(<tr key='header'>{children}</tr>);
            return table;
        }
        else {
            children.push(<th key='origin'>{"Origin"}</th>);
            children.push(<th key='destination'>{"Destination"}</th>);
            children.push(<th key='distance'>{"Distance"}</th>);
            table.push(<tr key='first row'>{children}</tr>);

            let cell = [];

            for (let i = 0; i < this.props.trip.places.length - 1; i++) {
                cell = [];
                cell.push(<th key={'origin' + i}>{this.props.trip.places[i].name}</th>);
                cell.push(<th key={'destination' + i}>{this.props.trip.places[i + 1].name}</th>);
                if (this.props.trip.distances.length === 0) {
                    cell.push(<th key={'distance' + i}>{'0'}</th>);
                }
                else {
                    cell.push(<th key={'distance' + i}>{this.props.trip.distances[i]}</th>);
                }
                table.push(<tr key={'row' + i}>{cell}</tr>)
            }

            cell=[];
            cell.push(<th key="origin last" >{this.props.trip.places[this.props.trip.places.length - 1].name}</th>);
            cell.push(<th key="destination last">{this.props.trip.places[0].name}</th>);

            if (this.props.trip.distances.length === 0) {
                cell.push(<th key={'distance last'}>{'0'}</th>);
            }
            else {
                cell.push(<th key="distance last">{this.props.trip.distances[this.props.trip.places.length - 1]}</th>);
            }
            table.push(<tr key={'last row'}>{cell}</tr>);
            return table;
        }
    }

    toggle(){
        this.setState({collapse: !this.state.collapse})
    }

    render() {
        return (
            <div>
            <Button onClick={this.toggle} className='btn-dark' block>Itinerary</Button>
                <Collapse isOpen={this.state.collapse}>
            <Card>
                <CardBody>
                        <Table>
                            <tbody className="Body">
                                {this.tableGenerator()}
                            </tbody>
                        </Table>
                </CardBody>
            </Card>
                </Collapse>
            </div>
        );
    }

}
export default ItineraryForm;
