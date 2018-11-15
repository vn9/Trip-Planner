# Sprint 5 - *t04* - *Rush Hour*

## Goal

### Wrap It Up!
### Sprint Leader: *Vina Nguyen*

## Definition of Done

* Sprint Review and Restrospectives completed (sprint5.md).
* Version in pom.xml should be `<version>5.0.0</version>`.
* Increment deployed for demo and testing as server-5.0.jar on the production server.
* Increment release `v5.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.
* Interactive Map and ability to save kml/svg files
* 3-opt works and all opts are fast
* There is an about page with information
* The client looks sleek and is easy to use


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* All tests pass.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration / Delivery
* Travis successfully builds and tests on all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

*An introductory paragraph describing what you expect to accomplish this sprint that will achieve the goal.*

*Include any design diagrams prepared during sprint planning (user interface, component diagram, component/state/hierarchy, etc.) with a short paragraph for each.*

This sprint we are planning to produce a beautiful, friendly, and functioning application where users will be able to plan the trip and see the results in a blink. Additionally, we plan to accomplish 3-opt to get the shortest trips possible that was left from last sprint. Besides that, we plan to refactor our code to keep them clean and easy to test. In addition, we plan add an interact map using React-Leaflet to allow user to span and zoom the world map instead of an image like before. Finally, we plan to organize our current front-end to make it more user friendly.

<p align="center">
  <img src="https://github.com/csu18fa314/t04/blob/master/team/images/whiteboard.JPG" width="50%" height="30%"> 
  <p align="center"> 
    <b>Outline of user interface on white board:</b> As a group, we drew the user interface that would be our end product.
  </p>
</p>

<p align="center">
  <img src="https://github.com/csu18fa314/t04/blob/master/team/images/details.jpg" width="50%" height="20%"> 
  <p align="center"> 
    <b>Outline of user interface in details:</b> This is the detailed version of the white board image. This image shows that we have three main "pages": "Plan Trip", "Distance Calculation", and "About". "Plan Trip" is our default page which contains the map, the itinerary table, the buttons, and a few tabs that support different methods of planning the trip. We have a Upload tab for users to upload a file, a Manual tab for users to add their own place, a Search tab that connects to our database for users to search the country/continents/etc., and an Options tab for users to choose the units of the distances, the optimizations, the server, and the type of map they want to be displayed. "Distance Calculation" is another function to calculate the distance between two places given latitudes and longitudes; plus units buttons. "About" contains the information of the application and the staffs who create this app. 
  </p>
</p>

Epics planned for this sprint.

* *#205 TripCo: All code must be tested: minimum 50% coverage, preferred 70% coverage*
* *#419 User: I want an interactive map*
* *#488 User: I want to know who to thank for this application*
* *#487 User: Make the system easier to use*
* *#363 User: I want the shortest trips possible*
* *#362 User: I want trip planning to be fast*
* *#361 User: I want to view my trip in other tools*
* *#124 TripCo: All code shall be clean!*

## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | *28* | *total* |
| Tasks |  *20*   | *total* | 
| Story Points |  *28*  | *total* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *11/14* | *None* | *#392, #394, #492, #493, #494, #495, #496, #497, #499* | *None* | 

*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* * #205 TripCo: All code must be tested: minimum 50% coverage, preferred 70% coverage*
*

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *## epic title: explanation*
*

#### What Went Well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *something*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*We will do a better job at focusing on taking down one/two epics at a time instead of trying to work on them all at once.*

#### What we did well

*Articulate what went well at the end of the sprint.*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*