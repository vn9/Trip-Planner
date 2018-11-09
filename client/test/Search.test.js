import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import Search from '../src/components/Application/Search'

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


const Props2 = {
    'config': {'filters': []},
    'trip': {
        'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': ""},
        'places': [], 'distances': [],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
    },
};

function testResults() {
    const checks = mount((
        <Search config={Props2.config} trip={Props2.trip}/>
    ));

    checks.setState({search: {version: 4, type: "search", match: "", filters: [], limit: 0, found: 2,
            places: [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
                {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}]
        }});

    let expected = ["match", "limit", "Denver", "Boulder"];

    let actual = [];
    checks.find('Input').map((element) => actual.push(element.prop('className')));

    expect(actual).toEqual(expected);
}

test('Test that results are formed', testResults);