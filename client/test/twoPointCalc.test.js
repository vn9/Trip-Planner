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

    calculator.setState({distance: {distance: 24, units: "miles"}});

    let expected = "Your Distance: 24 miles";
    expect(calculator.find('p').text()).toEqual(expected);

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
    calculator.find('Input').at(2).simulate('change', {target:{value:'-104.99'}});

}

test('Test Change Functions', testChange);

/*--------------------------------------------------------------------------*/

function testToggle() {
    const calculator = mount((
        <TwoPtCalculator config={startProps.config} options={startProps.options}/>
    ));

    calculator.setState({collapse: false});

    calculator.find('Button').at(0).simulate('click');

}

test('Test Toggle', testToggle);