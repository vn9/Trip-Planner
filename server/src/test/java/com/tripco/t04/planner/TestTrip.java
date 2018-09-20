package com.tripco.t04.planner;

import java.io.FileNotFoundException;
import java.io.OutputStreamWriter;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.FileNotFoundException;
/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testDistances() {
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 12, 23, 34, 45, 65, 19);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
  }

  @Test

  /*
  * testMap uses BufferedReader to read in a local file
  * stores each line in an arrayList then return a big long string
  * testMap also uses PrintWriter to write each line that was read into a pre-created local file
  * for visualizing purpose
  * @param line - temporary string when read and write file
  * @param localPath - a string of the path where the output file locates, change the path if needed*/

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
  }
}