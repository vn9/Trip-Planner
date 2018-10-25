package com.tripco.t04.server;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/**
 * This class contains tests for the Greeting class.
 */
@RunWith(JUnit4.class)
public class TestGreeting {
    Greeting greet;

    @Test
    public void testGreeting()
    {
        greet = new Greeting();
        String s = greet.html("Rush hour is the best");
        assertTrue(s.length() > 23);
    }
}