package com.tripco.t04.server;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;


@RunWith(JUnit4.class)

public class TestDriver {

    Driver driver1;
    Driver driver2;
    List<Filter> filters1;
    List<Filter> filters2;
    String match1;
    String match2;

    @Before
    public void initialize() {

        Filter filter1 = new Filter("world_airports.type", Arrays.asList("heliport"));
        Filter filter2 = new Filter("continents.name", Arrays.asList("South America", "Europe"));
        filters1 = Arrays.asList(filter1, filter2);
//        filters.add(filter1);
//        filters.add(filter2);

        int limit = 5;
        int limit2 = 0;

        match1 = "Barcelona";
        match2 = "";

        driver1 = new Driver(match1, limit, filters1);
        driver2 = new Driver(match2, limit2, filters2);
    }

    @Test
    public void testLimitString() {

        String d1Limit = driver1.getLimitString(driver1.limit);
        String d2Limit = driver2.getLimitString(driver2.limit);

        assertEquals(d1Limit, "LIMIT 5");
        assertEquals(d2Limit," ");
        }

    @Test
    public void testFilterString() {

        String filterString = driver1.getFilterQueryString(driver1.filters);
        String filter2String = driver2.getFilterQueryString(driver2.filters);

        String actual1 = "world_airports.type IN (\"heliport\") AND continents.name IN (\"South America\", \"Europe\") ";

        assertEquals(filterString, actual1);
        assertEquals(filter2String, "");
    }

    @Test
    public void testMatchString() {

        String matchString = driver1.getMatchQueryString(driver1.match);
        String match2String = driver2.getMatchQueryString(driver2.match);

        String actual1 = " country.name LIKE '%Barcelona%' OR world_airports.municipality LIKE'%Barcelona%' " +
                "OR world_airports.name LIKE '%Barcelona%' OR world_airports.id LIKE '%Barcelona%' ";

        assertEquals(matchString, actual1);
        assertEquals(match2String, "");
    }

    @Test
    public void testQueryString() {

        String thisMatch = " country.name LIKE '%Barcelona%' OR world_airports.municipality LIKE'%Barcelona%' " +
                "OR world_airports.name LIKE '%Barcelona%' OR world_airports.id LIKE '%Barcelona%' ";
        String myFilters = "world_airports.type IN (\"heliport\") AND continents.name IN (\"South America\", \"Europe\") ";

        String query1 = driver1.getMyQueryString(thisMatch, myFilters);
        String query2 = driver1.getMyQueryString(thisMatch, "");
        String query3 = driver1.getMyQueryString("", myFilters);
        String query4 = driver1.getMyQueryString("", "");

        String actual1 = "WHERE ( country.name LIKE '%Barcelona%' OR world_airports.municipality LIKE'%Barcelona%' " +
                "OR world_airports.name LIKE '%Barcelona%' OR world_airports.id LIKE '%Barcelona%' ) " +
                "AND world_airports.type IN (\"heliport\") AND continents.name IN (\"South America\", \"Europe\") ";
        String actual2 = "WHERE  country.name LIKE '%Barcelona%' OR world_airports.municipality LIKE'%Barcelona%' " +
        "OR world_airports.name LIKE '%Barcelona%' OR world_airports.id LIKE '%Barcelona%'  ";

        String actual3 = "WHERE world_airports.type IN (\"heliport\") AND continents.name IN (\"South America\", \"Europe\") ";

        assertEquals(query1, actual1);
        assertEquals(query2, actual2);
        assertEquals(query3, actual3);
        assertEquals(query4, " ");
    }
}
