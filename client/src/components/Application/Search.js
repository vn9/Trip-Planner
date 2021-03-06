import React, {Component} from 'react'
import {Button, Input, CardBody, InputGroup,InputGroupAddon, InputGroupText, Label, Col, Row} from 'reactstrap'
import {serverURL} from  './SetServer'
import {request} from '../../api/api';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                version: 4,
                type: "search",
                match: "",
                filters: [],
                limit: 0,
                found: 0,
                places: []
            },
            myFilters: [],
        };
        for (let filter of this.props.config.filters) {
            let values = {};
            for (let valueName of filter.values) {
                values[valueName] = false;
            }
            this.state.myFilters[filter.name] = {'values': values};
        }

        this.bindFunctions = this.bindFunctions.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }

    bindFunctions(){
        this.matchChange = this.matchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.showPlaces = this.showPlaces.bind(this);
        this.addAll = this.addAll.bind(this);
        this.makeFilters = this.makeFilters.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.getLimit = this.getLimit.bind(this);
        this.limitChange = this.limitChange.bind(this);
    }

    updateSearch(response) {
        this.setState({'search': response});
    }

    matchChange(query) {
        let mySearch = this.state.search;
        mySearch['match'] =  query;
        this.setState(mySearch);
    }

    limitChange(aLimit){
        if(aLimit === ""){
            aLimit = 0;
        }
        let search = this.state.search;
        search['limit'] = aLimit;
        this.setState(search);
    }

    getLimit(){
        let search = this.state.search;
        if( search['limit'] === undefined){
            search['limit'] = 0;
            this.setState(search);
        }else{
            this.setState(search);
        }
    }

    addValues(filtersValues,values){
        for (let valueName in filtersValues) {
            if (filtersValues[valueName]) {
                values.push(valueName);
            }
        }
        return values;
    }

    getActiveFilterValues () {
        // modify search.filters so that it matches what the server expects
        //   search.filters = [
        //     name: <filter name>, values: [<name of selected values>, ...]
        let filters = [];
        for (let filterName in this.state.myFilters) {
            let filter = this.state.myFilters[filterName];
            let values = [];
            this.addValues(filter.values,values);
            // for (let valueName in filter.values) {
            //     if (filter.values[valueName]) {
            //         values.push(valueName);
            //     }
            // }
            if (values.length > 0){
                filters.push({'name': filterName, 'values': values});
            }
        }
        return filters;
    }

    onSearch() {
        this.getLimit();
        let search = Object.assign({}, this.state.search);
        search.filters = this.getActiveFilterValues();

        request(search, 'search', serverURL).then(
            (response) => {
                this.updateSearch(response);
            })
    }

    exits(myPlaces,value){
        for (let i = 0; i < myPlaces.length; i++){
            let p = myPlaces[i];
            if(p.id === value.id)
                return true;
        }
        return false;
    }

    addPlace(event) {
        let myplace = event.target.value;
        let jplace = JSON.parse(myplace);
        let myPlaces = this.props.trip.places;
        if(this.exits(myPlaces,jplace)===false)
            myPlaces.push(jplace);
        this.props.updateTrip('places', myPlaces);
        //remove it from search result list
        let myIndex = -1;
        for (let i = 0; i < this.state.search.places.length; i++) {
           if(this.state.search.places[i].id === jplace.id){
               myIndex = i;
               break;
           }
        }
        let newSearch = this.state.search;
        newSearch['places'] = this.state.search.places.slice(0, myIndex).
        concat(this.state.search.places.slice(myIndex+1));
        this.setState({'search': newSearch });
    }

    addAll(){
        let newPlaces = this.state.search.places;
        let myPlaces= this.props.trip.places;
        for (let i = 0; i < newPlaces.length; i++){
            let aPlace = newPlaces[i];
            if(this.exits(myPlaces,aPlace)===false)
                myPlaces.push(aPlace);
        }
        this.props.updateTrip('places', myPlaces);

        let newSearch = this.state.search;
        newSearch['places'] = [];
        this.setState({'search': newSearch });
    }

    onCheck(e) {
        let filterName = e.target.value;
        let checked = e.target.checked;
        let valueName = e.target.name;
        this.state.myFilters[filterName].values[valueName] = checked;
    }

    makeFilters(){
        let myFilters = this.props.config.filters.map((filter) =>
            <Col key={filter.name}>
                {filter.values.map((myValue)=>
                    <div key={myValue}>
                        <Label check key={myValue}>
                            <Input id={myValue} name={myValue} type="checkbox"
                                   value={filter.name} onChange={this.onCheck}/>
                            {myValue.charAt(0).toUpperCase() + myValue.slice(1)}
                        </Label>
                    </div>
                )}
            </Col>);
        return(myFilters)
    }


    showPlaces(){
        let destinations = this.state.search.places.map((place, index)=>
            <InputGroup key={index}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{(index + 1)}</InputGroupText>
                </InputGroupAddon>
                <Input readOnly className={place.name} value={place.name + ", "
                + place.municipality + ", " + place.country}/>
                <InputGroupAddon addonType="append">
                    <Button id={place.id} value={JSON.stringify(place)}
                            onClick={this.addPlace} block>Add</Button>
                </InputGroupAddon>
            </InputGroup>
        );
        return(destinations)
    }

    myInputs(){
        return(
            <InputGroup>
                <Input className={'match'} id={'match'}
                       placeholder="ex. Aspen" onChange={(event) =>
                    this.matchChange(event.target.value)}/>
                <InputGroupAddon addonType="append">
                    <Button className="btn-dark"
                            onClick={this.onSearch}>Search
                    </Button>
                </InputGroupAddon>
                <Input className={'limit'} type={'number'} id={'Limit'}
                       placeholder="Limit" onChange={(event) =>
                    this.limitChange(event.target.value)}/>
            </InputGroup>
        );
    }

    getMessage(){
        let search = this.state.search;
        let result;
        if(search.limit === 0 || search.found < search.limit){
            result = search.found;
        } else {
            result = search.limit;
        }
        return(result)

    }

    render() {
        this.bindFunctions();
        return (
            <div>
                <br/>
                <h4 align="Center">Search for Places by Name</h4>
                {this.myInputs()}
                <CardBody>
                    <Row>{this.makeFilters()}</Row>
                </CardBody>
                <br/>
                <div key={"found"} style={{'height': '150px',
                    'overflow': 'scroll', 'display': 'block', 'width': '100%'}}>
                    {this.showPlaces()}
                    </div>
                <p align="Center">Showing {this.getMessage()} of {this.state.search.found}</p>
                <br/>
                <Button id={"addAll"} onClick={this.addAll}>Add All</Button>
            </div>
        )
    }

}