package com.tripco.t04.server;
import com.tripco.t04.planner.Place;

import java.lang.Math;

public class Distance {
    // The variables in this class should reflect TFFI.
    //Initialized to "distance" by request
    private String type;
    private int version;

    // Note that Place currently has an extra id element
    private Place origin;
    private Place destination;
    public String units;

    //variable for calculation
    public int distance;

    public int vincenty(){
        double phi1 = Math.toRadians(Double.parseDouble(origin.latitude));
        double phi2 = Math.toRadians(Double.parseDouble(destination.latitude));
        double lambda1 = Math.toRadians(Double.parseDouble(origin.longitude));
        double lambda2 = Math.toRadians(Double.parseDouble(destination.longitude));
        double delta = Math.abs(lambda1-lambda2);
        double top = Math.pow(Math.cos(phi2)*Math.sin(delta),2) + Math.pow(Math.cos(phi1)*Math.sin(phi2)-Math.sin(phi1)*Math.cos(phi2)*Math.cos(delta),2);
        top = Math.sqrt(top);
        double bottom = Math.sin(phi1) * Math.sin (phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(delta);
        double angle = Math.atan2(top,bottom);
        //angle = Math.toRadians(angle);
        if(units.equals("miles")) {
            float hold = (float)angle * 3959;
            distance = Math.round(hold);
        }
        else if(units.equals("kilometers")) {
            float hold = (float)angle * 6371;
            distance = Math.round(hold);
        }
        else if(units.equals("nautical miles")) {
            float hold = (float)angle * 3440;
            distance = Math.round(hold);
        }
        return distance;
    }
}

