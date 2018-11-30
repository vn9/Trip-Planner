package com.tripco.t04.planner;

import java.util.ArrayList;

public class ThreeOpt extends Optimize {

    ThreeOpt(ArrayList<Place> places, int[][] latice) {
        super(places, latice);
    }

    /*
    This method fetch a certain part of elements in a list with the order same as the original list
     */
    private int[] Fetcher(int startIndex, int endIndex, int[] candidate) {
        int[] newChunk = new int[endIndex - startIndex + 1];
        int index = 0;
        for (int k = startIndex; k <= endIndex; k++) {
            newChunk[index] = candidate[k];
            index++;
        }
        return newChunk;
    }

    /*
        This method replaces part of elements in one list with another smaller list
         */
    private void Reorder(int startIndex, int endIndex, int[] newChunk, int[] candidate) {
        int index = 0;
        for (int k = startIndex; k <= endIndex; k++) {
            candidate[k] = newChunk[index];
            index++;
        }
    }

    /*
    This method combine two index chunks into one
     */
    private int[] Combiner(int[] smallChunkOne, int[] smallChunkTwo) {
        int[] newBiggerChunk = new int[smallChunkOne.length + smallChunkTwo.length];
        for (int i = 0; i < smallChunkOne.length; i++) {
            newBiggerChunk[i] = smallChunkOne[i];
        }
        int index = 0;
        for (int j = smallChunkOne.length; j < newBiggerChunk.length; j++) {
            newBiggerChunk[j] = smallChunkTwo[index];
            index++;
        }
        return newBiggerChunk;
    }

    /*
    This method reverse position of the first half elements and the last half elements one by one
    */
    private void Reverser(int[] candidate) {
        for (int i = 0; i < candidate.length / 2; i++) {
            int temp = candidate[i];
            candidate[i] = candidate[candidate.length - i - 1];
            candidate[candidate.length - i - 1] = temp;
        }
    }


    protected int iterate(int[] candidate, int minDist, int[][] latice) {

        int lengthOfCandidate = candidate.length;

        for (int i = 0; i < lengthOfCandidate - 2; i++) {
            for (int j = i + 1; j < lengthOfCandidate - 1; j++) {
                for (int k = j + 1; k < lengthOfCandidate; k++) {

                    int a1, a2, b1, b2, c1, c2;
                    a1 = candidate[i];
                    a2 = candidate[i + 1];
                    b1 = candidate[j];
                    b2 = candidate[j + 1];
                    c1 = candidate[k];

                    //special case when meet end because of round trip
                    if (k == lengthOfCandidate - 1)
                        c2 = candidate[0];
                    else
                        c2 = candidate[k + 1];

                    int[] optCase = new int[7];
                    //case 1 to 7
                    optCase[0] = -latice[a1][a2] - latice[c1][c2] + latice[a1][c1] + latice[a2][c2];
                    optCase[1] = -latice[a1][a2] - latice[b1][b2] + latice[a1][b1] + latice[a2][b2];
                    optCase[2] = -latice[b1][b2] - latice[c1][c2] + latice[b1][c1] + latice[b2][c2];
                    optCase[3] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][b1] + latice[a2][c1] + latice[b2][c2];
                    optCase[4] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][c1] + latice[b2][a2] + latice[b1][c2];
                    optCase[5] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][b2] + latice[c1][b1] + latice[a2][c2];
                    optCase[6] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][b2] + latice[c1][a2] + latice[b1][c2];
                    //check each case and do the optimize(deduction) if distance is shorter(negative)
                    if (optCase[3] < 0) {
                        optReverse(candidate, i + 1, j);
                        optReverse(candidate, j + 1, k);
                        minDist += optCase[3];
                        continue;
                    }
                    if (optCase[4] < 0) {
                        int[] temp = Fetcher(i + 1, j, candidate);
                        int[] temp1 = Fetcher(j + 1, k, candidate);
                        Reverser(temp1);
                        int[] temp2 = Combiner(temp1, temp);
                        Reorder(i + 1, k, temp2, candidate);
                        minDist += optCase[4];
                        continue;
                    }
                    if (optCase[5] < 0) {
                        int[] temp = Fetcher(i + 1, j, candidate);
                        Reverser(temp);
                        int[] temp2 = Fetcher(j + 1, k, candidate);
                        int[] temp3 = Combiner(temp2, temp);
                        Reorder(i + 1, k, temp3, candidate);
                        minDist += optCase[5];
                        continue;
                    }
                    if (optCase[6] < 0) {
                        int[] temp = Fetcher(i + 1, j, candidate);
                        int[] temp2 = Fetcher(j + 1, k, candidate);
                        int[] temp3 = Combiner(temp2, temp);
                        Reorder(i + 1, k, temp3, candidate);
                        minDist += optCase[5];
                        continue;
                    }
                    if (optCase[0] < 0) {
                        optReverse(candidate, i + 1, k);
                        minDist += optCase[0];
                        continue;
                    }
                    if (optCase[1] < 0) {
                        optReverse(candidate, i + 1, j);
                        minDist += optCase[1];
                        continue;
                    }
                    if (optCase[2] < 0) {
                        optReverse(candidate, j + 1, k);
                        minDist += optCase[2];
                    }
                }
            }
        }
        return minDist;
    }
}
