import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import ItineraryForm from '../src/components/Application/ItineraryForm'

const startProps = {
    'config': { 'attributes': ['id', 'name', 'latitude', 'longitude', 'municipality', 'country'] },
    'trip': {'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': ""},
        'places': [
            {"id":"dnvr", "name":"Denver", "latitude":39.7392, "longitude":-104.9903},
            {"id":"bldr", "name":"Boulder", "latitude":40.01499, "longitude":-105.27055},
            {"id":"foco", "name":"Fort Collins", "latitude":40.585258, "longitude":-105.084419},
            {"id":"aspn", "name":"Aspen", "latitude":39.1911, "longitude":-106.8175}],
        'distances': [24,41,133,105],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'}
};

/* Test example using a pre-defined function */
function testExample() {
    const boxes = mount((
        <ItineraryForm config={startProps.config} trip={startProps.trip}/>
    ));
    let expected = startProps.config.attributes;
    expected.push('leg Distance', 'total Distance');

    let actual = [];
    boxes.find('Label').map((element) => actual.push(element.text().charAt(0).toLowerCase() + element.text().slice(1)));

    expect(actual).toEqual(expected);
}

test('Check to see if check boxes get made propertly', testExample);

/*--------------------------------------------------------------------------*/

/* Test example using an anonymous function */
test('Check to see if table gets generated correctly', () => {

    const table = mount((   // (1)
        <ItineraryForm config={startProps.config} trip={startProps.trip}/>
    ));

    let expected = ["header", "Denver", "Boulder", "Fort Collins", "Aspen"];

    let actual = [];
    table.find('tr').map((element) => actual.push(element.prop('className')));

    expect(actual).toEqual(expected);
});

/*--------------------------------------------------------------------------*/

/* Test example using an anonymous function */
test('Check to see if table gets generated correctly', () => {

    const table = mount((   // (1)
        <ItineraryForm config={startProps.config} trip={startProps.trip}/>
    ));

    table.find("[name='latitude']").first().simulate('change');
    table.find("[name='showLegDist']").first().simulate('change');
});

/*--------------------------------------------------------------------------*/






