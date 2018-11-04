import React, {Component} from 'react'
import {Button, Input,Card, Collapse, CardBody, InputGroup,InputGroupAddon, InputGroupText, Label, Col, Row} from 'reactstrap'

import {serverURL} from  './SetServer'

import {request} from '../../api/api';
import {Place} from './UploadFile';


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            search: {
                version: 4,
                type: "search",
                match: "",
                filters: [],
                limit: 0,
                found: 0,
                places: []
            },
        };

        for (let filter of this.props.config.filters) {
            let values = {};
            for (let valueName of filter.values) {
                values[valueName] = false;
            }
            this.state.search.filters[filter.name] = {'values': values};
        }

        this.bindFunctions = this.bindFunctions.bind(this);
    }

    bindFunctions(){
        this.matchChange = this.matchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.showPlaces = this.showPlaces.bind(this);
        this.addAll = this.addAll.bind(this);
        this.makeFilters = this.makeFilters.bind(this);
        this.onCheck = this.onCheck.bind(this);
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

    getActiveFilterValues () {
        // modify search.filters so that it matches what the server expects
        //   search.filters = [
        //     name: <filter name>, values: [<name of selected values>, ...]
        let filters = [];
        for (let filterName in this.state.search.filters) {
            let filter = this.state.search.filters[filterName];
            let values = [];
            for (let valueName in filter.values) {
                if (filter.values[valueName]) {
                    values.push(valueName);
                }
            }
            filters.push({'name': filterName, 'values': values});
        }
        return filters;
    }

    onSearch() {
        let search = this.state.search;
        search.filters = this.getActiveFilterValues();
        console.log(JSON.stringify(search));

        request(search, 'search', serverURL).then(
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
        //remove it from search result list
        let myIndex = -1;
        for (let i = 0; i < this.state.search.places.length; i++) {
           if(this.state.search.places[i].id === newPlace.id){
               myIndex = i;
               break;
           }
        }
        let newSearch = this.state.search;
        newSearch['places'] =
                this.state.search.places.slice(0, myIndex).
            concat(this.state.search.places.slice(myIndex+1));
        this.setState({'search': newSearch });
    }

    addAll(){
        let newPlaces = this.state.search.places;
        console.log(newPlaces);
        let myPlaces= this.props.trip.places;
        for (let i = 0; i < newPlaces.length; i++){
            let aPlace = newPlaces[i];
            let newPlace = new Place(aPlace.id, aPlace.name, aPlace.latitude, aPlace.longitude);
            myPlaces.push(newPlace);
        this.props.updateTrip('places', myPlaces)
        }
        let newSearch = this.state.search;
        newSearch['places'] = [];
        this.setState({'search': newSearch });
    }

    showPlaces(){
        let destinations = this.state.search.places.map((place, index)=>
            <InputGroup key={index}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{(index + 1)}</InputGroupText>
                </InputGroupAddon>
                <Input readOnly value={place.name}/>
                <InputGroupAddon addonType="append">
                    <Button id={place.id} value={JSON.stringify(place)} onClick={this.addPlace} block>Add</Button>
                </InputGroupAddon>
            </InputGroup>
        );
        return(destinations)
    }

    onCheck(e) {
        let filterName = e.target.value;
        let checked = e.target.checked;
        let valueName = e.target.name;
        this.state.search.filters[filterName].values[valueName] = checked;
    }

    makeFilters(){
        let myFilters = this.props.config.filters.map((filter) =>
            <Col key={filter.name}>
                {filter.values.map((myValue)=>
                    <div key={myValue}>
                    <Label check>
                        <Input name={myValue} type="checkbox" value={filter.name} onChange={this.onCheck}/>
                        {myValue.charAt(0).toUpperCase() + myValue.slice(1)}
                    </Label>
                    </div>
                )}
            </Col>);
        return(myFilters)
    }

    render() {
        this.bindFunctions();

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
                            <CardBody>
                                <Row>
                                {this.makeFilters()}
                                </Row>
                            </CardBody>
                            <br/>
                            <div style={{'height': '150px', 'overflow': 'scroll', 'display': 'block', 'width': '100%'}}>
                                {this.showPlaces()}
                            </div>
                            <p align="Center">{this.state.search.found} Places Found</p>
                            <br/>
                            <Button onClick={this.addAll}>Add All</Button>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

}

