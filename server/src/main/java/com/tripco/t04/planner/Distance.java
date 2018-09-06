package com.tripco.t04.planner;
import java.lang.Math;

public class Distance {
    // The variables in this class should reflect TFFI.
    //Initialized to "distance" by request
    private String type;
    private int version;

    // Note that Place currently has an extra id element
    private Place origin;
    private Place destination;
    private String units;

    //variable for calculation
    public int distance;

    private int vincenty(){
        double phi1 = Double.parseDouble(origin.latitude);
        double phi2 = Double.parseDouble(destination.latitude);
        double lambda1 = Double.parseDouble(origin.latitude);
        double lambda2 = Double.parseDouble(destination.latitude);
        double delta = Math.abs(lambda1-lambda2);
        double top = Math.pow(Math.cos(phi2)*Math.sin(delta),2) + Math.pow(Math.cos(phi1)*Math.sin(phi2)-Math.sin(phi1)*Math.cos(phi2)*Math.cos(delta),2);
        top = Math.sqrt(top);
        double bottom = Math.sin(phi1) * Math.sin (phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(delta);
        distance = (int)Math.atan(top/bottom);
        distance = distance * 3959;
        return distance;
    }
}

