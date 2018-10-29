package com.tripco.t04.server;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.List;

public class Config {

    private String type = "config";
    private short version = 4;
    private List<String> units = Arrays.asList("miles", "kilometers", "nautical miles", "user defined");
    private List<Optimization> optimization = Arrays.asList(new Optimization("none","The trip is not optimized."),
                                                            new Optimization("short","Nearest neighbor."),
                                                           new Optimization("shorter","2-opt."));
    private List<String> attributes = Arrays.asList("name", "id", "latitude", "longitude");

    static String getConfig() {
        Config conf = new Config();
        Gson gson = new Gson();
        return gson.toJson(conf);
    }


}
