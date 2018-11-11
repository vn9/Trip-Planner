import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount, shallow } from 'enzyme'// (2)
import Optimization from '../src/components/Application/Optimization'

const jest = require('jest-mock');

const updateOptSpy = jest.fn();
const updateOpt = updateOptSpy;


const startProps = {
    'config': { 'optimization': [{"label":"none", "description":"The trip is not optimized."},
            {"label": "short", "description": "Nearest neighbor"},
            {"label": "shorter", "description": "2-opt."}]},
    'options': { 'optimization': 'none' }
};


function testOptGeneration() {
    const optimization = mount((
        <Optimization config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    optimization.find('Button').map((element) => actual.push(element.prop('value')));

    expect(actual).toEqual(["none", "short", "shorter"]);
}

test('Check if optimization options get created', testOptGeneration);

/*--------------------------------------------------------------------------*/

test('Check to see if table gets made correctly (Lambda)', () => {

    const optimization = mount((   // (1)
        <Optimization config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    optimization.find('Button').map((element) => actual.push(element.prop('value')));  // (2)

    expect(actual).toEqual(["none", "short", "shorter"]);  // (3)
});


/*--------------------------------------------------------------------------*/

const myOpt = shallow(<Optimization config={startProps.config} options={startProps.options} updateOptions={updateOpt}/>);

describe("Check Button Behaviorr", ()=> {
    it("should active new opt", ()=> {
        myOpt.find('#short').first().simulate('click', {target: {value: "short"}});
        expect(updateOptSpy).toHaveBeenCalled();
    });
    }
);
