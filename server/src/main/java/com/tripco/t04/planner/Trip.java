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
        if(options.optimization.equals("short")){ nearestNeighbor(); }
        else if (options.optimization.equals("shorter")){
            opt2(); //follow meeeeeeeee
        }
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

  private void cleanUp ( int[] route, int start){ // Set the array to the new starting point
      for (int i = 0; i < route.length; i++) {
          route[i] = i;
      }
      swap(route, 0, start);
  }

  private void nearestNeighbor () {
      int[] best = new int[places.size()]; //array of indices that are the "best" route
      int minTotal = Integer.MAX_VALUE; //total distance for the best array
      int[][] latice = distanceLatice(); //matrix of all the distances
      int[] candidate = new int[best.length];
      //System.out.println(Arrays.toString(latice));
      for (int newStart = 0; newStart < places.size(); newStart++) {
          cleanUp(candidate, newStart);
          int contender = bestCandidate(candidate, latice);
          if (contender < minTotal) {
              minTotal = contender;
              int[] temp = candidate;
              candidate = best;
              best = temp;
          }
      }
      ArrayList<Place> nearestNei = new ArrayList<>(best.length);
      for (int index : best) {
          nearestNei.add(places.get(index));
      }
      places = nearestNei;
  }

  private void swap ( int[] arr, int firstIndex, int secondIndex){
      int firstValue = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = firstValue;
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

  private int bestCandidate ( int[] candidate, int[][] latice){
      int Total = 0;
      for (int i = 1; i < candidate.length; i++) {//for all start points
          int nearestIndex = neighbor(candidate, i, latice);
          int dist = latice[candidate[i - 1]][candidate[nearestIndex]];
          Total += dist;
          swap(candidate, i, nearestIndex);
      }
      //System.out.println(bestTotal);
      Total = Total + latice[candidate[0]][candidate[candidate.length - 1]];
      return Total;
  }

  private int neighbor ( int[] indices, int from, int[][] latice){
      int min = Integer.MAX_VALUE;
      int j = -1;
      for (int i = from; i < places.size(); i++) {
          int distance = latice[indices[from - 1]][indices[i]];
          if (distance < min) {
              min = distance;
              j = i;
          }
      }
      if (j == -1) {
          j = 0;
      }
      return j; //returns index of nearest neighbor
  }

  private void optReverse ( int[] candidate, int i1, int k){
      int start = Math.min(i1, k);
      int end = Math.max(i1, k);
      while (start < end) { //copied from Dave's code. keep swapping until all swaps are done
          swap(candidate, start++, end--); //actual swapping
      }
  }

  private int swapAttempt ( int[] candidate, int index1, int index2, int[][] latice){
      int c1 = candidate[index1 - 1]; // c1
      int c2 = candidate[index1]; // c2
      int c3 = candidate[index2]; // c3
      int c4 = candidate[(index2 + 1) % candidate.length]; // c4
      // latice[c1][c2] distance between point 1 and the point that is pointing towards it
      // latice[c3][c4] distance between point 2 and the point next
      // THE MOD IS FOR ONLY ONE CASE, WHERE WE ARE AT THE END AND NEED A LOOP
      int candDist = latice[c1][c2] + latice[c3][c4];
      // latice[c1][c3] the distance between point pointing to point1 and point 2
      // latice[c2][c4] distance between point 1 and point that point 2 is pointing towards
      int newDist = latice[c1][c3] + latice[c2][c4];
      if (candDist > newDist) {
          //if candDist is greater than newDist, there is a cross.
          // Draw a picture if you don't understand this line. Really useful
          optReverse(candidate, index1, index2); //reveres them
          return candDist - newDist;
      } else {
          return 0;
      }
  }

  private int iterate ( int[] candidate, int minDist, int[][] latice){
      for (int i = 1; i < candidate.length - 1; i++) {
          for (int j = i + 1; j < candidate.length; j++) {
              //nested for loop in the psuedo code given from Dave.
              // if there is a swap, check if we are allowed to swap
              minDist -= swapAttempt(candidate, i, j, latice);
          }
      }
      return minDist;
  }

  // 2 opt is an optimazation that uses nearestNeighbor to ensure no crosses exist
  private void opt2 () {
      int[] best = new int[places.size()]; //array of indices that are the "best" route
      int minTotal = Integer.MAX_VALUE; //total distance for the best array
      int[][] latice = distanceLatice(); //matrix of all the distances
      int[] candidate = new int[best.length];
      //System.out.println(Arrays.toString(latice));
      for (int newStart = 0; newStart < places.size(); newStart++) {
          //As you can see up until this point we are identical to nearest neighbor
          cleanUp(candidate, newStart);
          int contender = twoOpt(candidate, latice); //actual 2opt calculations will begin
          if (contender < minTotal) {
              minTotal = contender;
              int[] temp = candidate;
              candidate = best;
              best = temp;
          }
      }
      ArrayList<Place> nearestNei = new ArrayList<>(best.length);
      for (int index : best) {
          nearestNei.add(places.get(index));
      }
      places = nearestNei;
  }

  private int twoOpt ( int[] candidate, int[][] latice){
      int lastDist = Integer.MAX_VALUE;
      //runs 1opt. -> best = nn(0) in picture from Dave's office
      int minDist = bestCandidate(candidate, latice);
      while (lastDist != minDist) {
          //After running 1-opt for some certain start points, keep improving until we can't anymore
          lastDist = minDist;
          //Iterate through the candidate and returns the minimum total distance
          minDist = iterate(candidate, minDist, latice);
      }
      return minDist;
  }
}


