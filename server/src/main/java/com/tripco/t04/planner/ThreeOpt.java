package com.tripco.t04.planner;

import java.util.ArrayList;

public class ThreeOpt extends Optimize {

    ThreeOpt(ArrayList<Place> places, long[][] latice){
        super(places, latice);
    }

    /*
    This method fetch a certain part of elements in a list with the order same as the original list
     */
    private int[] fetcher(int startIndex, int endIndex, int[] candidate){
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
    private void reorder(int startIndex, int endIndex, int[] newChunk, int[] candidate){
        int index = 0;
        for (int k = startIndex; k <= endIndex; k++) {
            candidate[k] = newChunk[index];
            index++;
        }
    }

    /*
    This method combine two index chunks into one
     */
    private int[] combiner(int[] smallChunkOne, int[] smallChunkTwo){
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
    private void reverser(int[] candidate){
        for (int i = 0; i < candidate.length / 2; i++) {
            int temp = candidate[i];
            candidate[i] = candidate[candidate.length - i - 1];
            candidate[candidate.length - i - 1] = temp;
        }
    }

    private void optCaseStore(long[] optCase, long[][] latice, int[] candidate, int a1, int a2, int b1, int b2, int c1, int c2){
        optCase[0] = -latice[a1][a2] - latice[c1][c2] + latice[a1][c1] + latice[a2][c2];
        optCase[1] = -latice[a1][a2] - latice[b1][b2] + latice[a1][b1] + latice[a2][b2];
        optCase[2] = -latice[b1][b2] - latice[c1][c2] + latice[b1][c1] + latice[b2][c2];
        optCase[3] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][b1] + latice[a2][c1] + latice[b2][c2];
        optCase[4] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][c1] + latice[b2][a2] + latice[b1][c2];
        optCase[5] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][b2] + latice[c1][b1] + latice[a2][c2];
        optCase[6] = -latice[a1][a2] - latice[b1][b2] - latice[c1][c2] + latice[a1][b2] + latice[c1][a2] + latice[b1][c2];
    }

    private long checkTwoOptCase(long[] optCase, int[] candidate, long minDist, int[] ijk){
        long min = minDist;
        if (optCase[0] < 0) {
            optReverse(candidate, ijk[0] + 1, ijk[2]);
            min += optCase[0];
            return min;
        }
        if (optCase[1] < 0) {
            optReverse(candidate, ijk[0] + 1, ijk[1]);
            min += optCase[1];
            return min;
        }
        if (optCase[2] < 0) {
            optReverse(candidate, ijk[1] + 1, ijk[2]);
            min += optCase[2];
            return min;
        }
        return min;
    }

    protected long iterate(int[] candidate, long minDist, long[][] latice){

        int lengthOfCandidate = candidate.length;

        for (int i = 0; i < lengthOfCandidate - 2; i++) {
            for (int j = i + 1; j < lengthOfCandidate - 1; j++) {
                for (int k = j + 1; k < lengthOfCandidate; k++) {
                    int a1 = candidate[i];
                    int a2 = candidate[i + 1];
                    int b1 = candidate[j];
                    int b2 = candidate[j + 1];
                    int c1 = candidate[k];
                    int c2;
                    //special case when meet end because of round trip
                    if (k == lengthOfCandidate - 1) {
                        c2 = candidate[0];
                    }
                    else {
                        c2 = candidate[k + 1];
                    }

                    //create and initialize the optCase
                    long[] optCase = new long[7];
                    optCaseStore(optCase,latice,candidate,a1,a2,b1,b2,c1,c2);

                    //check each case, do the optimize if distance is shorter
                    if (optCase[3] < 0) {
                        optReverse(candidate, i + 1, j);
                        optReverse(candidate, j + 1, k);
                        minDist += optCase[3];
                        continue;
                    }
                    if (optCase[4] < 0) {
                        int[] temp = fetcher(i + 1, j, candidate);
                        int[] temp1 = fetcher(j + 1, k, candidate);
                        reverser(temp1);
                        int[] temp2 = combiner(temp1, temp);
                        reorder(i + 1, k, temp2, candidate);
                        minDist += optCase[4];
                        continue;
                    }
                    if (optCase[5] < 0) {
                        int[] temp = fetcher(i + 1, j, candidate);
                        reverser(temp);
                        int[] temp2 = fetcher(j + 1, k, candidate);
                        int[] temp3 = combiner(temp2, temp);
                        reorder(i + 1, k, temp3, candidate);
                        minDist += optCase[5];
                        continue;
                    }
                    if (optCase[6] < 0) {
                        int[] temp = fetcher(i + 1, j, candidate);
                        int[] temp2 = fetcher(j + 1, k, candidate);
                        int[] temp3 = combiner(temp2, temp);
                        reorder(i + 1, k, temp3, candidate);
                        minDist += optCase[6];
                        continue;
                    }
                    int[] ijk = new int[]{i,j,k};
                    minDist = checkTwoOptCase(optCase,candidate,minDist,ijk);
                }
            }
        }
        return minDist;
    }
}
