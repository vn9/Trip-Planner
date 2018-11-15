package com.tripco.t04.planner;

/**
 * Describes the places to visit in a trip in TFFI format.
 * There may be other attributes of a place, but these are required to plan a trip.
 */
public class Place {
  public String id;
  public String name;
  public String latitude;
  public String longitude;
  public String municipality;
  public String country;
  public String continent;

  public Place(String id, String name, String latitude, String longitude, String municipality, String country, String continent) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.municipality = municipality;
    this.country = country;
    this.continent = continent;
  }
}


