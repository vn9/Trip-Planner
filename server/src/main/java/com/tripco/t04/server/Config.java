package com.tripco.t04.server;

import com.google.gson.Gson;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class Config {

    private String type = "config";
    private short version = 4;
    private List<String> units;
    private List<Optimization> optimization;
    private List<String> attributes;
    private List<Filter> filters;
    private List<String> maps ;

    public Config() {

        this.units = Arrays.asList("miles", "kilometers", "nautical miles", "user defined");

        Optimization opt1 = new Optimization("none","The trip is not optimized.");
        Optimization opt2 = new Optimization("short","Nearest neighbor.");
        Optimization opt3 = new Optimization("shorter","2-opt.");
        this.optimization = Arrays.asList(opt1, opt2, opt3);

        this.attributes = Arrays.asList("id", "name", "latitude", "longitude", "municipality", "country", "continent");

        Filter filter1 = new Filter("world_airports.type", Arrays.asList("balloonport", "heliport", "small_airport",
                "medium_airport", "large_airport", "seaplane_base"));
        Filter filter2 = new Filter("continents.name", Arrays.asList("North America", "South America", "Africa",
                "Asia", "Oceania", "Europe", "Antarctica"));
        this.filters = Arrays.asList(filter1, filter2);

        this.maps = Arrays.asList("svg", "kml");
    }

    static String getConfig() {
        Config conf = new Config();
        Gson gson = new Gson();
        return gson.toJson(conf);
    }


}
