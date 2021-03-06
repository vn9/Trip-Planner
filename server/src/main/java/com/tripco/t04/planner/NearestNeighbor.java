package com.tripco.t04.planner;

import java.util.ArrayList;


public class NearestNeighbor extends Optimize {
    NearestNeighbor(ArrayList<Place> places, long[][] latice) {
        super(places, latice);
    }

    private int neighbor(int[] indices, int from) {
        long min = Long.MAX_VALUE;

        int j = -1;
        for (int i = from; i < places.size(); i++) {
            Long distance = latice[indices[from - 1]][indices[i]];
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
    protected long optimizer(int[] candidate) {
        long total = (long)0;
        for (int i = 1; i < candidate.length; i++) {//for all start points
            int nearestIndex = neighbor(candidate, i);
            Long dist = latice[candidate[i - 1]][candidate[nearestIndex]];
            total += dist;
            swap(candidate, i, nearestIndex);
        }
        //System.out.println(bestTotal);
        total = total + latice[candidate[0]][candidate[candidate.length - 1]];
        return total;
    }


    protected long iterate(int[] candidate, long minDist, long[][] latice) {
        return 0;
    }
}
