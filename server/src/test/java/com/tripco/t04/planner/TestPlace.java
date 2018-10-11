package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

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
    place = new Place("dnvr","Denver", "39.5", "-104.5");
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

  @Test
  public void testGet(){
    // corver the invaild input
    place = new Place("dnvr","Denver", "-390.5", "-104.5");
    assertEquals(0.0, place.getLat(),0.0);
    place = new Place("dnvr","Denver", "-39.5", "-1040.5");
    assertEquals(0.0, place.getLong(),0.0);
  }
}
