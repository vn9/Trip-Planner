package com.tripco.t04.planner;

import java.util.ArrayList;

public class NearestNeighbor extends Optimize{
    NearestNeighbor(ArrayList<Place> places, int[][] latice){
        super(places, latice);
    }

    private int neighbor ( int[] indices, int from){
        int min = Integer.MAX_VALUE;
        int j = -1;
        for (int i = from; i < places.size(); i++) {
            int distance = latice[indices[from - 1]][indices[i]];
            if (distance < min) {
                min = distance;
                j = i;
            }
        }
        if (j == -1) {
            j = 0;
        }
        return j; //returns index of nearest neighbor
    }

    @Override
    protected int optimizer(int[] candidate){
        int Total = 0;
        for (int i = 1; i < candidate.length; i++) {//for all start points
            int nearestIndex = neighbor(candidate, i);
            int dist = latice[candidate[i - 1]][candidate[nearestIndex]];
            Total += dist;
            swap(candidate, i, nearestIndex);
        }
        //System.out.println(bestTotal);
        Total = Total + latice[candidate[0]][candidate[candidate.length - 1]];
        return Total;
    }


    protected int iterate ( int[] candidate, int minDist, int[][] latice) {return 0;}
}
