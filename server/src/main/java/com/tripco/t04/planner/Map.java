package com.tripco.t04.planner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class Map {
    public ArrayList<Place> places;
    // Map takes a Place to create a svg/kml String
    public Map(ArrayList<Place> places){
        this.places = places;
    }

    /**Load the file that contains the raw of the Colorado map using Maven stream.
     * @return StringBuilder a raw map
     */
    private StringBuilder readRawMap(){
        BufferedReader reader;
        String line;
        InputStreamReader inputStream;
        inputStream = new InputStreamReader(getClass().getResourceAsStream("/WorldMap.svg"));
        reader = new BufferedReader(inputStream);
        StringBuilder readMap = new StringBuilder();
        try {
            reader.readLine(); // ignore the first line
            line = reader.readLine();
            while (line != null) {
                readMap.append(line).append("\n");
                line = reader.readLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return readMap;
    }

    /**Using the map's dimensions along with longitudes and latitudes to calculate the image's pixel
     * @return double[] holds 4 values x1,x2,y1,y2
     */
    private double[] calculatePixels(double curloo, double nextloo, double curlat, double nextlat){
        double[] coordinates = new double[4];
        int width= 1024; // of the svg
        int height= 512;
        coordinates[0] = (curloo + 180) * width / 360;    // x1
        coordinates[1] = (nextloo + 180) * width / 360;   // x2
        coordinates[2] = (90 - curlat) * height / 180;    // y1
        coordinates[3] = (90 - nextlat) * height / 180;   // y2
        return coordinates;
    }

    /**Using the index to get the longitude and latitude at that index
     * @return double[] holds 2 values the longitude and latitude
     */
    private double[] latlong(ArrayList<Place> places, int index){
        double[] nextloolat = {0.0,0.0};
        if(index == places.size()-1) {
            nextloolat[0] = Double.parseDouble(places.get(0).longitude);
            nextloolat[1] = Double.parseDouble(places.get(0).latitude);
        }
        else {
            nextloolat[0] = Double.parseDouble(places.get(index+1).longitude);
            nextloolat[1] = Double.parseDouble(places.get(index+1).latitude);
        }
        return nextloolat;
    }

    /**Call functions to get the coordinates on the image and format a string of tag line
     * @return StringBuilder contains an origin line and a shifted line
     */
    private StringBuilder draw2Lines(double curloo, double nextloo, double curlat, double nextlat){
        // Subtract 360 to go different direction according to the Earth
        // Add 1024 to shift the points respects to the width of the svg
        double[] coordinates;
        StringBuilder paths = new StringBuilder();
        if(curloo > nextloo){ curloo -= 360; }
        else{ nextloo -= 360; }
        coordinates = calculatePixels(curloo,nextloo,curlat,nextlat);
        String line = draw1Line(curloo,nextloo,curlat,nextlat);                     //origin line
        String line2 = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
                + "stroke=\"black\" stroke-width=\"2\"/>",
            coordinates[0]+1024,coordinates[2],coordinates[1]+1024,coordinates[3]); //shifted line
        paths.append(line).append("\n");
        paths.append(line2).append("\n");
        return paths;
    }

    /**Call functions to get the coordinates on the image and format a string of tag line
     * @return String a line that connects two places together
     */
    private String draw1Line(double curloo, double nextloo, double curlat, double nextlat){
        double[] coordinates = calculatePixels(curloo,nextloo,curlat,nextlat);
        return String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
                + "stroke=\"black\" stroke-width=\"2\"/>",
            coordinates[0],coordinates[2],coordinates[1],coordinates[3]);
    }

    /** Call functions to convert coordinates to pixels using map's dimensions and
     * @return String SVG containing the background and the legs of the trip.
     */
    public String svg() {
        StringBuilder readMap = readRawMap();
        StringBuilder paths = new StringBuilder();
        String line;
        for(int i = 0; i < places.size(); i++){
            double curloo = Double.parseDouble(places.get(i).longitude);
            double curlat = Double.parseDouble(places.get(i).latitude);
            double nextloo = latlong(places,i)[0];
            double nextlat = latlong(places,i)[1];
            if(Math.abs(curloo - nextloo) > 180) { // Draw 2 lines
                paths = draw2Lines(curloo,nextloo,curlat,nextlat);
            }
            else{ // Draw 1 line
                line = draw1Line(curloo,nextloo,curlat,nextlat);
                paths.append(line).append("\n");
            }
        }
        readMap.insert(readMap.indexOf("</svg>"),paths.toString());
        return readMap.toString();
    }

    /** Attach the longitude and latitude of the place to the kml format
     * @return String kml format that can be use in other tools
     */
    public String kml(){
        String start = "<?xml version= \"1.0\" encoding = \"UTF-8\"?>\n"
            +"<kml xmlns=\"http://www.opengis.net/kml/2.2\"><Document>\n"
            +"<name>Paths</name> " +
            "<description>Examples of paths. Note that the tessellate tag is by default\n" +
            " set to 0. If you want to create tessellated lines, they must be authored\n" +
            " (or edited) directly in KML.</description>"+
            "<Style id=\"yellowLineGreenPoly\">\n <LineStyle>\n <color>7f00ffff</color>\n " +
            "<width>4</width>\n </LineStyle>\n PolyStyle>\n  <color>7f00ff00</color>\n" +
            " </PolyStyle>\n </Style> <Placemark>\n <name>Absolute Extruded</name>\n" +
            " <description>Transparent green wall with yellow outlines</description>"+
            " <styleUrl>#yellowLineGreenPoly</styleUrl>\n <LineString>\n <extrude>1</extrude>\n" +
            " <tessellate>1</tessellate>\n <altitudeMode>absolute</altitudeMode>\n <coordinates>";
        //-112.2550785337791,36.07954952145647,2357   single line
        String end = "</coordinates>\n" + " </LineString> </Placemark>\n" + " </Document> </kml> ";

        String middle = places.parallelStream().map( p ->
            String.format("%s,%s,7000",p.longitude, p.latitude)).
            collect(Collectors.joining("\n"));
        //System.out.print("SEE:"+start + " " + middle + " " + end);
        return start + " " + middle + " " + end;
    }
}
