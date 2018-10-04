package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;


@RunWith(JUnit4.class)
public class TestDistance {
    private Distance distance;
    private Place test1Origin;
    private Place test1Destination;
    private Place test2Origin;
    private Place test2Destination;

    @Before
    public void initialize() {
        test1Origin = new Place("dnvr","Denver", "39.7392", "-104.9903");
        test1Destination = new Place("bldr","Boulder", "40.015", "-105.2706");
        test2Origin = new Place("bldr","Boulder", "40.015", "-105.2706");
        test2Destination = new Place("foco","Fort Collins", "40.5853", "-105.0844");
        distance = new Distance( test1Origin, test1Destination,"user defined", "accurate miles", 3958.7613);
        distance = new Distance( test2Origin, test2Destination,"user defined", "accurate miles", 3958.7613);
    }



}
