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
| Epics | *8* | *6* |
| Tasks |  *20*   | *28* | 
| Story Points |  *28*  | *37* | 

*This sprint we decided to focus on epics that would be closely related to each other in order to perfect what we already have instead of trying to add new things.*

*This sprint we ended up with more tasks and story points than planned because we found a lot of bugs in our code that we hadn't noticed before.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *11/14* | *None* | *#392, #394, #492, #493, #494, #495, #496, #497, #499* | *None* | 
| *11/26* | *#392, #492, #498 #499*| *#370, #389, #493, #495, #496, #497, #504, #506, #508, #509* | *Implement 3-opt and changing the user interface without having duplicated codes will be our next challenges* | 
| *11/28* | *None*| *#370, #389, #493, #495, #496, #497, #504, #506, #508, #509* | *Continue working on 3-opt and inspect bugs are our next step* |
| *11/30* | *#495, #504, #508*| *#370, #389, #493, #496, #497, #506, #509* | *Test and implement 3-opt to get the correct outputs before next week deadline will be our next goal* | 
| *12/03* | *#505, #506, #507, #509, #510, #531, #539*| *#370, #389, #493, #496, #497, #542, #545, #546, #547* | *Continue testing and fixing bugs that we found in the old code. Reduce the amount of smell codes along with refactor to avoid Cognitive Complexity to produce a clean and friendly application are our goal* | 
| *12/05* | *#493, #496, #497, #545, #546*| *#370, #389, #547* | *Find and fix bugs along with refactor old code to maintain clean code before deploying are our last goal.* | 

*Add a new row for the scrum session after each lecture. *

## Review

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* * #205 TripCo: All code must be tested: minimum 50% coverage, preferred 70% coverage: We added more tests for client and server*
* * #361 User: I want to view my trip in other tools: Users would be able to download either svg or kml map, then upload to Google Map*
* * #363 User: I want the shortest trips possible: We implemented 3-opt*
* * #419 User: I want an interactive map: Using Leaftlet in our project is a solution*
* * #487 User: Make the system easier to use: We reorganize our user interface for a fresh nice look*
* * #488 User: I want to know who to thank for this application: We added an About Us tab that listed what does the application do and our team members short information plus creative profile pictures*


#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* * #124 TripCo: All code shall be clean: Most of our code is not clean because we have so many similar codes which are differ by a tiny string, but we do not know how to refactor that. Also, one of the big problem we did not know how to reduce the cognitive complexity of three opt without breaking the optimization.*
* * #362 User: I want trip planning to be fast: Most of our available time was spent implementing and cleaning up 3opt. Our goal of adding concurrency was not met due to lack of time spent towards that objective.*

#### What Went Well

*Describe what went well during the sprint in general terms followed by a more detailed list.*

* *something*
*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *API fiascos:  When our Sprint 5 test results came back we discovered that a lot of our code didn't meet TFFI specs, or was implemented incorrectly.  To fix this we made tasks for all the issues and people took them by group (eg. someone took the filters, another took the maps"*
* *Smelly Code At End:  At the end of the sprint we had an important piece of code that was really smelly and we didn't want to compromise our code climate.  In the end we cleaned up as much code as we could to maintain our score and then merged the (less) smelly code.*

## Retrospective

*We had a pretty successful sprint. A lot of time was spent on making our UI more user-friendly and fixing bugs we discovered through testing our client. We struggled in making sure our code was clean before our pull requests were merged with our master. This lead to a lot of time wasted retracing our steps.*

#### What we changed this sprint

*We focused on taking epics down one by one as well as helping each other through rough story points. As a group we increased the amount of pull requests that were sent and approved throughout the week.*

#### What we did well

*We did a better job at having smaller pull requests so they were easier to review. We were able to find and fix bugs at a higher speed than we had earlier in the semester. Our code was significantly more clean that it was earlier in the semester, having less edits after the pull request has been sent. We also did a good job at going back and cleaning older code.*

#### What we need to work on

*We need to work on being more responsive with requests and continue to improve with incremental development by pushing code so group members know where they are. We also need to work on cleaning up our code before we merge into master, instead of saying we'll clean it afterward.*

#### What we will change next sprint 

*If there was another sprint to be had, we would be better at advocating for our pull requests, so that when questions are asked about it, those quetsions can be answered and pull requests fulfilled.*
