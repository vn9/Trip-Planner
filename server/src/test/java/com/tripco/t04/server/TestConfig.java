package com.tripco.t04.server;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/**
 *This class contains tests for the Config class.
 */
@RunWith(JUnit4.class)
public class TestConfig {
    Config config;

    @Test
    public void testConfig()
    {
        config = new Config();
        String c = config.getConfig();
        assertTrue(c.length() > 23);
    }

}