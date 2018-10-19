package com.tripco.t04.server;

import com.tripco.t04.planner.Place;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/** This class connect to the database and find those data which conform to the match string.
 *
 */
public class Driver {
    // db configuration information
    private final static String myDriver = "com.mysql.jdbc.Driver";
    //
    private static String myUrl = "jdbc:mysql://localhost:5655/cs314?useUnicode=true&characterEncoding=utf-8";
    private final static String user = "cs314-db";
    private final static String pass = "eiK5liet1uej";
    // fill in SQL queries to count the number of records and to retrieve the data
    private static String count = "";
    private static String search = "";
    public static ArrayList<Place> places = new ArrayList<>();

    /**
     * The method accesses to the database.
     *
     */
    public  void find(String match) {
        //count the number of records in the table
        count = "select count(*) from airports";
        search = "select id,name,municipality,latitude,longitude from airports where name like '%" 
            + match + "%' or municipality like '%" + match + "%' order by name";
        /** Note that if the variable isn't defined, System.getenv will return null.
         *  When test on own computer, make sure set up "export CS314_ENV=development".
         *  Then make sure the ssh -L 5655:faure:3306 -N <username>@<cs-machine> be the same port here (5655)
         */
        String isDevelopment = System.getenv("CS314_ENV");
        System.out.printf("%s",isDevelopment);
        if(isDevelopment == null ) {
            //user is on the campus wired network (deploy)
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        }

        try {
            Class.forName(myDriver);
            // connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stCount = conn.createStatement();
                 Statement stQuery = conn.createStatement();
                 ResultSet rsCount = stCount.executeQuery(count);
                 ResultSet rsQuery = stQuery.executeQuery(search)
            ) {
                printJson(rsCount, rsQuery, match);
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }

    /**
     * This method will print the Json created on the terminal or console to log.
     * Those places which matched will be added into places ArrayList.
     */
    private void printJson(ResultSet count, ResultSet query, String match)
            throws SQLException {
        System.out.printf("\n{\n");
        System.out.printf("\"type\": \"find\",\n");
        System.out.printf("\"title\": \"%s\",\n", match);
        System.out.printf("\"places\": [\n");
        // determine the number of results that match the query
        count.next();
        int results = count.getInt(1);
        // iterate through query results and print out the airport codes
        while (query.next()) {
            final Place place = new Place(query.getString("id"),
                    query.getString("name"),
                    query.getString("latitude"),
                    query.getString("longitude"));
            System.out.printf(" {\"id\":\"%s\", ", query.getString("id"));
            System.out.printf("\"name\":\"%s\", ", query.getString("name"));
            System.out.printf("\"latitude\":\"%s\", ", query.getString("latitude"));
            System.out.printf("\"longitude\":\"%s\"}", query.getString("longitude"));
            if (--results == 0)  //All stuffs are printed. Adding a new break line and exit
            {System.out.printf("\n");}
            else
            {System.out.printf(",\n");} //continue print
            places.add(place); //add the printed place into places ArrayList
        }
        System.out.printf(" ]\n}\n");
    }

}
