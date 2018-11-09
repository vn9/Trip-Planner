package com.tripco.t04.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

//This class contains tests for the Trip class.

@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;
  Place denver;
  Place peublo;
  Place saguache;
  Place minturn;
  Option options;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    denver = new Place("1", "Denver", "39.555", "-104.66", "Colorado", "United States of America", "North America");
    peublo = new Place("2", "Pueblo", "38.111", "-104.3", "Colorado", "United States of America", "North America");
    saguache = new Place("3", "Saguache", "38.02", "-106.08", "Colorado", "United States of America", "North America");
    minturn = new Place("4", "Minturn", "39.35", "-106.25", "Colorado", "United States of America", "North America");
    ArrayList<Place> places = new ArrayList<>();
    places.add(denver);
    places.add(peublo);
    places.add(saguache);
    places.add(minturn);

    options = new Option("none", "user defined", "miles", 3959.0, "svg");

    trip = new Trip("trip", 2 , "Test", options, places, null , "");
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
    //System.out.println(trip.svg());
  }

  @Test
  public void testLegDistances() {
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<>();
    Collections.addAll(expectedDistances,  102, 97, 92, 86);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }
  
  @Test
  public void testOptions(){
      trip.plan();
      String opt = "none";
      String unit = "user defined";
      String unName = "miles";
      Double unRad = 3959.0;
      String map = "svg";


      assertEquals(opt, trip.options.optimization);
      assertEquals(unit, trip.options.units);
      assertEquals(unName, trip.options.unitName);
      assertEquals(unRad, trip.options.unitRadius);
      assertEquals(map, trip.options.map);
    }

  @Test
  public void testOpt1(){
      trip.options.optimization = "short";
      trip.plan();
      ArrayList<Place> testPlaces = new ArrayList<>();
      testPlaces.add(denver);
      testPlaces.add(minturn);
      testPlaces.add(saguache);
      testPlaces.add(peublo);
      assertEquals(trip.places, testPlaces);
  }

  @Test
  public void testOpt2(){
      trip.options.optimization = "shorter";
      trip.plan();
      ArrayList<Place> testPlaces = new ArrayList<>();
      testPlaces.add(denver);
      testPlaces.add(minturn);
      testPlaces.add(saguache);
      testPlaces.add(peublo);
      assertEquals(trip.places, testPlaces);
  }
}
