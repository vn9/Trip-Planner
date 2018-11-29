package com.tripco.t04.planner;

import java.util.ArrayList;

public class ThreeOpt extends Optimize{
    ThreeOpt(ArrayList<Place> places, int[][] latice){
        super(places, latice);
    }

    protected int optimizer(int[] candidate){
        int lastDist = Integer.MAX_VALUE;
        //runs 1opt. -> best = nn(0) in picture from Dave's office
        Optimize oneOpt = new NearestNeighbor(places, latice);
        int minDist = oneOpt.optimizer(candidate);
        while (lastDist != minDist) {
            //After running 1-opt for some certain start points, keep improving until we can't anymore
            lastDist = minDist;
            //Iterate through the candidate and returns the minimum total distance
            //minDist = iterate(candidate, minDist, latice);
        }
        return minDist;
    }
}
