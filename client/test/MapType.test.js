import './enzyme.config.js'                   // (1)
import React from 'react'
import {mount, shallow} from 'enzyme'// (2)
import MapType from '../src/components/Application/MapType'

const jest = require('jest-mock');

const updateMapSpy = jest.fn();
const updateMap = updateMapSpy;

const startProps = {
    'config': { 'map': ["svg", "kml"]},
    'options': { 'map': 'svg' }
};

function MapButtonGeneration() {
    const types = mount((
        <MapType config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    types.find('Button').map((element) => actual.push(element.prop('value')));

    expect(actual).toEqual(startProps.config.map);
}

test('Check if map options are made', MapButtonGeneration);

/*--------------------------------------------------------------------------*/

const types = shallow(<MapType config={startProps.config} options={startProps.options} updateOptions={updateMap}/>);

describe("Check Map ButtonBehavior", ()=> {
        it("should have a new map type now", ()=> {
            types.find('[id="kml"]').simulate('click', {target: {value: "kml"}});
            expect(updateMapSpy).toHaveBeenCalled();
        });
    }
);