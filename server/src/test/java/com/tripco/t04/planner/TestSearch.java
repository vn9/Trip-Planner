package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

import static org.junit.Assert.*;

//Up to now, the search object just has a constructor. Thus, test the construction of search
//object is enough. As more functionality added into Search.java, new test is needed.

@RunWith(JUnit4.class)
public class TestSearch {
    private ArrayList<Place> places = new ArrayList<>();
    private Search searchobj1;
    private Search searchobj2;
    public boolean equal = false;


    @Before
    public void initialize() {
        searchobj1 = new Search(4,"search","Aero Bear Field", null,0, null, places);
        searchobj2 = new Search(4,"search","Aero Bear Field", null, 0, null, places);
    }

    @Test
    public void testSearch() {
        searchobj1.getPlaces();
        searchobj2.getPlaces();
        assertEquals(searchobj1.places,searchobj2.places);
    }

    @Test
    public void testConstructor(){
        Integer three = 4;
        String type = "search";
        String match = "Aero Bear Field";
        int number = 0;
        ArrayList<Place> testPlaces = new ArrayList<>();
        assertEquals(searchobj1.version, three);
        assertEquals(searchobj1.type, type);
        assertEquals(searchobj1.match, match);
        assertEquals(searchobj1.limit, number);
        assertEquals(searchobj1.places, testPlaces);
    }

}
