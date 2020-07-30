# Changes in update 3.x to 4.0 Education API Specification

![Open Education API](https://github.com/open-education-api/specification/blob/master/logo.png)

The biggest changes between 3.0 and 4.0 are in the endpoints supported and the model that is used to create the new 4.0 specification

## Models
The 3.x model is based on:
![3.x_model](./OOAPI_model_v3.png)

the 4.0 model is based on:
![4.0_model](./OOAPI_model_v4.png)

## Guidelines

* The 4.0 version will be implementing [the Dutch api strategy](https://docs.geostandaarden.nl/api/API-Strategie/)
* With one adoption: Language used: **US English**

## Alignment 
The 4.0 model is partially based on the IMS eduAPI model which is currently still in development. The most important change in the 4.0 model is the introduction of the Nine-Square-Model

| Object    | Object in time    | Object in time related to a person|
|---------- | ----------------- | --------------------------------- |
| Program   | ProgramOffering   | ProgramOfferingAssociation        | 
| Course    | CourseOffering    | CourseOfferingAssociation         |
| Component | ComponentOffering | ComponentOfferingAssociation      |

By adding the element Component it is now possible to distinguish between different types of educational activities that could be part of a course. Examples of components could be: 
* test
* lecture
* labratory session
* pracitcal class
*	workshop
*	seminar

The component type of test makes the old test endpoint redundant

The earlier version of de OOAPI already had the notion of a courseOffering. This is now augmented by also placing the **program** as well as the newly created object **component** in time. The object model references: ProgramOffering, CourseOffering and ComponentOffering. In the API these are all reachable through **1** API-endpoint **Offerings**

The 4.0 version seeks to make connections between persons and their education more generalised. This is done through the general **Associations** API-endpoint which combines the object model objects: ProgramOfferingAssociation, CourseOfferingAssociation, ComponentOfferingAssociation.

## Summary overview of new and deleted endpoints
The 4.0 model removes some elements to reduce complexity (such as Hypermedia). 

The object model objects: ProgramOffering, CourseOffering and ComponentOffering are all reachable through **1 API-endpoint Offerings**

The object model objects: ProgramOfferingAssociation, CourseOfferingAssociation, ComponentOfferingAssociation are all reachable through **1 API-endpoint Associations**

| V3                                                            | V4                |
|---------------------------------------------------------------|-------------------|
| Hypermedia                                                    | ~~Hypermedia~~    |
| Service                                                       | Service           |
| Institution<br>Faculties<br>EducationalDeparments             | Organizations     |
| Persons                                                       | Persons           |
| EducationalPlans<br>CourseResults<br>TestResults<br>Schedules | Associations      |
| EducationalProgrammes<br>CourseGroups                         | Programs          |
| Courses                                                       | Courses           |
| Tests                                                         | Components        |
| CourseOfferings                                               | Offerings         |
| Buildings                                                     | Buildings         |
| Rooms                                                         | Rooms             |
| NewsFeeds                                                     | NewsFeeds         |
| NewsItems                                                     | NewsItems         |
