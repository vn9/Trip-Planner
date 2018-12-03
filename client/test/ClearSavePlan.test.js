import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount, shallow } from 'enzyme'// (2)
import ClearSavePlan from '../src/components/Application/ClearSavePlan'
import UploadFile from "../src/components/Application/UploadFile";

const jest = require('jest-mock');

const updateTripSpy = jest.fn();
const updateTrip = updateTripSpy;


const startProps = {
    'trip': {'type': "trip", 'title': "Summer Vacation",
        'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': "", 'map': "kml"},
        'places': [{'id': 'den', 'name': 'Denver', 'latitude': 39.73, 'longitude': -104.99},
            {'id': 'bldr', 'name': 'Boulder', 'latitude': 40.01, 'longitude': -105.27}],
        'distances': [24,24],
        'map': '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
    }
};

test('Check Map Save Button (Kml)', () => {
    const myButtons = mount(<ClearSavePlan trip={startProps.trip} updateBasedOnResponse={updateTrip}/>);
    myButtons.find('[id="mapSave"]').first().simulate('click');

});

/*--------------------------------------------------------------------------*/

test('Check Trip Save Button', () => {
    const myButtons = mount(<ClearSavePlan trip={startProps.trip} updateBasedOnResponse={updateTrip}/>);
    myButtons.find('[id="tripSave"]').first().simulate('click');

});

/*--------------------------------------------------------------------------*/

test('Check Plan Button', () => {
    const myButtons = mount(<ClearSavePlan trip={startProps.trip} updateBasedOnResponse={updateTrip}/>);
    myButtons.find('[id="plan"]').first().simulate('click');

});

/*--------------------------------------------------------------------------*/

test('Check Map Save Button (Svg)', () => {
    startProps.trip.options.map = "svg";
    const myButtons = mount(<ClearSavePlan trip={startProps.trip} updateBasedOnResponse={updateTrip}/>);
    myButtons.find('[id="mapSave"]').first().simulate('click');

});

/*--------------------------------------------------------------------------*/

test('Check Trip Save Button (.json)', () => {
    startProps.trip.title = "summer.json";
    const myButtons = mount(<ClearSavePlan trip={startProps.trip} updateBasedOnResponse={updateTrip}/>);
    myButtons.find('[id="tripSave"]').first().simulate('click');

});

/*--------------------------------------------------------------------------*/

// The following test returns a warning saying that we shouldn't attach things to a document body.  I have yet to
// figure out a solution.
// const fileup = mount(<UploadFile/>, {attachTo: document.body});
// const buttons = mount(<ClearSavePlan trip={startProps.trip} updateBasedOnResponse={updateTrip}/>);
// describe("Check Clear Button Behavior", ()=> {
//         it("should clear the trip", ()=> {
//             buttons.find('[id="clear"]').first().simulate('click');
//         });
//     }
// );

