package com.tripco.t04.planner;

import java.util.ArrayList;

public class TwoOpt extends Optimize {
    TwoOpt(ArrayList<Place> places, int[][] latice) {
        super(places, latice);
    }

    private int swapAttempt(int[] candidate, int index1, int index2, int[][] latice) {
        int c1 = candidate[index1 - 1]; // c1
        int c2 = candidate[index1]; // c2
        int c3 = candidate[index2]; // c3
        int c4 = candidate[(index2 + 1) % candidate.length]; // c4

        int candDist = latice[c1][c2] + latice[c3][c4];
        int newDist = latice[c1][c3] + latice[c2][c4];
        if (candDist > newDist) {
            //if candDist is greater than newDist, there is a cross.
            // Draw a picture if you don't understand this line. Really useful
            optReverse(candidate, index1, index2); //reveres them
            return candDist - newDist;
        } else {
            return 0;
        }
    }

    protected int iterate(int[] candidate, int minDist, int[][] latice) {
        for (int i = 1; i < candidate.length - 1; i++) {
            for (int j = i + 1; j < candidate.length; j++) {
                //nested for loop in the psuedo code given from Dave.
                // if there is a swap, check if we are allowed to swap
                minDist -= swapAttempt(candidate, i, j, latice);
            }
        }
        return minDist;
    }

}
