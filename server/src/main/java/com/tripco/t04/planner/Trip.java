package com.tripco.t04.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t04.server.HTTP;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import spark.Request;
import java.util.ArrayList;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

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
  //public Place[] places;
  public ArrayList<Integer> distances;
  public String map;


  public Trip(String type, Integer version,
              String title, Option options,
              ArrayList<Place> places, ArrayList<Integer>  distances,  String map) {
        this.type = type;
        this.version = version;
        this.title = title;
        this.options = options;
        this.places = places;
        this.distances = distances;
        this.map = map;
    }



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
  public String svg() {

    // hardcoded example
    //return "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";

    /*
    Load the file that contains the raw of the Colorado map using Maven stream.
    *@param line temporarily each line of the file when it was read
    */

      //ArrayList<String> rawMap = new ArrayList<>();
      BufferedReader reader;
      String line = "";

      reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/CObackground.svg")));

      StringBuilder coSvgBuilder = new StringBuilder();
      try {
          reader.readLine(); // ignore the first line

          line = reader.readLine();
          while (line != null) {
              coSvgBuilder.append(line).append("\n");
              line = reader.readLine();
          }
      } catch (IOException e) {
          e.printStackTrace();
      }

      String coSvg = coSvgBuilder.toString();
      String template = "<svg width=\"1066.6073\" height=\"783.0824\" " +
              "xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
              "%s\n" +
              "<svg width=\"1066.6073\" height=\"783.0824\"> %s </svg>\n" +
              "</svg>";

      // "M" for move point, "L" for draw line, "z" for draw a line to the start point
      String d = places.parallelStream().map(p -> p.getSvgCoordinate())
              .collect(Collectors.joining(" L ", "M ", " z"));
      String path = String.format("<path d=\"%s\" " +
                      "fill=\"none\" stroke=\"black\" stroke-width=\"3\" />", d);

      // first fill in string is coSvg, second is path
      return String.format(template, coSvg, path);
  }



  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

      ArrayList<Integer> dist = new ArrayList<Integer>();

      if (places == null) {
          return dist;
      }

      int totalPlaces = places.size();  // total number of places in the plan
      String units = options.units;
      String unitName = null;
      Double unitRadius = null;

      if (options.units.equals("user defined")) {
          unitName = options.unitName;
          unitRadius = options.unitRadius;
      }

    /*
    Loop sets origin and destination based on place in array list, when it
    reaches the end of the list, it resets the end to be the first list item,
    making a round-trip.
     */

      for (int i = 0; i < totalPlaces; i++) {

          Place start = places.get(i);
          Place end = places.get((i + 1) % totalPlaces); // % sets back to back zero when end reached


          Distance calculator = new Distance(start, end, units, unitName, unitRadius);
          dist.add(calculator.vincenty());
      }

      return dist;
      }
  }

