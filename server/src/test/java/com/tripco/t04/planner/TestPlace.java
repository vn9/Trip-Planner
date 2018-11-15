package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.junit.Assert.*;
import java.io.ByteArrayOutputStream;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestPlace {
  Place place;
  private final ByteArrayOutputStream errContent = new ByteArrayOutputStream();

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    place = new Place("dnvr","Denver", "39.5", "-104.5",
        "Colorado", "United States of America", "North America");
    //place.id = "dnvr";
    //place.name="Denver";
  }

  @Test 
  public void testPlace() {
    String id = "dnvr";
    String name = "Denver";
    assertEquals(place.id, id);
    assertEquals(place.name,name);
  }

}
