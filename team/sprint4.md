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
| *date* | *#task, ...* | *#task, ...* | *none* | 
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

*An introductory paragraph describing the overall results of the sprint.*

#### Completed Epics in Sprint Backlog 

*Describe the solution based on the completed epics and list the epics below.*

* *## epic title: comments*
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

* *Hard starting: We got some tasks completely new for us such as the kml map. Thus we spend a long time to discuss what it looks like and how to start it. Asking TAs and professor can help to solve this problem but it still need time.*
* *Details handling: With the growth of out project, the code becomes more complex and lengthy such as the Trip class. We will try to re-construct some long files to make code be easier to read and understand.*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*Articulate what went well at the end of the sprint.*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
