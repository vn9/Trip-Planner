package com.tripco.t04.server;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;

/**
 *This class contains tests for the MicroServer class.
 */
@RunWith(JUnit4.class)
public class TestMicroServer {
    MicroServer microserver;

    @Test
    public void testInit()
    {
        microserver = new MicroServer(8088, "LZ");
        assertTrue(microserver != null);
    }
}