package com.tripco.t04.planner;
import java.util.ArrayList;

public abstract class Optimize {
    protected ArrayList<Place> places;
    Long[][] latice;

    Optimize(ArrayList<Place> places, Long[][] latice)
    {
        this.places = places;
        this. latice = latice;
    }

    protected void swap ( int[] arr, int firstIndex, int secondIndex){
        int firstValue = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = firstValue;
    }

    private void cleanUp ( int[] route, int start){ // Set the array to the new starting point
        for (int i = 0; i < route.length; i++) {
            route[i] = i;
        }
        swap(route, 0, start);
    }

    public ArrayList<Place> begin(){
        int[] best = new int[places.size()]; //array of indices that are the "best" route
        Long minTotal = Long.MAX_VALUE; //total distance for the best array
        //int[][] latice = distanceLatice(); //matrix of all the distances
        int[] candidate = new int[best.length];
        //System.out.println(Arrays.toString(latice));
        for (int newStart = 0; newStart < places.size(); newStart++) {
            cleanUp(candidate, newStart);
            Long contender = optimizer(candidate);
            if (contender < minTotal) {
                minTotal = contender;
                int[] temp = candidate;
                candidate = best;
                best = temp;
            }
        }
        ArrayList<Place> nearestNei = new ArrayList<>(best.length);
        for (int index : best) {
            nearestNei.add(places.get(index));
        }
        return nearestNei;
    }

    abstract Long optimizer(int[] candidate);
}
