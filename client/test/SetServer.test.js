import './enzyme.config.js'
import {mount} from "enzyme/build";
import SetServer from "../src/components/Application/SetServer";
import React from "react";

const startProps = {
    'config': { 'units': ['miles', 'kilometers', 'nautical miles', 'users defined'] },
    'options': { 'unit': 'miles' }
};

function testServer() {
    const server = mount((   // (1)
        <SetServer config={startProps.config}/>
    ));

    server.find('Input').simulate('change', {target: {value: "http://black-bottle.cs.colostate.edu:31400" }});

}

test('Test the Server Change', testServer);