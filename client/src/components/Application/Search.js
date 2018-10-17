import React, {Component} from 'react'
import {Card, CardBody, Button, Input} from 'reactstrap'
import {serverURL} from  './SetServer'

import {request} from '../../api/api'

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
            }
        };
        this.matchChange = this.matchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        //this.updateSearch = this.updateSearch.bind(this);
    }
/*
    updateSearch(response){
        this.setState({'search': response})
    }
*/
    matchChange(query){
        let mySearch = this.state.search;
        mySearch['match'] =  query;
        this.setState(mySearch);
    }

    onSearch(){
        console.log(JSON.stringify(this.state.search))
        /*
        request(this.state.search, 'search', serverURL).then(
            (response) => {
                console.log(response);
                this.updateSearch(response);
            })
            */
    }

    render(){
        return(
            <Card>
                <CardBody>
                    <h4 align="Center">Search for Places by Name</h4>
                    <Input placeholder="eg. Leadville" onChange={(event) => this.matchChange(event.target.value)}/>
                    <Button className="btn-dark" onClick={this.onSearch}>Search</Button>
                </CardBody>
            </Card>

        )
    }

}