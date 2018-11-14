package com.tripco.t04.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.io.IOException;
import java.util.stream.Collectors;


//The Trip class supports TFFI so it can easily be converted to/from Json by Gson.

public class Trip {
  // The variables in this class should reflect TFFI.
  public String type;
  public Integer version;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;


  public Trip(String type, Integer version, String title, Option options, ArrayList<Place> places,
      ArrayList<Integer>  distances,  String map){
      this.type = type;
      this.version = version;
      this.title = title;
      this.options = options;
      this.places = places;
      this.distances = distances;
      this.map = map;
  }

  /** The top level method that does planning. At this point it just adds the map and distances
   * for the places in order. It might need to reorder the places in the future.*/
  public void plan(){
      if(options.optimization != null){ kOpt(); }
      if(options.map != null) { whichMap(); }
      else{ //default svg if map attribute inside options is not specified.
          Map myMap = new Map(places);
          this.map = myMap.svg();
      }
      this.distances = legDistances();
  }

    private void kOpt(){
      Optimize opt = null;
      int[][] latice = distanceLatice();
        if(options.optimization.equals("short")){ opt = new NearestNeighbor(places, latice); }
        else if (options.optimization.equals("shorter")){
            opt = new TwoOpt(places, latice); {
            } //follow meeeeeeeee
        }
        if(opt != null)
            places = opt.begin();
    }

    private void whichMap(){
        if (options.map.equals("kml")){this.map = kml();}
        else{
            Map myMap = new Map(places);
            this.map = myMap.svg();
        }
    }

  public String kml(){
      String start = "<?xml version= \"1.0\" encoding = \"UTF-8\"?>\n"
              +"<kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document>\n"
              +"<name>Paths</name> " +
              "<description>Examples of paths. Note that the tessellate tag is by default\n" +
              " set to 0. If you want to create tessellated lines, they must be authored\n" +
              " (or edited) directly in KML.</description>"+
              "<Style id=\"yellowLineGreenPoly\">\n"
              +"<LineStyle>\n" +
              " <color>7f00ffff</color>\n" +
              " <width>4</width>\n" +
              " </LineStyle>\n" +
              " <PolyStyle>\n" +
              " <color>7f00ff00</color>\n" +
              " </PolyStyle>\n" +
              " </Style> <Placemark>\n" +
              " <name>Absolute Extruded</name>\n" +
              " <description>Transparent green wall with yellow outlines</description>"+
              " <styleUrl>#yellowLineGreenPoly</styleUrl>\n" +
              " <LineString>\n" +
              " <extrude>1</extrude>\n" +
              " <tessellate>1</tessellate>\n" +
              " <altitudeMode>absolute</altitudeMode>\n" +
              " <coordinates>";
      //-112.2550785337791,36.07954952145647,2357   single line
      String end = "</coordinates>\n" + " </LineString> </Placemark>\n" + " </Document> </kml> ";

      String middle = places.parallelStream().map( p -> String.format("%s,%s,7000",p.longitude, p.latitude)).
              collect(Collectors.joining("\n"));

      //System.out.print("SEE:"+start + " " + middle + " " + end);
      return start + " " + middle + " " + end;
  }

  private StringBuilder readRawMap() {
      /*Load the file that contains the raw of the Colorado map using Maven stream.
       *@param line temporarily each line of the file when it was read
       */

      BufferedReader reader;
      String line;

      reader = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("/WorldMap.svg")));

      StringBuilder readMap = new StringBuilder();
      try {
          reader.readLine(); // ignore the first line
          line = reader.readLine();
          while (line != null) {
              readMap.append(line + "\n");
              line = reader.readLine();
          }
      } catch (IOException e) {
          e.printStackTrace();
      }
      return(readMap);
  }




          /* The function calculates the destination between two points
           * @return the distances between consecutive places, including the return to the starting
           * point to make a round trip.
           */
  private ArrayList<Integer> legDistances () {
      ArrayList<Integer> dist = new ArrayList<>();
      if (places == null) {
          return dist;
      } // if places is empty return dist
      int totalPlaces = places.size();  // total number of places in the plan
      String units = options.units;
      String unitName = null;
      Double unitRadius = null;
      if (options.units.equals("user defined")) {
          unitName = options.unitName;
          unitRadius = options.unitRadius;
      }
      //Loop sets origin and destination based on place in array list, when it reaches the end of
      // the list, it resets the end to be the first list item, making a round-trip.
      for (int i = 0; i < totalPlaces; i++) {
          Place start = places.get(i);
          Place end = places.get((i + 1) % totalPlaces); //% sets back to back zero when end reached
          Distance calculator = new Distance(start, end, units, unitName, unitRadius);
          dist.add(calculator.vincenty());
      }
      return dist;
  }


  private int[][] distanceLatice () {
      int[][] latice = new int[places.size()][places.size()];
      String units = options.units;
      String unitName = null;
      Double unitRadius = null;
      if (options.units.equals("user defined")) {
          unitName = options.unitName;
          unitRadius = options.unitRadius;
      }
      for (int i = 0; i < places.size(); i++) {
          latice[i][i] = 0;
          for (int j = i + 1; j < places.size(); j++) {
              Distance temp = new Distance(places.get(i), places.get(j), units, unitName, unitRadius);
              latice[i][j] = temp.vincenty();
              latice[j][i] = latice[i][j];
          }
      }
      return latice;
  }

}


