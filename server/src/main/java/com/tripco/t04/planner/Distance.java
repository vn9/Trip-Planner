package com.tripco.t04.planner;
import com.tripco.t04.planner.Place;

import java.lang.Math;

public class Distance {
    // The variables in this class should reflect TFFI.
    //Initialized to "distance" by request
    private String type;
    private int version;

    // Note that Place currently has an extra id element
    public Place origin;
    public Place destination;
    public String units;
    public String unitName;
    public Double unitRadius;

    //variable for calculation
    public Long distance;

    //create a specified constructor


    public Distance(Place origin, Place destination, String units, String unitName, Double unitRadius){

        this.origin = origin;
        this.destination = destination;
        this.units = units;
        this.unitName = unitName;
        this.unitRadius = unitRadius;
    }

    public void calculate() {
        this.distance = vincenty();
    }

    public Long vincenty(){
        double phi1 = Math.toRadians(Double.parseDouble(origin.latitude));
        double phi2 = Math.toRadians(Double.parseDouble(destination.latitude));
        double lambda1 = Math.toRadians(Double.parseDouble(origin.longitude));
        double lambda2 = Math.toRadians(Double.parseDouble(destination.longitude));
        double delta = Math.abs(lambda1-lambda2);
        double top = Math.pow(Math.cos(phi2)*Math.sin(delta),2) + Math.pow(Math.cos(phi1)*Math.sin(phi2)-Math.sin(phi1)*Math.cos(phi2)*Math.cos(delta),2);
        double bottom = Math.sin(phi1) * Math.sin (phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(delta);
        double angle = Math.atan2(Math.sqrt(top),bottom);

        if(units.equals("miles")) {
            distance = Math.round(angle * 3959);
        }
        else if(units.equals("kilometers")) {
            distance = Math.round(angle * 6371);
        }
        else if(units.equals("nautical miles")) {
            distance = Math.round(angle * 3440);
        }
        else if(units.equals("user defined")){
            distance = Math.round(angle * unitRadius.doubleValue());
        }
        return distance;
    }
}

