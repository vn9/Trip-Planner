package com.tripco.t04.planner;
import com.tripco.t04.server.Driver;

import java.util.ArrayList;

/**
 * This class imports the database here and search for places which conform the requirements.
 * It returns an ArrayList of places.
 */
public class Search {

    public Integer version;
    public String type;
    public String match;
    public int limit;
    public ArrayList<Place> places;

    public Search(){
        this.version = 3;
        this.type = "Search";
        this.match = "";
        this.limit = 0;  //default unlimited
        this.places = new ArrayList<>();
    }

    public  Search(Integer version, String type,
                   String match, int limit, ArrayList<Place> places){

        this.version = version;
        this.type = type;
        this.match = match;
        this.limit = limit;
        this.places = places;

    }

    /** Handles the response for an ArrayList of places object.
     * Does the conversion from a Java class to a Json string.
     */
    void getPlaces () {
        Driver myDriver = new Driver();
        myDriver.find(this.match);
        this.places = Driver.places;
    }

}
