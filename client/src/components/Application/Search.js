import React, {Component} from 'react'
import {Button, Input, Row, Col} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api';
import {Place} from './UploadFile';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                version: 3,
                type: "search",
                match: "",
                limit: 0,
                places: []
            },
            dropdownOpen: false,
        };
        this.matchChange = this.matchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.showPlaces = this.showPlaces.bind(this);
    }

    toggle() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    updateSearch(response) {
        this.setState({'search': response})
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
        let destinations = this.state.search.places.map((place)=>
            <Row>
                <Col md={9}>
                    <Input readOnly value={place.name}/>
                </Col>
                <Col md={2}>
                    <Button id={place.id} key={place.name} value={JSON.stringify(place)} onClick={this.addPlace} block>Add</Button>
                </Col>
            </Row>
        );

        return(destinations)
    }

    render() {

        return(
            <div>
                <h4 align="Center">Search for Places by Name</h4>
                <Row>
                    <Col md={6}>
                        <Input placeholder="eg. Aspen" onChange={(event) => this.matchChange(event.target.value)}/>
                        <Button className="btn-dark" onClick={this.onSearch}>Search</Button>
                    </Col>
                    <Col md={6}>
                        <div style={{'height': '200px', 'overflow':'scroll', 'display':'block', 'width':'100%'}}>
                            {this.showPlaces()}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

