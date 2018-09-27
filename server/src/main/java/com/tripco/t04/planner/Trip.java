package com.tripco.t04.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;


/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
  // The variables in this class should reflect TFFI.
  public String type;
  public Integer version;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order.
   * It might need to reorder the places in the future.
   */
  public void plan() {

    this.map = svg();
    this.distances = legDistances();

  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @return
   */
  private String svg() {

    // hardcoded example
    //return "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";

    /*
    Load the file that contains the raw of the Colorado map using Maven stream.
    *@param line temporarily each line of the file when it was read
    */

    ArrayList<String> rawMap = new ArrayList<>();
    BufferedReader reader;
    String line = "";

    // Try to load the file if it exists, otherwise throw exception
    try{
      reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));
      while((line = reader.readLine())!=null){
        //System.out.println(line);
        rawMap.add(line);
      }
    }
    catch (Exception e){
      return "Error in load and store file: "+e.getMessage();
    }
    
    // Return the arrayList rawMap
    return rawMap.toString();
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

      ArrayList<Integer> dist = new ArrayList<Integer>();
      //dist.add(places.size());

      ArrayList<Place> roadtrip = new ArrayList<Place>();

      int totalPlaces; //total number of places in the plan. i.e. (Denver, FoCo, Boulder. totalPlaces = 3.)
      if(places != null) {
          totalPlaces = places.size();
          Distance calculator = new Distance(); // Using distance class lower down to calculate the distance between two points
          if(options.units.equals("user defined")){
              calculator.units = options.units;
              calculator.unitName = options.unitName;
              calculator.unitRadius = options.unitRadius;
          }
          else {calculator.units = options.units;}


          for (int i = 0; i < totalPlaces; i++) //for loop that occurs the same number of times = totalPlaces
          {
              Place start = places.get(i); //origin, where you are driving from
              Place end; //destination, where you are driving to
              if ((i + 1) >= totalPlaces) //if (i+1) is out of scope, it means that we are at the last origin and that the destination is now the original origin
              {
                  end = places.get(0); // destination is the original origin
              } else {
                  end = places.get(i + 1); // destination is the next city in the places arraylist
              }
              calculator.origin = start;
              calculator.destination = end;
              dist.add(calculator.vincenty());
          }
      }
      // hardcoded example
      //dist.add(12);
      //dist.add(23);
      //dist.add(34);
      //dist.add(45);
      //dist.add(65);
      //dist.add(19); //should actually be 19

      return dist;
      }
  }

