package com.tripco.t04.planner;

import com.google.gson.Gson;
import java.util.ArrayList;

/**
 * This class imports the database here and search for places which conform the requirements.
 * It returns an ArrayList of places
 */
public class Search {

    public Integer version;
    public String type;
    public String match;
    public int limit;
    public ArrayList<Place> places;

    public  Search(Integer version, String type,
                   String match, int limit, ArrayList<Place> places){

        this.version = version;
        this.type = type;
        this.match = match;
        this.limit = limit;
        this.places = places;

    }

    //This method return an ArrayList of place which contain those places conform to the requirements
    /** Handles the response for an ArrayList of places object.
     * Does the conversion from a Java class to a Json string.*
     */
    public String getPlaces () {
        Gson gson = new Gson();
        return gson.toJson(places);
    }

}
