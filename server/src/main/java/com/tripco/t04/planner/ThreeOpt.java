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

    /*
    This method fetch a certain part of elements in a list with the order same as the original list
     */
    protected int[] Fetcher(int startIndex, int endIndex, int[] candidate) {
        int[] newChunk = new int[endIndex - startIndex +1];
        int index =0;
        for(int k = startIndex; k <= endIndex; k++) {
            newChunk[index]= candidate[k];
            index++;
        }
        return newChunk;
    }

    /*
        This method replaces part of elements in one list with another smaller list
         */
    protected void Reorder(int startIndex, int endIndex, int[] newChunk, int[] candidate) {
        int index=0;
        for(int k = startIndex; k <= endIndex; k++) {
            candidate[k]= newChunk[index];
            index++;
        }
    }

    /*
    This method combine two index chunks into one
     */
    protected int[] Combiner(int[] smallChunkOne, int[] smallChunkTwo) {
        int[] newBiggerChunk = new int[smallChunkOne.length+ smallChunkTwo.length];
        for(int i = 0; i< smallChunkOne.length; i++){
            newBiggerChunk[i]= smallChunkOne[i];
        }
        int index =0;
        for(int j = smallChunkOne.length; j< newBiggerChunk.length; j++) {
            newBiggerChunk[j]= smallChunkTwo[index];
            index++;
        }
        return newBiggerChunk;
    }

    /*
    This method reverse position of the first half elements and the last half elements one by one
    */
    protected void Reverser(int[] candidate) {
        for(int i = 0; i < candidate.length / 2; i++) {
            int temp = candidate[i];
            candidate[i] = candidate[candidate.length - i - 1];
            candidate[candidate.length - i - 1] = temp;
        }
    }



}
