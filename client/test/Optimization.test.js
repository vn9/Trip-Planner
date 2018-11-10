import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import Optimization from '../src/components/Application/Optimization'


const startProps = {
    'config': { 'optimization': [{"label":"none", "description":"The trip is not optimized."},
            {"label": "short", "description": "Nearest neighbor"},
            {"label": "shorter", "description": "2-opt."}]},
    'options': { 'optimization': 'none' }
};


function testExample() {
    const optimization = mount((
        <Optimization config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    optimization.find('Button').map((element) => actual.push(element.prop('value')));

    expect(actual).toEqual(["none", "short", "shorter"]);
}

test('Check to see if table gets made correctly (Function)', testExample);

/*--------------------------------------------------------------------------*/

test('Check to see if table gets made correctly (Lambda)', () => {

    const optimization = mount((   // (1)
        <Optimization config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    optimization.find('Button').map((element) => actual.push(element.prop('value')));  // (2)

    expect(actual).toEqual(["none", "short", "shorter"]);  // (3)
});
