package com.tripco.t04.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t04.server.HTTP;
import spark.Request;

public class Find {

    private Search search;

    /** Handles trip planning request, creating a new trip object from the trip request.
     * Does the conversion from Json to a Java class before planning the trip.
     * @param request
     */
    public Find (Request request) {
        // first print the request
        System.out.println(HTTP.echoRequest(request));

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        // convert the body of the request to a Java class.
        Gson gson = new Gson();
        search = gson.fromJson(requestBody, Search.class);

        // plan the trip.
        search.getPlaces(); //TODO make sure this matches up with a function in search.java (generally a public void)

        // log something.
        System.out.println(search.limit);
    }

    /** Handles the response for a Trip object.
     * Does the conversion from a Java class to a Json string.*
     */
    public String getSearch () {
        Gson gson = new Gson();
        return gson.toJson(search);
    }
}
