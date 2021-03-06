package com.tripco.t04.server;

import com.tripco.t04.planner.Place;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/** This class connect to the database and find those data which conform to the match string.
 *
 */

public class Driver {
    // db configuration information
    public final static String myDriver = "com.mysql.jdbc.Driver";
    //
    public static String myUrl = "jdbc:mysql:"
        + "//localhost:5655/cs314?useUnicode=true&characterEncoding=utf-8";
    public final static String user = "cs314-db";
    public final static String pass = "eiK5liet1uej";
    // fill in SQL queries to count the number of records and to retrieve the data
    public static String count = "";
    public static String search = "";
    public String match;
    public int limit;
    public static int found;
    public List<Filter> filters;
    public static ArrayList<Place> places = new ArrayList<>();

    public Driver(String match, int limit, List<Filter> filters) {
        this.match = match;
        this.limit = limit;
        this.filters = filters;
    }

    /**
     * The method accesses to the database.
     */

    public String getFilterQueryString(List<Filter> filters){
        String myFilters = "";
        if (filters == null){
            return(myFilters);
        }
        if (filters.size() == 0){
            return(myFilters);
        }
        for (int i = 0; i < filters.size(); i++) {
            Filter filter = filters.get(i);
            String filterString = "";
            filterString += filter.name + " IN (";
            for (int j = 0; j < filter.values.size(); j++) {
                filterString += "\"" + filter.values.get(j) + "\", ";
            }
            filterString = filterString.substring(0, filterString.length() - 2) + ")";
            myFilters += filterString + " AND ";
        }
        myFilters = myFilters.substring(0, myFilters.length() - 4);
        //System.out.print(myFilters);

        return(myFilters);
    }

    public String getLimitString(int limit){
        String myLimit;
        if(limit == 0) {
            myLimit = " ";
        } else {
            myLimit = "LIMIT " + limit;
        }
        return(myLimit);
    }

    public String getMatchQueryString(String match) {
        String myMatch = "";
        if (match.equals("")) {
            return (myMatch);
        } else { myMatch = " country.name LIKE '%" + match + "%' "
                + "OR world_airports.municipality LIKE '%" + match
                + "%' OR world_airports.name LIKE '%" + match + "%' "
                + "OR continents.name LIKE '%" + match
                + "%' " + "OR region.name LIKE '%" + match
                + "%' OR world_airports.type LIKE '%" + match
                + "%' OR world_airports.id LIKE '%" + match + "%' ";
            return (myMatch);
        }
    }

    public String getMyQueryString(String match, String filters){
        String myQuery = "";

        if (match.equals("") && !filters.equals("")){
            myQuery = "WHERE " + filters;
        } else if (!match.equals("") && filters.equals("")){
            myQuery = "WHERE " + match + " ";
        } else if (filters.equals("") && match.equals("")){
            myQuery = " ";
        } else {
            myQuery = "WHERE (" + match + ") AND " + filters;
        }
        return(myQuery);
    }

    public void find(String match, List<Filter> filters, int limit) {
        //count the number of records in the table
        String myMatch = getMatchQueryString(match);
        String myFilters = getFilterQueryString(filters);
        String myLimit = getLimitString(limit);
        String myQuery = getMyQueryString(myMatch, myFilters);

        count = "SELECT count(*) FROM world_airports";
        search = "SELECT world_airports.id, world_airports.name, world_airports.municipality, "
                + "world_airports.latitude, world_airports.longitude, country.name, "
                + "continents.name, world_airports.type, region.name FROM continents "
                + "INNER JOIN country ON continents.id = country.continent "
                + "INNER JOIN region ON country.id = region.iso_country "
                + "INNER JOIN world_airports ON region.id = world_airports.iso_region "
                + myQuery
                + " ORDER BY continents.name, country.name, region.name, world_airports.name ASC ";

        /** Note that if the variable isn't defined, System.getenv will return null.
         *  When test on own computer, make sure set up "export CS314_ENV=development"
         *  in .bash_profile for Mac or .bashrc for linux.
         *  Then make sure the ssh -L 5655:faure:3306 -N <username>@<cs-machine> be the same port here (5655)
         */
        String isDevelopment = System.getenv("CS314_ENV");
        //System.out.printf("%s",isDevelopment);
        if(isDevelopment == null ) {
            //user is on the campus wired network (deploy)
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        }
        try { Class.forName(myDriver);
            // connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stCount = conn.createStatement();
                 Statement stQuery = conn.createStatement();
                 ResultSet rsCount = stCount.executeQuery(count);
                 ResultSet rsQuery = stQuery.executeQuery(search)
            ) { printJson(rsCount, rsQuery, match);
            }
        } catch (Exception e) { System.err.println("Exception: " + e.getMessage()); }
    }

    /**
     * This method will print the Json created on the terminal or console to log.
     * Those places which matched will be added into places ArrayList.
     */
    private int myLimit(){
        if (limit == 0){
            int aLimit = found;
            return(aLimit);
        } else{
            return(limit);
        }
    }

    private void printJson(ResultSet count, ResultSet query, String match)
            throws SQLException {
        places.clear();
        //filters.clear();
        count.next();
        int results = count.getInt(1);
        // iterate through query results and print out the airport codes
        //System.out.println(results);
        if(query.last()){
            found = query.getRow();
            query.beforeFirst();
        }
        int index = 0;
        int myLimit = myLimit();
        while (query.next()  && index < myLimit) {
            final Place place = new Place(query.getString("id"),
                    query.getString("name"),
                    query.getString("latitude"),
                    query.getString("longitude"),
                    query.getString("world_airports.municipality"),
                    query.getString("country.name"),
                    query.getString("continents.name"));
            places.add(place); //add the printed place into places ArrayList
            index++;
        }
        //found = places.size();

    }

}
