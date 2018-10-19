# Sprint 3 - *t04* - *Rush Hour*

## Goal

### The goal of this sprint is to add features to our application that include, allowing the user to create a plan from start for their trip, and also to complete the epics that were left over from sprint 2.
### Sprint Leader: *Junyi Liu*

## Definition of Done

* Search database is up and is usuable to make a new trip from start
* All epics from sprint 2 are resolved and closed
* Test Coverage reaches 70%
* Sprint Review and Restrospectives completed (sprint3.md).
* Version in pom.xml should be `<version>3.0.0</version>`.
* Increment deployed for demo and testing as server-3.0.jar.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
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
* Two approved reviews, second review merges the request.
* Branch that is being pulled MUST be tested on own computer before any approval.
#### Continuous Integration
* Travis successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

*This sprint we plan to accomplish all of the previous sprint's epics as well as allowing the user to search through our database to add destinations to their plans. We also want to add opt1 as an optimization option where we use the nearest neighbor algorithm. *

*We have two images in our slack channel that depicts what we would like our interface to look like and is our outline for the entire sprint*

Epics planned for this sprint.

* *#205: All code must be tested*
* *#123: I want to supply my own units for the distances: App supports any units defined by the user for distance calculations.*
* *#125: TripCo: The solution must be responsive for mobile devices: App is designed for mobile environment and still looks good on desktop.*
* *#206: TripCo: I want to design a trip from scratch so I can stop using my other tool*
* *#203: TripCo: I want to make to make and save changes to my trip*


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *8* | *0* |
| Tasks |  *16*   | *0* | 
| Story Points |  *31*  | *0* | 

*Enter the `# Planned` at the beginning of the sprint.  Include a discussion of planning decisions based on the planned number of story points versus how many were completed in previous sprints.*

*Enter the `# Completed` at the end of the sprint.  Include a discussion about any difference in the number planned versus completed tasks and story points.*


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/3* | *#123, #125, #225, #229, #230, #233* | *#213, #217, #231, #234, #236* | *none* |
| *10/5* | *#217, #235* | *#208, #213, #220, #232, #239, #240, #243* | *none* |
| *10/8* | *#166, #208, #213, #223, #239, #243, #250, #256, #258，#260, #263* | *#220, #222, #232, #240* | *none* |
| *10/10* | *#142 ,#219, #222, #240, #266, #273, #275, #279, #280* | *#220, #221, #232, #268, #281, #282, #285* | *Maintaining a focused effort to close epics while still working to get our test coverage up will be challenging* |
| *10/15* | *None* | *#220, #221, #232, #268, #281, #282, #285* | *Adding item to the array is challenging because the trip does not get updated|
| *10/17* | *#221, #232, #268, #281, #285, #289, #292, #294, #295, #296, #298, #302, #308, #311, #312 #320* | *#212, #220, #278, #282, #316, #319*| *Trying to connect to the database, finishing all tasks and getting test coverage up by Thursday afternoon will be challenging*|

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

* *We did a very good job of hitting the ground running. Our burndown chart was ideal following the ideal path that was drawn for us. We also had better group participation throughout by specific members.*
*

#### Problems Encountered and Resolutions

*Describe what problems occurred during the sprint in general terms followed by a more detailed list.*

* *Partway through our sprint we had a rut where no story points were completed for multiple days. We were lost as a team and had difficulty getting back to our productive start. We meeting together as a group and regrouped and were able to finish strong in the last three days.*
*

## Retrospective

*An introductory paragraph for your retrospective.*

#### What we changed this sprint

*Articulate specifically what you will do differently based on the retrospective from the previous sprint before the sprint starts.*

#### What we did well

*We started the sprint off very productively and had a great pace throughout the first half of the sprint. We also did a better job of managing tasks and being on the same page with what everyone was doing at all times*

#### What we need to work on

*Articulate things you could improve at the end of the sprint.*

#### What we will change next sprint 

*Articulate the one thing you will change for the next sprint and how you will accomplish that.*
