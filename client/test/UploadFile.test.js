import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import UploadFile from '../src/components/Application/UploadFile'

const jest = require('jest-mock');

const updateTripSpy = jest.fn();
const updateMyTrip = updateTripSpy;

const startProps = {
    'config': { 'attributes': ['id', 'name', 'latitude', 'longitude', 'municipality', 'country'] },
    'trip': {'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': ""},
        'places': [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
            {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}],
        'distances': [24],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
    }
};

function testToggle() {
    const fields = mount((
        <UploadFile config={startProps.config} trip={startProps.trip}/>
    ));

    fields.setState({collapse: false});

    fields.find('#toggle').first().simulate('click');

}

test('Test toggle', testToggle);