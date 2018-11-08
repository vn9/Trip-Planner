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

