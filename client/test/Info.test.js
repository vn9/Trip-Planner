import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'// (2)
import Info from '../src/components/Application/Info'

function testBioGeneration() {
    const info_page = mount((
        <Info/>
    ));

    expect(info_page.find('CardTitle').first().text()).toEqual("Kira Deming");
}

test('Check if bios get created', testBioGeneration);