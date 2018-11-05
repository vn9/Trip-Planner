package com.tripco.t04.planner;
import com.tripco.t04.server.Driver;
import com.tripco.t04.server.Filter;

import java.util.List;
import java.util.ArrayList;

/**
 * This class imports the database here and search for places which conform the requirements.
 * It returns an ArrayList of places.
 */
public class Search {

    public Integer version;
    public String type;
    public String match;
    public List<Filter> filters;
    public int limit;
    public Integer found;
    public List<Place> places;

    public Search(){
        this.version = 4;
        this.type = "Search";
        this.match = "";
        this.filters = new ArrayList<Filter>();
        this.limit = 0;  //default unlimited
        this.found = null;
        this.places = new ArrayList<Place>();
    }

    public Search(Integer version, String type,
                   String match, List<Filter> filters, int limit, Integer found, List<Place> places){

        this.version = version;
        this.type = type;
        this.match = match;
        this.filters = filters;
        this.limit = limit;
        this.found = found;
        this.places = places;

    }

    /** Handles the response for an ArrayList of places object.
     * Does the conversion from a Java class to a Json string.
     */

    public void getPlaces () {
        Driver myDriver = new Driver();
        myDriver.find(this.match, this.filters, this.limit);
        this.places = Driver.places;
        this.found = Driver.places.size();
    }

}
