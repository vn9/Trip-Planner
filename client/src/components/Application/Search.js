import React, {Component} from 'react'
import {Button, Input, Row, Col, Card, Collapse, CardBody, InputGroup,InputGroupAddon} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api';
import {Place} from './UploadFile';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            search: {
                version: 3,
                type: "search",
                match: "",
                limit: 0,
                places: []
            },

        };
        this.matchChange = this.matchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.showPlaces = this.showPlaces.bind(this);
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    updateSearch(response) {
        this.setState({'search': response});
    }

    matchChange(query) {
        let mySearch = this.state.search;
        mySearch['match'] =  query;
        this.setState(mySearch);
    }

    onSearch() {
        console.log(JSON.stringify(this.state.search));
        request(this.state.search, 'search', serverURL).then(
            (response) => {
                console.log(response);
                this.updateSearch(response);
            })
    }

    addPlace(event) {
        let myplace = event.target.value;
        let jplace = JSON.parse(myplace);
        let myPlaces = this.props.trip.places;
        let newPlace = new Place(jplace.id, jplace.name, jplace.latitude, jplace.longitude);
        myPlaces.push(newPlace);
        this.props.updateTrip('places', myPlaces);
    }

    showPlaces(){
        let destinations = this.state.search.places.map((place, index)=>
            <Row key={index}>
                <Col md={9}>
                    <Input readOnly value={place.name}/>
                </Col>
                <Col md={2}>
                    <Button id={place.id} value={JSON.stringify(place)} onClick={this.addPlace} block>Add</Button>
                </Col>
            </Row>
        );

        return(destinations)
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} className='btn-dark' block>Create Trip: Search For Places</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <h4 align="Center">Search for Places by Name</h4>
                            <InputGroup>
                                <Input placeholder="ex. Aspen" onChange={(event) => this.matchChange(event.target.value)}/>
                                <InputGroupAddon addonType="append"><Button className="btn-dark"
                                                                            onClick={this.onSearch}>Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                            <br/>
                            <div style={{'height': '150px', 'overflow': 'scroll', 'display': 'block', 'width': '100%'}}>
                                {this.showPlaces()}
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

}

