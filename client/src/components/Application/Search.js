import React, {Component} from 'react'
import {Button, Input,Card, Collapse, CardBody, InputGroup,InputGroupAddon, InputGroupText} from 'reactstrap'

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
                limit: 0,
                found: 0,
                places: []
            },

        };
        this.matchChange = this.matchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.showPlaces = this.showPlaces.bind(this);
        this.addAll = this.addAll.bind(this);
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
        //remove it from search result list
        let myIndex = -1;
        for (var i=0; i<this.state.search.places.length ;i++) {
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

