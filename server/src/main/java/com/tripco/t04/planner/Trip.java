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
            nearestNeighbor();
        }
        else if (options.optimization.equals("shorter")){
            opt2(); //follow meeeeeeeee
        }
    }
    this.map = svg();
    this.distances = legDistances();
  }

  /**
   * @return an SVG containing the background and the legs of the trip.
   */
  public String svg() {

      StringBuilder readMap = readRawMap();
      StringBuilder paths = new StringBuilder();
      String line;
      int width= 1024;
      int height= 512;

      for(int i = 0; i < places.size(); i++){

          double curloo = Double.parseDouble(places.get(i).longitude);
          double curlat = Double.parseDouble(places.get(i).latitude);
          double nextloo, nextlat,x1, y1, x2, y2, modx1, modx2;

          if(i == places.size()-1) {
              nextloo = Double.parseDouble(places.get(0).longitude);
              nextlat = Double.parseDouble(places.get(0).latitude);
          }
          else {
              nextloo = Double.parseDouble(places.get(i+1).longitude);
              nextlat = Double.parseDouble(places.get(i+1).latitude);
          }

          if(Math.abs(curloo - nextloo) > 180) { // Draw two lines

              if(curloo > nextloo)
                  curloo -= 360;
              else
                  nextloo -= 360;

              x1 = (curloo + 180) * width / 360;
              x2 = (nextloo + 180) * width / 360;
              y1 = (90 - curlat) * height / 180;
              y2 = (90 - nextlat) * height / 180;

              modx1 = x1 + 1024;
              modx2 = x2 + 1024;

              line = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
              + "stroke=\"black\" stroke-width=\"2\"/>",x1,y1,x2,y2);

              String line2 = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
                  + "stroke=\"black\" stroke-width=\"2\"/>",modx1,y1,modx2,y2);

              paths.append(line+"\n");
              paths.append(line2+"\n");
          }
          else{ // Draw 1 line

              x1 = (curloo + 180) * width / 360;
              x2 = (nextloo + 180) * width / 360;
              y1 = (90 - curlat) * height / 180;
              y2 = (90 - nextlat) * height / 180;

              line = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
              + "stroke=\"black\" stroke-width=\"2\"/>",x1,y1,x2,y2);

              paths.append(line+"\n");
          }
      }

      StringBuilder newMap = readMap;
      newMap.insert(readMap.indexOf("</svg>"),paths.toString());

      return newMap.toString();
  }

  private StringBuilder readRawMap(){
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
              readMap.append(line+"\n");
              line = reader.readLine();
          }
      } catch (IOException e) {
          e.printStackTrace();
      }
      return readMap;
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

  private void cleanUp(int[] route, int start)
  {
      for(int i = 0; i < route.length; i++){
          route[i] = i;
      }
      swap(route,0,start);
  }

  private void nearestNeighbor()
  {
      int[] best = new int[places.size()]; //array of indices that are the "best" route
      int minTotal = Integer.MAX_VALUE; //total distance for the best array
      int[][] latice = distanceLatice(); //matrix of all the distances
      int[] candidate = new int[best.length];
      //System.out.println(Arrays.toString(latice));
      for(int newStart = 0; newStart < places.size(); newStart++)
      {
          cleanUp(candidate, newStart);
          int contender = bestCandidate(candidate, latice);
          if(contender < minTotal){
              minTotal = contender;
              int[] temp = candidate;
              candidate = best;
              best = temp;
          }
      }
      ArrayList<Place> nearestNei = new ArrayList<>(best.length);
      for(int index : best){
          nearestNei.add(places.get(index));
      }
      places = nearestNei;
  }

  private void swap(int[] arr, int firstIndex, int secondIndex){
      int firstValue = arr[firstIndex];
      arr[firstIndex] = arr[secondIndex];
      arr[secondIndex] = firstValue;
  }

  private int[][] distanceLatice()
  {
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

  private int bestCandidate(int[] candidate, int[][] latice)
  {
      int Total = 0;
      for(int i = 1; i < candidate.length; i++){//for all start points
          int nearestIndex = neighbor(candidate, i, latice);
          int dist = latice[candidate[i-1]][candidate[nearestIndex]];
          Total += dist;
          swap(candidate, i, nearestIndex);
      }
      //System.out.println(bestTotal);
      Total = Total + latice[candidate[0]][candidate[candidate.length-1]];
      return Total;
  }



  private int neighbor(int[] indices, int from, int[][] latice) //returns index of nearest neighbor
  {
    int min = Integer.MAX_VALUE;
    int j = -1;
    for(int i = from; i < places.size(); i++){
        int distance = latice[indices[from-1]][indices[i]];
        if(distance < min){
            min = distance;
            j = i;
        }
    }
    if(j == -1)
        j = 0;
    return j;
  }
    private int[] optReverse(int[] candidate, int i1, int k){
      int start = Math.min(i1, k);
      int end = Math.max(i1,k);
      while(start < end){ //copied from Dave's code. keep swapping until all swaps are done
          swap(candidate, start++, end--); //actual swapping
        }
        return candidate;
    }

    private int swapAttempt(int[] candidate, int index1, int index2, int[][] latice) {
        int c1 = candidate[index1-1]; // c1
        int c2 = candidate[index1]; // c2
        int c3 = candidate[index2]; // c3
        int c4 = candidate[(index2+1)%candidate.length]; // c4
        int candDist = latice[c1][c2] /*the distance between point 1 and the point that is pointing towards it*/ + latice[c3][c4];  //distance between point two and the point next. THE MOD IS FOR ONLY ONE CASE, WHERE WE ARE AT THE END AND NEED A LOOP
        int newDist = latice[c1][c3]/*the distance betwwen point pointing to point1 and point 2*/ + latice[c2][c4]; //distance between point 1 and point that point 2 is pointing towards
        if (candDist > newDist) { //if candDist is greater than newDist, there is a cross. Draw a picture if you don't understand this line. Really useful
            optReverse(candidate, index1, index2); //reveres them
            return candDist - newDist;
        } else {
            return 0;
        }
    }

    private int iterate(int[] candidate, int minDist, int[][] latice){
        for (int i = 1; i < candidate.length-1; i++) {
            for (int j = i+1; j < candidate.length; j++) {
                minDist -= swapAttempt(candidate, i, j, latice); //nested for loop in the psuedo code given from Dave. We see if we are allowed to swap (if there is a swap)
            }
        }
        return minDist;
    }


    private void opt2 () { //two opt is an optimatization that takes nearestNeighbor and makes sure no crosses exist
        int[] best = new int[places.size()]; //array of indices that are the "best" route
        int minTotal = Integer.MAX_VALUE; //total distance for the best array
        int[][] latice = distanceLatice(); //matrix of all the distances
        int[] candidate = new int[best.length];
        //System.out.println(Arrays.toString(latice));
        for(int newStart = 0; newStart < places.size(); newStart++)
        {
            //As you can see up until this point we are identical to nearest neighbor
            cleanUp(candidate, newStart);
            int contender = twoOpt(candidate, latice); //actual 2opt calculations will begin
            if(contender < minTotal){
                minTotal = contender;
                int[] temp = candidate;
                candidate = best;
                best = temp;
            }
        }
        ArrayList<Place> nearestNei = new ArrayList<>(best.length);
        for(int index : best){
            nearestNei.add(places.get(index));
        }
        places = nearestNei;
    }



    private int twoOpt(int[] candidate, int[][] latice)
    {
        int lastDist = Integer.MAX_VALUE;
        int minDist = bestCandidate(candidate, latice); //runs 1opt. -> best = nn(0) in picture from daves office
        while(lastDist != minDist){ //after we run 1opt for certain start point, we want to keep improving until we can't anymore
            lastDist = minDist;
            minDist = iterate(candidate, minDist, latice); //goes through the nested for loop and returns the total distance.
        }
        return minDist;
    }



    }


