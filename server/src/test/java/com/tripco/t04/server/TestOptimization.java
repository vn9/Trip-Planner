package com.tripco.t04.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;



@RunWith(JUnit4.class)

public class TestOptimization {
    private String lab;
    private String des;
    Optimization testOpt;

    @Before
    public void initialize(){
        lab = "labelTest";
        des = "descriptionTest";
        testOpt = new Optimization(lab, des);
    }

    @Test
    public void testConstructor(){
        assertEquals(testOpt.description, des);
        assertEquals(testOpt.label, lab);
    }
}
