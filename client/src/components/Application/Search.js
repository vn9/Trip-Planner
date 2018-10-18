import React, {Component} from 'react'
import {Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Row, Col} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api';
import {Place} from './UploadFile';
import DropDown from "./DropDown";

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
        this.returnedPlace = this.returnedPlace.bind(this);
    }

    toggle() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    updateSearch(response){
        this.setState({'search': response})
    }

    matchChange(query){
        let mySearch = this.state.search;
        mySearch['match'] =  query;
        this.setState(mySearch);
    }

    onSearch(){
        console.log(JSON.stringify(this.state.search));
        request(this.state.search, 'search', serverURL).then(
            (response) => {
                console.log(response);
                this.updateSearch(response);
            })

    }

    addPlace() {
       console.log('Need to make this work')
    }


    returnedPlace() {
        let destinations = this.state.search.places.map((place, index)=>
            <InputGroup key={index}>
                    <Input id={index} type="hidden" value={place}/>
                    <Input readOnly value={place.name}/>
                <InputGroupAddon addonType="append"><Button key={index} onClick={this.addPlace}>Add</Button></InputGroupAddon>
            </InputGroup>

        );

        let finalPlaces = [];
        for (let i = 0; i < destinations.length; i++){
            let place = destinations[i];
            finalPlaces.push(place)
        }

        return(
            finalPlaces
        )
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
                            {this.returnedPlace()}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


/*

TO LZ FROM KIRA:  This is another option to display the returned places. This might be easier to pull the
place values from when adding to the trip, but I'll leave it up to you.

    returnedPlace(){
        let funcNames = ["Add"];
        let funcs = [this.addPlace.bind(this)];
        let destinations = this.state.search.places.map(
            (item,index)=> <DropDown
                key={'place_' + item.id}
                value={index}
                text={item.name}
                funcNames = {funcNames}
                funcs={funcs}/>
        );
        let finalPlaces = [];
        for (let i = 0; i < destinations.length; i++){
            let place = destinations[i];
            let myrow = <tr>{place}</tr>;
            finalPlaces.push(myrow)
        }

        return(
            finalPlaces
        )
    }

        render() {
        return(
            <div>
                <Row>
                    <Col md={6}>
                        <h4 align="Center">Search for Places by Name</h4>
                        <Input placeholder="eg. Aspen" onChange={(event) => this.matchChange(event.target.value)}/>
                        <Button className="btn-dark" onClick={this.onSearch}>Search</Button>
                    </Col>
                    <Col md={6}>
                        <div style={{'height': '200px', 'overflow':'scroll', 'display':'block', 'width':'100%'}}>
                            <table>
                                <tbody>
                                {this.returnedPlace()}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
 */

