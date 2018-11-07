import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import UploadFile from '../src/components/Application/UploadFile'

const startProps = {
    'config': { 'attributes': ['id', 'name', 'latitude', 'longitude', 'municipality', 'country'] },
    'trip': {'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': ""},
        'places': [],
        'distances': [],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'}
};

/* Test example using a pre-defined function */
function testExample() {
    const fields = mount((
        <UploadFile config={startProps.config} trip={startProps.trip}/>
    ));

    let actual = [];
    fields.find('InputGroupAddon').map((element) => actual.push(element.text().charAt(0).toLowerCase() + element.text().slice(1)));

    expect(actual).toEqual(startProps.config.attributes);
}

test('Check to see if Manual Inputs Match Config', testExample);

/*--------------------------------------------------------------------------*/

/* Test example using an anonymous function */
test('Check to see if Manual Inputs Match Config (Lambda)', () => {

    const fields = mount((   // (1)
        <UploadFile config={startProps.config} trip={startProps.trip}/>
    ));

    let actual = [];
    fields.find('InputGroupAddon').map((element) => actual.push(element.text().charAt(0).toLowerCase() + element.text().slice(1)));

    expect(actual).toEqual(startProps.config.attributes);
});
