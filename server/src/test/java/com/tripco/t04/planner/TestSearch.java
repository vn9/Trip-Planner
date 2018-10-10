package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

//import static org.junit.Assert.*;

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
        searchobj1 = new Search("3","search","", 0, places);
        searchobj2 = new Search("3","search","", 0, places);
    }

    @Test
    public void testSearch() {


        if(searchobj1.version.equals(searchobj2.version) ||
                searchobj1.type.equals(searchobj2.type) ||
                searchobj1.match.equals(searchobj2.match) ||
                searchobj1.limit == searchobj2.limit ||
                searchobj1.places == searchobj2.places){
            equal = true;
        }
    }

}
