// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

/*  First we import our Enzyme configuration (1), this is defined in a different
 *    file and is require to use Enzyme for components. In addition to the standard
 *    imports you've seen before, we are using Enzyme.shallow (2), this "renders"
 *    your component but only for the first layer in the DOM (ie. <Itinerary/> will
 *    just render <Itinerary/> even though it may have more components under it.).
 *    Shallow rendering prevents problems with lower components from showing up in
 *    the tests of parent components.
*/

import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import ItineraryForm from '../src/components/Application/ItineraryForm'

/* Both of these tests are functionally identical although the standard way
 *  of writing tests uses lambda or anonymous functions. These are useful
 *  for defining functions that will only be in your code once but may be
 *  called multiple times by whatever they are passed to.
*/

/* A test response for our client to use;
 * this object represents the props that would be passed to the Options
 * component on construction.
 */
const startProps = {
    'trip': {
        "type" : "trip",
        "version" : 3,
        "title" : "Shopping loop",
        "options" : {
            "units":"miles"
        },
        "places" : [
            {"id":"dnvr", "name":"Denver", "latitude":39.7392, "longitude":-104.9903},
            {"id":"bldr", "name":"Boulder", "latitude":40.01499, "longitude":-105.27055},
            {"id":"foco", "name":"Fort Collins", "latitude":40.585258, "longitude":-105.084419},
            {"id":"aspn", "name":"Aspen", "latitude":39.1911, "longitude":-106.8175}
        ],
        "distances":[24,41,133,105]
    },
    'attributes': {
        "showName": true,
        "showId": true,
        "showLatitudeLongitude": true,
        "showLegDistance": true,
        "showTotalDistance": true
    }
};

/*--------------------------------------------------------------------------*/

/* Test example using an anonymous function */
test('Check to see if table gets made correctly (Lambda)', () => {
    /*  First, we create a version of our Options component, using the
     *  startProps object defined above for its props (1). With our new unrendered
     *  component, we can call ReactWrapper.find() to extract a certain part
     *  of the component and its children (2). Lastly, we check to see if the
     *  value of the buttons created by the component is what we expect,
     *  given the example input (3).
    */
    const itinerary = mount((   // (1)
        <ItineraryForm trip={startProps.trip}/>
    ));

    //let actual = [];
    //itinerary.find('table').find('thead').find('Dropdown').map((element) => actual.push(element.prop('text')));

    expect(itinerary.find('table'));

});
