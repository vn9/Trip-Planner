import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import Map from '../src/components/Application/Map'

const startProps = {
    'config': { 'attributes': ['id', 'name', 'latitude', 'longitude', 'municipality', 'country'], 'map': ["svg", "kml"]},
    'trip': {'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': "", 'map': "kml"},
        'places': [
            {"id":"dnvr", "name":"Denver", "latitude":39.7392, "longitude":-104.9903},
            {"id":"bldr", "name":"Boulder", "latitude":40.01499, "longitude":-105.27055},
            {"id":"foco", "name":"Fort Collins", "latitude":40.585258, "longitude":-105.084419},
            {"id":"aspn", "name":"Aspen", "latitude":39.1911, "longitude":-106.8175}],
        'distances': [24,41,133,105],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'},
};

function testKmlReady() {
    const myMap = mount((
        <Map config={startProps.config} trip={startProps.trip} options={startProps.options}/>
    ));

    let message = myMap.find('Alert').text();
    expect(message).toEqual('Your Map is Ready for Download!');

}

test('Check to see if check boxes get made propertly', testKmlReady);

/*--------------------------------------------------------------------------*/

function testKmlNotReady() {
    startProps.trip.places = [];
    startProps.trip.distances = [];
    const myMap = mount((
        <Map config={startProps.config} trip={startProps.trip}/>
    ));

    let message = myMap.find('Alert').text();

    expect(message).toEqual('Plan Your Trip in Order to Get Your Map');
}

test('Check to see if check boxes get made propertly', testKmlNotReady);

