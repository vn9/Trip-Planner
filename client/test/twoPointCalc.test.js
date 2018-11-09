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