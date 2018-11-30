import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import TwoPtCalculator from '../src/components/Application/twoPointCalc'

const startProps = {
    'config': { 'attributes': ['id', 'name', 'latitude', 'longitude', 'municipality', 'country'] },
    'options': {'units': "miles", 'unitName': "", 'unitRadius': 0.0000, 'optimization': ""},
};

/* Test example using a pre-defined function */
function testUnits() {
    const calculator = mount((
        <TwoPtCalculator config={startProps.config} options={startProps.options}/>
    ));

    calculator.setState({distance: {distance: 24, units: "user defined", unitName: "odd miles", unitRadius: 3959.0}});

    let expected = "Your Distance: 24 odd miles";
    expect(calculator.find('h5').text()).toEqual(expected);

}

test('Test Distance Result Generation', testUnits);

/*--------------------------------------------------------------------------*/

function testChange() {
    const calculator = mount((
        <TwoPtCalculator config={startProps.config} options={startProps.options}/>
    ));

    calculator.setState({distance: {type: "distance", version: 3, units: "miles", unitName: "", unitRadius: 0.00,
            origin: {latitude: "", longitude: "",},
            destination: {latitude: "", longitude: "",}, distance: 0,
        }});

    calculator.find('Input').at(0).simulate('change', {target: {value: '39.73'}});
    calculator.find('Input').at(1).simulate('change', {target:{value:'-104.99'}});
    calculator.find('Input').at(2).simulate('change', {target: {value: '40º1'}});
    calculator.find('Input').at(3).simulate('change', {target:{value:'-105.27'}});

}

test('Test Change Functions', testChange);
/*--------------------------------------------------------------------------*/


