# Mapping OOAPI to BIV 

## CIA and BIV
CIA (or in Dutch BIV) classifications help institutions to choose proper measures to secure and optimise systems that have been classified. CIA is an acronym for Confidentiality, integrity and availability. More information on CIA/BIV can be found [here](https://nl.wikipedia.org/wiki/BIV-classificatie)

## Institutions in the lead 
Determining the CIA classification of an OOAPI endpoint is usually done by institutions themselves since they are in the best position to assess impact regarding for instance availability issues. 

## Classification through matching
This document helps institutions to get a general overview of the objects within the specification and their preliminary CIA classification. The objects and specifically the end points in question are [OOAPI endpoints](https://open-education-api.github.io/specification/v5/docs.html). To make a preliminary CIA classification we have chosen to map the endpoints to [HORA](https://www.wikixl.nl/wiki/hora/index.php/Hoofdpagina). This is done by mapping the OOAPI objects to HORA company objects. These HORA company objects already have a CIA consensus from architects at the educational institutions. 

## The OOAPI objects
![OOAPI objects and their relationships in a schema](https://open-education-api.github.io/specification/v5/OOAPIv5_model.png)

## Description of the objects
| OOAPI object                       | OOAPI endpoint                       | description                                                                                                                                                                                                                            |
| ---------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service                            | "/"                                  | The service additional metadata needed to make the OOAPI fit for this organization.                                                                                                                                                    |
| organization                       | "/organizations"                     | The organizations that are responsible for the execution and recognition of education.                                                                                                                                                 |
| organizationRelation               | "/organizations"                     | The relations between different organizations mainly parent-child relations or indication of root.                                                                                                                                     |
| educationSpecification             | "/education-specifications"          | The generic desciption of a general education object such as a program or course.                                                                                                                                                      |
| education                          | "/programs" "/courses" "/components" | A genaralization object that is used mainly for aggregating shared information across programs, courses and components.                                                                                                                |
| program                            | "/programs"                          | A coherent set of educational courses, aimed at the realization of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the program must have.                             |
| programRelation                    | "/programs"                          | The relations between different programs mainly parent-child relations or indicaiton of root.                                                                                                                                          |
| course                             | "/courses"                           | A coherent set of educational components, aimed at the realization of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the course must have.                           |
| component                          | "/components"                        | Educational components, aimed at the realization of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the component must have.                                          |
| offering                           | "/offerings"                         | A genaralization object that is used mainly for aggregating shared information on the offerings of programs, courses and components. Offerings have a global timeframe, or academicSession, e.g. a period to which students can enroll |
| programOffering                    | "/offerings"                         | An offering of a specific program in a academicSession                                                                                                                                                                                 |
| courseOffering                     | "/offerings"                         | An offering of a specific course in a academicSession                                                                                                                                                                                  |
| componentOffering                  | "/offerings"                         | An offering of a specific component in a academicSession                                                                                                                                                                               |
| academicSession                    | "/academic-sessions"                 | The academic sessions provides information about the different time periods a program, course or component (education) can be offered                                                                                                  |
| association                        | "/associations"                      | An offeringAssociation provides the information regarding the association between an offering (of type program, course or component) and a person (e.g. students, lecturers, etc).                                                     |
| result (as part of an association) | "/associations"                      | Result of a unit of study participation, Study Activity or test                                                                                                                                                                        |
| group                              | "/groups"                            | A collection of persons that has a relationship with an organization and optional an offering                                                                                                                                          |
| person                             | "/persons"                           | A person that has a relationship with this institution                                                                                                                                                                                 |
| room                               | "/rooms"                             | Rooms are part of a building where an activity can take place. Including detail information on the resources available, number of seats, etc. (Updated continuously)                                                                   |
| building                           | "/buildings"                         | Building that is currently used by the organization. Including all location details.                                                                                                                                                   |
| newsfeed                           | "/news-feeds"                        | Clustering of news items usually based on a specific topic.                                                                                                                                                                            |
| newsitem                           | "/news-items"                        | Text which used to inform readers about events which are considered newsworthy or important. These news items are messages usually clustered in a feed regarding a specific topic.                                                     |

## The HORA objects for education and education support

![HORA company objects and their relationships in a schema](https://github.com/open-education-api/specification/wiki/HORA2_onderwijsobjecten_wiki.png)

## CIA and BIV
CIA (or BIV) is a triad of 
- Confidentiality
- Integrity
- Availability

These three elements of the trias are then classified in 4 different levels:
- H = high
- M = medium,
- L = low,
- P = publicly available  

## Overview of OOAPI endpoints and their classification

| Data element                       |                                                                                                                                                                   | Security  | Security |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| OOAPI object                       | Maps to HORA object                                                                                                                                               | HORA CIA* | HORA BIV |
| service                            | Not part of HORA (could be part of Institute: "Instelling" )                                                                                                      | LLL       | LLL      |
| organization                       | Organization "Organisatie"                                                                                                                                        | LLL       | LLL      |
| organizationRelation               | Organization "Organisatie"                                                                                                                                        | LLL       | LLL      |
| educationSpecification             | Generic desciption of a general education object such as a program or course: "RIO opleidingseenheid"                                                             | PHM       | MHP      |
| education                          | Collection of units of study, Study, Program, Minor, Unit of study: "Opleiding, Onderwijsprogramma, Minor, Onderwijseenheid"                                      | LHM       | MHL      |
| program                            | Collection of units of study, Study, Program, Collection of units of study "Samenhangende collectie van onderwijs eenheden, Opleiding, Onderwijsprogramma"        | LHM       | MHL      |
| programRelation                    | Not part of HORA (could be part of Study, Program, Minor, Unit of study: "Opleiding, Onderwijsprogramma, Minor, Onderwijseenheid")                                | LHM       | MHL      |
| course                             | Unit of study "Onderwijseenheid"                                                                                                                                  | PHM       | MHP      |
| component                          | Learning activity, Test activity "Leeractiviteit, toetsactiviteit"                                                                                                | LHM       | MHL      |
| offering                           | Exam program, Unit of study implementation, Study activity "Examenprogramma, Onderwijseenheiduitvoering, Onderwijsactiviteit"                                     | LHM       | MHL      |
| programOffering                    | Collection of units of study in which a student can enrol, Exam program "Examenprogramma"                                                                         | LHM       | MHL      |
| courseOffering                     | Unit of study Execution "Onderwijseenheiduitvoering"                                                                                                              | PHM       | MHP      |
| componentOffering                  | Educational Activity "Onderwijsactiviteit"                                                                                                                        | LMM       | MML      |
| academicSession                    | Not part of HORA (could be part of Exam program, Unit of study implementation, Study activity "Examenprogramma, Onderwijseenheiduitvoering, Onderwijsactiviteit") | LHM       | MHL      |
| association                        | Unit of study participation, Study Activity  "Onderwijseenheidresultaat, Toetsresultaat"                                                                          | HMM       | MMH      |
| result (as part of an association) | Result of a unit of study participation, Study Activity or test  "Onderwijseenheidresultaat, Toetsresultaat"                                                      | MHL       | LHM      |
| group                              | Collection of persons that has a relationship with an organization and optional an offering "Leergroep, Lesgroep"                                                 | LML       | LML      |
| person                             | Pariticpant, Employee  "Individu, Deelnemer, Alumus, Medewerker, Contact"                                                                                         | HHM       | MHH      |
| room                               | Room: "Ruimte"                                                                                                                                                    | MLM       | MLM      |
| building                           | Building: "Gebouw"                                                                                                                                                | LMM       | MML      |
| newsfeed                           | Not part of HORA (could be cluster of Notification: "Melding")                                                                                                    | LLL       | LLL      |
| newsitem                           | Melding: "Notification"                                                                                                                                           | LLL       | LLL      |

* When a OOAPI objects maps to more than one HORA object the CIA classification is based on the highes values of the joint objects, eg if CIA for object one is LLH and for object two is HLL, the combined CIA classification results in HLH
* Unit of Study. (Unit) means a component of a higher education course of study with a designated unit code, title and credit point allocation in which students enrol and undertake assessment tasks in order to achieve specified learning outcomes.(based on [lawInsider](https://www.lawinsider.com/dictionary/unit-of-stud) )
