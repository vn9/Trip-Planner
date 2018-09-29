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
| *9/17/2018* | *#129* | *#130, #131, #132, #133, #135* | *Dependencies still need to be finished and making sure that we all know the direction we are going is the correct one. This should be cleared up with TA hours.*|
| *9/19/2018* | *#129* | *#130, #131, #132, #133, #135* | *Decent progress was made however a bug was pushed to master so top priority is to solve this issue*|
| *9/21/2018*| *#149*, *#131*| *#130, #132, #133, #135, #152 | *The NullPointer Error is preventing the essential function of the program.  Also, group members have been gone and will be absent this coming week, so we need to be ontop of what is being worked on.*|
| *9/24/2018* | *#155, #154, #135, #132, #152, #157* | *#177, #178, #133, #134, #158* | Key parts of the code have not been finished, which makes testing other parts of the code very difficult.  Time remaining will limit how much we are able to do. |
| *9/26/2018* | *#156, #134* | *#177, #178, #133, #158, #159, #164, #160* | Many of the tasks now are interconnected or depend on key issues getting completed (eg. draw a line on a map, but no map has been displayed yet). Not knowing/agreeing on what should be our priorities at this point will limit our achievement.|


*Add a new row for each scrum session.*

## Review

* For this sprint the result was a web app that allows users to upload a json file with their trip, choose any server, hit submit, and receive a map and itinerary of their trip. While we were able to implement a lot of good changes, we are still missing the ability of a user to change and define the units of the trip from the user interface.

#### Completed epics in Sprint Backlog 

* *User: I want a map and itinerary for my trip:*  We can display a table with the trip itinerary and the route on a map.
* *TripCo: All clients and servers must interoperate:*  We can send the plan request to another group’s server and display the data returned to us. Their sever will return the data and display the itinerary and trip on our team page's table and map.


#### Incomplete epics in Sprint Backlog 

* *TripCo: All code shall be clean:*  We didn’t pay enough attention to this part this time because we were more concerned with getting working code than the cleanest code.
* *TripCo: The solution must be responsive for mobile devices:*  We did not have enough time to adjust our unit-selection buttons and allow for file upload from mobile.
* *User: I want to determine the distance between a pair of destinations:*  This epic is easy to be solved once we can link those unit button with back-end data but we didn’t finish this epic because we ran out of tim
* *User: I want to supply my own units for the distances:*  We already finished the front-end of this epic. Unit button and input boxes can be seen from user interface. This epic remains open because we did not understand the purpose/use of the button.

#### What went well

* Persistence: Although we did not know anything about this project, we leart and built more and more stuffs gradully. We were unable to display an itinerary or map the day before it was due, but nobody gave up and we worked until the end to get it done.

#### Problems encountered and resolutions

* *Unfamiliar framework:* None of us has used or learnt similar topics before. Our group was unfamiliar with front-end web design and we didn’t understand how the different parts fit together. To solve this problem, we spent a lot of time discussing how this project works.
* *Dependency problem:* We were unable to begin a lot of the coding on time because other pre-requisite tasks had yet to be finished. While this problem wasn’t really resolved, we worked through it by putting in lots of hard work at the end.

## Retrospective

*This sprint was very difficult for our team. From the very beginning we struggled with understanding what was need to be done. This got us on the wrong foot and required us to play catch-up for the remainder of the sprint. There was more tension in the team this sprint due to the lack of communication. We had a meeting with our manager because of it part way through. However improvements were not seen and another meeting with our manager will be scheduled.*

#### What we changed this sprint

*This sprint we added a fifth member. Integration of that fifth member took more time and effort than we had anticipated at the beginning at the sprint. Due to this new effort, we failed to make the changes that we stated we would change in the last sprint.*

#### What we did well

*We at the very least got a lot of work at the end of our sprint. It looked bleak throughout but something was accomplished.*

#### What we need to work on

*Communication is something that needs to be improved on. It worsened from last sprint which was a disappointment. Doubling down on communication, multiple times during the sprint, group members had no idea what other group members were doing due to lack of pull requests. Therefore, there needs to be an increase of pull requests and updates on Slack. We need to have a better start to the sprint with our plan. We did not fully understand what this sprint required and fell behind because of that.*

#### What we will change next sprint 

*We will communicate a lot better next sprint. We plan to have a sit down with our manager to hash out some of our problems and expect improvements from our group as a whole. Also testing is an improvement that needs to be made by every individual member and will be improved on.*
