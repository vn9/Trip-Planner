package com.tripco.t04.planner;

import com.google.gson.Gson;

import java.util.ArrayList;

//import database in this file to do the search and return a list of Place objects
//which conform to the requirements.

public class Search {

    public String version;
    public String type;
    public String match;
    public int limit;
    public ArrayList<Place> places;

    public  Search(String version, String type,
                   String match, int limit, ArrayList<Place> places){

        this.version = version;
        this.type = type;
        this.match = match;
        this.limit = limit;
        this.places = places;

    }

    //This method return an ArrayList of place which contain those places conform to the requirements
    public String getPlaces () {
        Gson gson = new Gson();
        return gson.toJson(places);
    }

}
