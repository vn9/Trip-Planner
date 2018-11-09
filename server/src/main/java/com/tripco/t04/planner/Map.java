package com.tripco.t04.planner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class Map {
    public ArrayList<Place> places;
    public Map(ArrayList<Place> places){
        this.places = places;
    }

    private StringBuilder readRawMap(){
        /*Load the file that contains the raw of the Colorado map using Maven stream.
         *@param line temporarily each line of the file when it was read
         */
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

    /* Call functions to convert coordinates to pixels using map's dimensions and
     * @return an SVG containing the background and the legs of the trip.
     */
    public String svg() {
        StringBuilder readMap = readRawMap();
        StringBuilder paths = new StringBuilder();
        String line;
        double coordinates[];
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
                if(curloo > nextloo) {
                    curloo -= 360;
                }
                else{
                    nextloo -= 360;
                }
                coordinates = calculatePixels(curloo,nextloo,curlat,nextlat);
                x1 = coordinates[0];
                x2 = coordinates[1];
                y1 = coordinates[2];
                y2 = coordinates[3];
                modx1 = x1 + 1024;
                modx2 = x2 + 1024;
                line = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
                    + "stroke=\"black\" stroke-width=\"2\"/>",x1,y1,x2,y2);
                String line2 = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
                    + "stroke=\"black\" stroke-width=\"2\"/>",modx1,y1,modx2,y2);
                paths.append(line).append("\n");
                paths.append(line2).append("\n");
            }
            else{ // Draw 1 line
                coordinates = calculatePixels(curloo,nextloo,curlat,nextlat);
                x1 = coordinates[0];
                x2 = coordinates[1];
                y1 = coordinates[2];
                y2 = coordinates[3];
                line = String.format("<line  x1=\"%f\" y1=\"%f\" x2=\"%f\" y2=\"%f\" "
                    + "stroke=\"black\" stroke-width=\"2\"/>",x1,y1,x2,y2);
                paths.append(line).append("\n");
            }
        }
        StringBuilder newMap = readMap;
        newMap.insert(readMap.indexOf("</svg>"),paths.toString());
        return newMap.toString();
    }
}
