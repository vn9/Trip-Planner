# Sprint 2 - *04* - *Rush Hour*

## Goal
The goal of this sprint is to have an application that calculates the distances between locations on a multi-location-round trip, displays the trip on a map, and is viewable from any device.  

### A mobile, responsive map and itinerary!
### Sprint Leader: *Kira Deming*

## Definition of Done

* Leg distances are calculated correctly for all units
* Distance array is returned
* Map shows line of trip
* Sprint Review and Restrospectives completed (sprint2.md).
* Version in pom.xml should be `<version>2.0.0</version>`.
* Increment deployed for demo and testing.
* Increment release `v2.0` created on GitHub with appropriate version number and name.


## Policies
* Clean code should be written
* Two approving reviews, the second approving review merges
* Test your code, twice 
* Ask for help, early and often

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order.
* Unit tests are fully automated.
#### Configuration Management
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

In this sprint we expect to complete all code related to the calculations for the distances between locations given in a multi-location-round trip, the display of a trip map, and change server port.

* *#122 I want a map and itinerary for my trip: App supports new TFFI trip object, calculates distance for roundtrip, and shows a map that can be viewed on mobile.*
* *#123: I want to supply my own units for the distances: App supports any units defined by the user for distance calculations.*
* *#125: TripCo: The solution must be responsive for mobile devices: App is designed for mobile environment and still looks good on desktop.*
* *#126:TripCo: All clients and servers must interporate: Client must include a configuration option to change to a different server:port.*

*For this sprint we decided that the first order of business is to make sure that the new units are fully supported.  If we cannot create a trip itinerary then it cannot be drawn on a map.  The second priority is the map and that it scales properly on all devices.  The third and final goal, besides having clean code as a standard, is to make sure that we have a configuration option to change the server port so that anyone can run on our server. We decided to start with the backend because if that doesn't work then we don't have anything for the UI to do.*


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *0* |
| Tasks |  *7*   | *1* | 
| Story Points |  *10*  | *1* | 

*Enter the `# Planned` at the beginning of the sprint, `# Completed` at the end of the sprint.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *9/14/2018* | *Nones* | *#129, #130, #132* | *Dependencies need to be completed before other important code and tasks can be started* | 
| *9/17/2018* | *#129* | *#130, #131, #132, #133, #135 | *Dependencies still need to be finished and making sure that we all know the direction we are going is the correct one. This should be cleared up with TA hours.*|
| *9/19/2018* | *#129* | *#130, #131, #132, #133, #135 | *Decent progress was made however a bug was pushed to master so top priority is to solve this issue*|
| *9/21/2018*| *#149*, *#131*| *#130, #132, #133, #135, #152 | *The NullPointer Error is preventing the essential function of the program.  Also, group members have been gone and will be absent this coming week, so we need to be ontop of what is being worked on.*|
| *9/24/2018* | *#155, #154, #135, #132, #152, #157* | *#177, #178, #133, #134, #158* | Key parts of the code have not been finished, which makes testing other parts of the code very difficult.  Time remaining will limit how much we are able to do. |


*Add a new row for each scrum session.*

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
* 

#### Incomplete epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What went well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems encountered and resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *something*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*Articulate what went well at the end of the sprint.*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate at the end of the sprint.  Focus on one of things you need to work on.*
