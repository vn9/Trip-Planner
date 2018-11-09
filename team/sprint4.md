# Sprint 4 - *t04* - *Rush Hour*

## Goal

### Interactive Maps and Shorter Trips!
### Sprint Leader: *Zhe Liu*

## Definition of Done

* Sprint Review and Restrospectives completed (sprint4.md).
* Version in pom.xml should be `<version>4.0.0</version>`.
* Increment deployed for demo and testing as server-4.0.jar on the production server.
* Increment release `v4.0` created on GitHub with appropriate version number and name.
* Epics and Tasks updated in Zenhub.


## Policies

#### Test Driven Development
* Write method headers, javadoc, unit tests, and code in that order for all methods/functions.
* Unit tests are fully automated.
* Code coverage is at least 50%, 70% preferred.
#### Clean Code
* Code adheres to Google style guides for Java and JavaScript.
* Code Climate maintainability of A or B.
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits with more than 1 line of change include a task/issue number.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
#### Continuous Integration / Delivery
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 
* All pull requests are deployed on the development server.
* The development server is never broken.  If broken, it is fixed immediately.


## Plan

*This sprint we plan to accomplish two epics "All code shall be clean!" and "All code must be tested" from last sprint. Additionally, we are going to add 3-opt algorithm as another optimization option to get the shortest trips possible. Also we plan to allow users to plan their trips worldwide as well as use other tools to view the trip. Last but not least, we plan to modify our codes such that it will allow the trip to plan as fast as possible.*

*Include any design diagrams prepared during sprint planning (user interface, component diagram, component/state/hierarchy, etc.) with a short paragraph for each.

Epics planned for this sprint.

* *#124: All code shall be clean!*
* *#205: All code must be tested*
* *#359: User: I want to choose what information is displayed in the itinerary and map*
* *#360: User: I want to plan trips worldwide*
* *#361: User: I want to view my trip in other tools*
* *#362: User: I want trip planning to be fast*
* *#363: User: I want the shortest trips possible*



## Metrics

| Statistic | Planned | Completed |
| --- | ---: | ---: |
| Epics | *7* | *total* |
| Tasks |  *29*   | *total* | 
| Story Points |  *46*  | *total* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/22* | *none* | *#354* | *none* | 
| *10/24* | *#367* | *#354, #364, #365, #366, #368, #371, #372, #376, #381* | *none* | 
| *10/26* | *#354, #365, #372* | *#364, #366, #368, #371, #373, #376, #381, #382, #384* | *Modify 1-opt and 2-opt implementations to imporove performance to work with large data will be challenging* |
| *10/29* | *#364, #366, #368, #384* | *#371, #373, #376, #381, #387, #409* | *Find away to access and combine the old database with the new database will be our next challenge* |
| *10/31* | *#373* | *#371, #376, #381, #398, #409* | *Scaling the paths between places to fit the given svg map is not easy as it seems to be. Find errors and fix our restAPI is also a challenging* |
| *11/02* | *#371, #398* | *#381, #382, #392, #394, #396, #403* | *We had a distance problem on trips earlier, once we have it fixed, we will get the chance to work on 1-opt, 2-opt and 3-opt.* |
| *11/05* | *#382, #403* | *#369, #381, #392, #394, #396, #399, #424, #430* | *Modify 1-opt and 2-opt as well as implement 3-opt in two days will be our next challenge. Also, we want to finish planning the trip using different tools soon, so we can test and deploy before Thursday.* |
| *11/07* | *#359, #360, #369, #376, #381, #396, #399, #409, #424, #433, #444, #445* | *#370, #388, #392* | *We are still working on KML map and 2opt and 3opt.* |

*Add a new row for the scrum session after each lecture. *

## Review

*This sprint we finished with an application that allows the users to build their trip worldwide, 
have the options to download a kml file to view on different tools or using our tool to view the trip 
on svg format, and receive distance results in a blink. The users also can be able to download a trip
that they built along with the calculated distances, options, and a map. Later, they can use the downloaded 
file and continuing planning.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*


* *## User: I want to plan trips worldwide: We successfully allow the user to access a database of airports around the world.  Users can now filter search results by those offered by the config.  The map is no longer limited to Colorado and spans the whole world.* 
* *##User: I want to choose what information is displayed in the itinerary and map: The user can now choose what attributes they would like to see on the itinerary by using checkboxes (generated from config).  This epic took multiple days to complete, particularly since the place object was hardcoded and had to be redone.*

#### Incomplete Epics in Sprint Backlog 

*Describe capabilities not included in the release and list the epics below with an explanation.*

* *#124 TripCo: All Code Shall Be Clean: Most of the code are not as clean as it could be. Most of them are duplicated and we could not find out a good way to refactor them.*
* *#205 TripCo: All Code Must Be Tested: Most of the code are untested. We tried to test along with implementing them. The back-end is easy to test, but we had a hard time testing the front-end.*
* *#363 User: I want the shortest trips possible: We spent most of the time to modify nearest neighbor 
  algorithm and 2-opt function since our outputs are incorrect. We just recently finished modifying
these functions; hence, we do not have enough time to implement 3-opt.*


#### What Went Well

*This sprint we did a better job of working within the team.*

* *We did a good job of checking in on others on progress*
* *People were very willing to ask for help and share code to get help*
* *There was less stress within the team as we have figured out how to work with others in the group*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *Hard starting: We got some tasks completely new for us such as the kml map. Thus we spend a long time discussing what it looks like and how to start it. Asking TAs and the professor can help to solve this problem but it still took time.*
* *Detail handling: With the growth of our project, the code becomes more complex and lengthy such as the Trip class. We will try to re-construct some long files to make code be easier to read and understand.*

## Retrospective

*An introductory paragraph for your retrospective.*
*This sprint we were hoping to be more ontop of our deadlines by setting small goals, but this did not happen.  Everyone seemed to be burnt out and busy with other classes at some point in the sprint.  Despite this, we were able to pull together at the end and still make meaningful improvements and changes to our product.  There is still a lot for us to improve on and for us to do, but we will continue to work to make the best final product we can.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*At the end of the sprint, we were able to make progress on the things that we wanted to.  We didn't finish everything that we had hoped, but we made necessary changes to previous work.  We also did a better job of being more flexible in our tasks and helping each other out.  We dropped tasks, picked up ones others were stuck on, and asked for help more frequently.*

#### What we need to work on

*We definitely need to add more tests and improve our code habits to keep our code clean. Additionally, we need to follow Zenhub and burndown chart to keep track on our progress to meet the deadlines.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
