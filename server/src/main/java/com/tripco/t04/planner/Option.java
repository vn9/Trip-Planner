package com.tripco.t04.planner;

/**
 * Describes the options to apply when planning a trip in TFFI format.
 * At this point we are only using the values provided.
 */
public class Option {

  public String distance;
  public String optimization;
  public String units;
  public String unitName;
  public Double unitRadius;
  public String map;

  public Option(String optimization, String units, String unitName, Double unitRadius, String map){
    this.optimization = optimization;
    this.units = units;
    this.unitName = unitName;
    this.unitRadius = unitRadius;
    this.map = map;
  }

}
