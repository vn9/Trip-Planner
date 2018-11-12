import './enzyme.config.js'
import {mount, shallow} from "enzyme/build";
import SetServer from "../src/components/Application/SetServer";
import React from "react";

const jest = require('jest-mock');

const updateServerSpy = jest.fn();
const updateServer = updateServerSpy;

const startProps = {
    'config': { 'units': ['miles', 'kilometers', 'nautical miles', 'users defined'] },
    'options': { 'unit': 'miles' }
};

function testServer() {
    const server = mount((   // (1)
        <SetServer config={startProps.config}/>
    ));

    server.setState({server: 'http://localhost:8088'});

    server.find('Input').simulate('change', {target: {value: "http://black-bottle.cs.colostate.edu:31400" }});

}

test('Test the Server Change', testServer);

/*--------------------------------------------------------------------------*/

const myServer = shallow(<SetServer config={startProps.config} updateConfig={updateServer}/>);

myServer.setState({server: ""});

describe("Check Set Server Button", ()=> {
        it("Should change the server", ()=> {
            myServer.find('Button').first().simulate('click');
            expect(updateServerSpy).toHaveBeenCalled();
        });
    }
);