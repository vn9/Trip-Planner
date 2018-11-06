package com.tripco.t04.planner;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.util.ArrayList;
import java.io.IOException;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
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

    if(options.optimization != null){
        if(options.optimization.equals("short")){
            int[] best = new int[places.size()];
            int bestTotal = 0;
            int[][] latice = distanceLatice();
            for(int i = 0; i < best.length; i++){
                best[i] = i;
            }
            for(int j = 0; j < best.length; j++){
                if(j+1 < best.length)
                    bestTotal += latice[best[j]][best[j+1]];
                else
                    bestTotal += latice[best[j]][0];
            }

            for(int i = 0; i < best.length; i++){//for all start points
                int Total = 0;
                //start points
                boolean[] seen = new boolean[best.length];
                int[] candidate = new int[best.length];
                candidate[0] = i; // set start point, different for each iteration
                seen[i] = true;
                for(int j = 1; j < candidate.length; j++){ //find nearest neighbor path for one that starts at i
                    int nearestIndex = neighbor(candidate[j-1], latice, seen); //find the nearest index to j-1
                    seen[nearestIndex] = true; //it has now been seen
                    candidate[j] = nearestIndex; //next is nearest index
                }

                //calculate total distance and compare
                for(int j = 0; j < candidate.length; j++){
                    if(j+1 < candidate.length)
                        Total += latice[candidate[j]][candidate[j+1]];
                    else
                        Total += latice[candidate[j]][candidate[0]];
                }
                //System.out.println(Total);
                if(Total < bestTotal){
                    bestTotal = Total;
                    best = candidate;
                }
            }

            ArrayList<Place> nearestNei = new ArrayList<>();
            for(int i = 0; i < best.length; i++){
                nearestNei.add(places.get(best[i]));
            }
            places = nearestNei;
            //System.out.println(places.get(0).name);
        }
        else if (options.optimization.equals("shorter")){
            opt2();
        }
    }
    this.map = svg();
    this.distances = legDistances();
  }

  /**
   * @return an SVG containing the background and the legs of the trip.
   */
  public String svg() {

    /*
    Load the file that contains the raw of the Colorado map using Maven stream.
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
              readMap.append(line+"\n");
              line = reader.readLine();
          }
      } catch (IOException e) {
          e.printStackTrace();
      }

//      String rawMap = readMap.toString();
      StringBuilder paths = new StringBuilder();
      String draw;
      int width= 1024;
      int height= 512;

      for(int i = 0; i < places.size(); i++){
          double x1 = (Double.parseDouble(places.get(i).longitude)+180) * width/360;
          double y1 = (90 - Double.parseDouble(places.get(i).latitude)) * height/180;
          double x2;
          double y2;
          if(i == places.size()-1) {
              x2 = (Double.parseDouble(places.get(0).longitude)+180) * width/360;
              y2 = (90 - Double.parseDouble(places.get(0).latitude)) * height/180;
          }
          else {
              x2 = (Double.parseDouble(places.get(i+1).longitude)+180) * width/360;
              y2 = (90 - Double.parseDouble(places.get(i+1).latitude)) * height/180;
          }
          draw = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
              + "stroke=\"black\" "
              + "stroke-width=\"2\"/>",x1,y1,x2,y2);
          paths.append(draw+"\n");
      }

      StringBuilder newMap = readMap;
      newMap.insert(readMap.indexOf("</svg>"),paths.toString());

      return newMap.toString();



//      String template = "<svg width=\"1066.6073\" height=\"783.0824\" " +
//              "xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
//              "%s\n" +
//              "<svg width=\"1066.6073\" height=\"783.0824\"> %s </svg>\n" +
//              "</svg>";
//
//      // "M" for move point, "L" for draw line, "z" for draw a line to the start point
//      String d = places.parallelStream().map(p -> p.getSvgCoordinate())
//              .collect(Collectors.joining(" L ", "M ", " z"));
//      String path = String.format("<path d=\"%s\" " +
//                      "fill=\"none\" stroke=\"black\" stroke-width=\"3\" />", d);
//
//      // first fill in string is rawMap, second is path
//      return String.format(template, rawMap, path);
  }



  /**
   * @return the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   */
  private ArrayList<Integer> legDistances() {

      ArrayList<Integer> dist = new ArrayList<>();

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

  private int[][] distanceLatice() {
    int[][] latice = new int[places.size()][places.size()];
      String units = options.units;
      String unitName = null;
      Double unitRadius = null;

      if (options.units.equals("user defined")) {
          unitName = options.unitName;
          unitRadius = options.unitRadius;
      }
    for(int i = 0; i < places.size(); i++){
        latice[i][i] = 0;
        for(int j = i+1; j < places.size(); j++){
            Distance temp = new Distance(places.get(i),places.get(j),units, unitName, unitRadius);
            latice[i][j] = temp.vincenty();
            latice[j][i] = latice[i][j];
        }
      }
      return latice;
  }

  //private void nearestNeighbor(int[][] latice) {
  //  for(int i = 1; i < places.size(); i++){
   //     int index = neighbor(i, latice);
   //     swap(i, index);
   // }
  //}

  private void swap(int first, int sec)
  {
    Place firstPlace = places.get(first);
    this.places.set(first, places.get(sec));
    this.places.set(sec, firstPlace);
  }

  private int neighbor(int start, int[][] latice, boolean[] seen) //returns index of nearest neighbor
  {
    int min = Integer.MAX_VALUE;
    int j = -1;
    for(int i = 0; i < places.size(); i++){
        int distance = latice[start][i];
        if(distance < min && seen[i] == false){
            min = distance;
            j = i;
        }
    }
    if(j == -1)
        j = 0;
    return j;
  }

    private static int distanceBetween(Place from, Place to) {
        Distance calculator = new Distance(from, to, "miles", null ,null);
        return calculator.vincenty();
    }

    private void reverse(int i1, int k) {
        while(i1 < k){
            Place temp = places.get(i1);
            places.set(i1, places.get(k));
            places.set(k,temp);
            i1++;
            k--;
        }
    }


    private void opt2 () { // to change the order of places
        final int n = places.size();
        if (n > 4){ // n <= 4, keep unchanged
            boolean improved = true;
            while (improved){

                improved = false;
                for (int i = 0; i <= n - 3; i++) {
                    for (int j = i + 2; j <= n-1 ; j++) {
                        //delta = -dis(route,i,i+1)-dis(route,j,j+1)+dis(route,i,j) +dis(route,i+1,j+1)
                        Place u1,u2,v1,v2;
                        if (j == n-1){
                            u1 = places.get(i); v1 = places.get(i + 1); u2 = places.get(j); v2 = places.get(0); // back to the first point
                        }
                        else {
                            u1 = places.get(i); v1 = places.get(i + 1); u2 = places.get(j); v2 = places.get(j + 1);
                        }
                        int delta = - distanceBetween(u1,v1) - distanceBetween(u2,v2) + distanceBetween(u1, u2) + distanceBetween(v1 ,v2);
                        if (delta < 0) {
                            reverse(i + 1, j);
                            improved = true;
                        }
                    }
                }
            }
        }

    }
  }

