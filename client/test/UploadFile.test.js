import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount, shallow } from 'enzyme'              // (2)
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

/* Test example using a pre-defined function */
function testManualFields() {
    const fields = mount((
        <UploadFile config={startProps.config} trip={startProps.trip}/>
    ));

    let actual = [];
    fields.find('InputGroupAddon').map((element) => actual.push(element.text().charAt(0).toLowerCase() + element.text().slice(1)));

    expect(actual).toEqual(startProps.config.attributes);
}

test('Check to see if Manual Inputs Match Config', testManualFields);

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

/*--------------------------------------------------------------------------*/

function testChange() {
    const fields = mount((
        <UploadFile config={startProps.config} trip={startProps.trip}/>
    ));

    fields.find('#latitude').first().simulate('change', {target : {value: "39.73"}});

}

test('Test Manual change', testChange);

/*--------------------------------------------------------------------------*/

function testToggle() {
    const fields = mount((
        <UploadFile config={startProps.config} trip={startProps.trip}/>
    ));

    fields.setState({collapse: false});

    fields.find('#toggle').first().simulate('click');

}

test('Test toggle', testToggle);

/*--------------------------------------------------------------------------*/

const upload = mount(<UploadFile config={startProps.config} trip={startProps.trip} updateTrip={updateMyTrip}/>);

upload.setState({myPlace: {}});

describe("Check Add Manual", ()=> {
        it("Should check the Manual Add", ()=> {
            upload.find("#myAdd").first().simulate('click');
            expect(updateTripSpy).toHaveBeenCalled();
        });
    it("Check Title Change", ()=> {
        upload.find('#title').first().simulate('change', {target: {value: "Road Trip"}});
        expect(updateTripSpy).toHaveBeenCalled();
    });
    }
);