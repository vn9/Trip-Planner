package com.tripco.t04.planner;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.junit.Before;
import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class TestOptions {
    Option options;

    @Before
    public void initialize(){
        options = new Option("none", "user defined", "miles", 3959.0);
    }

    @Test
    public void testOptions(){
        String opti = "none";
        String unit = "user defined";
        String unName = "miles";
        Double unRad = 3959.0;

        assertEquals(opti, options.optimization);
        assertEquals(unit, options.units);
        assertEquals(unName, options.unitName);
        assertEquals(unRad, options.unitRadius);


    }
}
