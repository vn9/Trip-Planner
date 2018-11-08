package com.tripco.t04.planner;

import java.io.FileNotFoundException;
import java.io.OutputStreamWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.FileNotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
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
    options = new Option("none", "user defined", "miles", 3959.0, "");
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
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances,  102, 97, 92, 86);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }
  
  @Test
  public void testOptions(){
      trip.plan();
      String opti = "none";
      String unit = "user defined";
      String unName = "miles";
      Double unRad = 3959.0;
      String map = "";

      assertEquals(opti, trip.options.optimization);
      assertEquals(unit, trip.options.units);
      assertEquals(unName, trip.options.unitName);
      assertEquals(unRad, trip.options.unitRadius);
      assertEquals(map, trip.options.map);
    }

  @Test
  public void testOpt1(){
    trip.options.optimization = "short";
    trip.plan();
    ArrayList<Place> testplaces = new ArrayList<>();
    testplaces.add(denver); testplaces.add(minturn); testplaces.add(saguache); testplaces.add(peublo);
    assertEquals(trip.places, testplaces);
  }

  @Test
  public void testOpt2(){
      trip.options.optimization = "shorter";
      trip.plan();
      ArrayList<Place> testplaces = new ArrayList<>();
      testplaces.add(denver); testplaces.add(peublo); testplaces.add(saguache); testplaces.add(minturn);
      assertEquals(trip.places, testplaces);
  }

   /*
  * testMap uses BufferedReader to read in a local file
  * stores each line in an arrayList then return a big long string
  * testMap also uses PrintWriter to write each line that was read into a pre-created local file
  * for visualizing purpose
  * @param line - temporary string when read and write file
  * @param localPath - a string of the path where the output file locates, change the path if needed*/

  
  
  
  /*@Test
  public void testMap() {
    trip.plan();
    BufferedReader reader;
    String line = "";
    ArrayList<String> store = new ArrayList<>();
    try{
      reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));
      //String localPath = "";
      //PrintWriter writer = new PrintWriter(localPath);
      while((line = reader.readLine())!=null){
        //System.out.println(line);
        store.add(line);
        //writer.print(line);
      }
      //writer.close();
    }
    catch (Exception e){}

    String expect = store.toString();
    //assertEquals(trip.map,"<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>");
    assertEquals(trip.map,expect);
  }*/
}
