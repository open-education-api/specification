---

---
# Datamodel

<a href='docs/_media/datamodel.svg' target=_blank>Open full model</a>

![](../_media/datamodel.svg)

## Entity definitions

### Service
The service entity describes metadata relating to the OOAPI endpoint, such as who to contact about questions regarding this endpoint, links to documentation, etc.

### EducationSpecification
An EducationSpecification provides information about what a learner can learn from Educations derived from the EducationSpecification. It is also used to aggregate Educations from the supplying institution.

### Educations
Educations are templates for educational activities that can be offered. Educations come in three forms:
* Programs
* Courses
* Components

#### Program
A Program describes a coherent collection of courses leading to a certain outcome. Programs can be repeatedly offered to learners through ProgramOfferings.

#### Course
A Course describes an educational activity that can result in credits being awarded to the learning once the learner successfully completes an Offering of said Course. A Course is the smallest educational unit that a learner can pass or fail.

#### Component
A Component is a template for the most concrete learning activities the OOAPI describes. Examples include workgroups, lectures and tests.

### AcademicSession
An AcademicSession is a named period in time. AcademicSessions can be nested in multiple hierarchical trees. The highest possible level of such a tree should be an AcademicSession describing an (academic) year. AcademicSessions can have relations to Offerings to indicate that those Offerings take place within the period described by the AcademicSession.

### Offerings
Offerings are concrete instances of Educations, taking place at a certain time. Offerings come in three forms:
* ProgramOfferings
* CourseOfferings
* ComponentOfferings

#### ProgramOffering
A ProgramOffering is the concrete offering of a Program in time. Persons can be associated with a ProgramOffering through a ProgramOfferingAssociation.

#### CourseOffering
A CourseOffering is the concrete offering of a Course in time. Persons can be associated with a CourseOffering through a CourseOfferingAssociation.

#### ComponentOffering
A ComponentOffering is the concrete offering of a Component in time. Persons can be associated with a ComponentOffering through a ComponentOfferingAssociation.

### Associations

#### ProgramOfferingAssociation

#### CourseOfferingAssociation

#### ComponentOfferingAssociation

### Person

### Organization

### Group

### Building

### Room

### NewsFeed

### NewsItem

