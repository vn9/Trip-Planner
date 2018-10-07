package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;



@RunWith(JUnit4.class)
public class TestDistance {

    private Distance distance1;
    private Distance distance2;
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

        distance1 = new Distance( test1Origin, test1Destination,"user defined", "accurate miles", 3958.7613);
        distance2 = new Distance( test2Origin, test2Destination,"user defined", "accurate miles", 3958.7613);
    }

    @Test
    public void testDistance() {
        int test1Distance = 24;
        int test2Distance = 41;
        int result1 = distance1.vincenty();
        int result2 = distance2.vincenty();
        assertEquals(result1,test1Distance);
        assertEquals(result2,test2Distance);
    }

    @Test
    public void testDistanceUnits(){
        distance1.units = "miles";
        distance2.units = "kilometers";
        int test3Distance = 24;
        int test4Distance = 65;
        int result3 = distance1.vincenty();
        int result4 = distance2.vincenty();
        assertEquals(result3, test3Distance);
        assertEquals(result4, test4Distance);
    }

    @Test
    public void testDistanceNauticalMilesUnits(){
        distance2.units = "nautical miles";
        int test6Distance = 35;
        int result6 = distance2.vincenty();
        assertEquals(result6, test6Distance);
    }

    @Test
    public void testCalculateMethod(){
        distance2.units = "nautical miles";
        int test7Distance = 35;
        distance2.calculate();
        int result7 = distance2.distance;
        assertEquals(result7, test7Distance);
    }


}
