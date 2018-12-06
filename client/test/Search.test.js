import './enzyme.config.js'
import React from 'react'
import { mount, shallow } from 'enzyme'
import Search from '../src/components/Application/Search'

const jest = require('jest-mock');

const updateTripSpy = jest.fn();
const updateMyTrip = updateTripSpy;

const startProps = {
    'config': {
        'filters': [{
            "name": "continents.name", "values": ["North America", "South America", "Africa",
                "Asia", "Oceania", "Europe", "Antarctica"]
        }]
    },
    'trip': {
        'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': ""},
        'places': [], 'distances': [],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
    },
};

function testCheckBoxes() {
    const checks = mount((
        <Search config={startProps.config} trip={startProps.trip} search={startProps.search}/>
    ));

    let expected = ["North America", "South America", "Africa",
        "Asia", "Oceania", "Europe", "Antarctica"];

    let actual = [];
    checks.find('Label').map((element) => actual.push(element.text()));

    expect(actual).toEqual(expected);
}

test('Filter checkboxes get made correctly test', testCheckBoxes);

/*--------------------------------------------------------------------------*/


function testResults() {
    startProps.config.filters= [];
    const results = mount((
        <Search config={startProps.config} trip={startProps.trip}/>
    ));

    results.setState({search: {version: 4, type: "search", match: "", filters: [], limit: 0, found: 2,
            places: [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
                {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}]
        }});

    let expected = ["match", "limit", "Denver", "Boulder"];

    let actual = [];
    results.find('Input').map((element) => actual.push(element.prop('className')));

    expect(actual).toEqual(expected);
}

test('Test that results are formed', testResults);

/*--------------------------------------------------------------------------*/

function testChanges() {
    startProps.config.filters= [];
    const results = mount((
        <Search config={startProps.config} trip={startProps.trip}/>
    ));

    results.setState({search: {version: 4, type: "search", match: "", filters: [], limit: 0, found: 2,
            places: [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
                {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}]
        }});

    results.find('#Limit').first().simulate('change', {target: {value: 5}});
    results.find('#Limit').first().simulate('change', {target: {value: ""}});
    results.find('#match').first().simulate('change', {target: {value: "barcelona"}});

}

test('Test limit and match changes', testChanges);

/*--------------------------------------------------------------------------*/

function testCheck() {
    startProps.config.filters= [{"name": "continents.name", "values":['Asia']}];

    const results = mount((
        <Search config={startProps.config} trip={startProps.trip}/>
    ));

    results.find('#Asia').first().simulate('change');
}

test('Test onCheck', testCheck);

/*--------------------------------------------------------------------------*/

function testMessage0() {
    startProps.config.filters= [{"name": "continents.name", "values":['Asia']}];

    const results = mount((
        <Search config={startProps.config} trip={startProps.trip}/>
    ));

    results.setState({search: {version: 4, type: "search", match: "", filters: [], limit: 0, found: 2,
            places: [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
                {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}]
        }});

    let message = results.find('p').text();
    let ideal = "Showing 2 of 2 Results";
    expect(message).toEqual(ideal)
}

test('Test Messages (0 Limit)', testMessage0);

/*--------------------------------------------------------------------------*/

function testMessage() {
    startProps.config.filters= [{"name": "continents.name", "values":['Asia']}];

    const results = mount((
        <Search config={startProps.config} trip={startProps.trip}/>
    ));

    results.setState({search: {version: 4, type: "search", match: "", filters: [], limit: 2, found: 50,
            places: [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
                {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}]
        }});

    let message = results.find('p').text();
    let ideal = "Showing 2 of 50 Results";
    expect(message).toEqual(ideal)
}

test('Test Messages (Limit, Variable Found)', testMessage);

/*--------------------------------------------------------------------------*/

const mySearch = shallow(<Search config={startProps.config} trip={startProps.trip} updateTrip={updateMyTrip}/>);

mySearch.setState({search: {version: 4, type: "search", match: "", filters: [], limit: 0, found: 2,
        places: [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
            {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}]
    }});

let myPlace = JSON.stringify({"id": "den", "name": "Denver", "latitude": "39.73", "longitude": "-104.99"});
let myPlaces = mySearch.state.places;

describe("Check Add Buttons", ()=> {
        it("Should check individual add", ()=> {
            mySearch.find('#den').first().simulate('click',
                {target: {value: myPlace}});
            expect(updateTripSpy).toHaveBeenCalled();
        });
    it("Should check the add All", ()=> {
        mySearch.find('#addAll').first().simulate('click',
            {target: {value: myPlaces}});
        expect(updateTripSpy).toHaveBeenCalled();
    });
    }
);

