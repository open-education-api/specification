# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.0.0 add relation definitions] - 2025-09-12

### Added
- Added a table to the description of the specification that describes all reliationships in the data model.

## [6.0.0 fix ISCED issue] - 2025-09-10

### Added

### Removed

### Changed
– changed requirements for field of study in programme and course

## [6.0.0 resolve required bug] - 2025-09-04

### Added

### Removed

### Changed
– All US English terms have been replaced with British English terms, in paths, fields, entities, and file names.


## [6.0.0 Change service information element] - 2025-09-08

### Added
- Added more detailed information regarding supported consumers, paths and version that can be supported by an implementation.

### Removed
- Removed consumers property from service

### Changed


## [6.0.0 resolve required bug] - 2025-09-04

### Added

### Removed

### Changed
- resolved bug required offering 
  - offering -> testComponentOffering
  - updated examples


## [6.0.0 resolve lint errors/warnings] - 2025-09-04

### Added

### Removed

### Changed
- Resolved lint issues 
  - tags-alphabetical
  - array-parameter-serialization
  - path-http-verbs-order.
  - scalar-property-missing-example
  - operation-4xx-problem-details-rfc7807
  - no-invalid-schema-examples 
- Problems are now defined in accordance with RFC 7807


## [6.0.0 Add state query parameter for offerings] - 2025-09-03

### Added
- Added: `state` query parameter to all `GET` requests that return a collection of offerings. Offerings now have a `state` attribute and many applications will want to retrieve only offerings with a particular state such as `active`.

## [6.0.0 Change move security to documentation] - 2025-08-28

### Added

### Removed

### Changed
- Resolved: Inconsistent use of mail instead of email. All occurrences have been standardised to email.
- Resolved: Enum values have been harmonised:
  - not_known changed to unknown
  - not_finished changed to unfinished
  - not_present changed to absent


## [6.0.0 Change move security to documentation] - 2025-08-26

### Added

### Removed

### Changed
- Resolved: all security-related aspects moved to documentation, ensuring the specification remains clean and free from implementation details

## [6.0.0 Change 'items: - $ref' error] - 2025-08-25

### Added

### Removed

### Changed
- Resolved: replaced all invalid 'items: - $ref' occurrences with the correct 'items: $ref', ensuring valid OpenAPI syntax and proper display in Redoc.

## [6.0.0 Change required fields] - 2025-08-20

### Added

### Removed

### Changed
- Change required fields.
  - **Explanation**: since OOAPI is used in a lot of different contexts we aimed to minimize the required fields. If a certain non-required field is required in a certain context, this should be specified in the consumer. We did keep some requirements however, because we feel the entities would become meaningless or hard to recognize otherwise. We also added some new requirements for consistency.
    - These fields are **always** required (if they exist for that entity)"
      - `<entity>Id`
      - `primaryCode`
      - `role`
      - `state`
      - `type` and various specializations thereof
      - `name`
  - `AcademicSession`
    - Made `academicSessionType` and `primaryCode` required.
    - Added `abbreviation` for consistency.
  - All `Associations`
    - Made `person` and `offering` required fields, because according to the datamodel an association is always between a `Person` and an `Offering`.
  - `Building`
    - Removed the requirement for an `address`.
  - `Course`
    - Removed the requirement for `abbreviation`, `description`, `teachingLanguages` and `level`.
  - `LearningComponent`
    - Removed the requirement for `abbreviation` and `teachingLanguages`.
  - All `Offerings`
    - Removed the requirement for `description`, `teachingLanguages` and `resultExpected`
    - Removed the requirement for `startDate(Time)` and `endDate(Time)`. Offerings no longer need specific dates. This supports the common scenario where an Offering is confirmed for an EducationItem (Program, Course, or Component) but exact dates are not yet determined. To indicate the general timeframe, Offerings can reference an AcademicSession instead of providing specific dates.
  - `Organization`
    - Removed the requirement for `shortName`.
  - `Person`
    - Removed the requirement for `givenName`, `displayName`, `affiliations` and `mail`.
  - `Program`
    - Removed the requirement for `abbreviation`, `description`, `teachingLanguages`.
  - `Service`
    - Removed the requirement for `documentation`.
  - `TestComponent`
    - Removed the requirement for `abbreviation` and `teachingLanguages`.

## [6.0.0 Fix Typo's and warnings] - 2025-08-19

### Added

### Removed

### Changed
Corrected typo's
spec.yaml: 
- Added security: []
- corrected /course-offerings/{courseOfferingId}/course
updated RFC3339 -> RFC3339 (date-time) where applicable corrected

## [6.0.0 Attempt on test component offering] - 2025-08-14

### Added
- TestComponentOfferingAssociationAttempt.yaml Net attempt model 
- TestComponentOfferingAssociationAttemptFull.yaml attempt model including an identifier.
- Document.yaml snippet for generic re-use of documents
- New Paths:
    - TestComponentOfferingAssociationAttemptInstance.yaml
    - TestComponentOfferingAssociationAttemptCollection.yaml
    - TestComponentOfferingAssociationAttemptOnAssociationInstance.yaml (For SIS vendors that need to process on associationId)
- New Enumerations:
    - attemptState.yaml
    - attendance.yaml

### Removed

### Changed
- Result.yaml: added generic result attributes from OKE project
- Offering.yaml: 
    - made use of generic Document.yaml
    - added state attribute
- TestComponentOfferingAssociation
    - made use of generic Document.yaml
- TestComponentOfferingAssociationExpandable: corrected references    
- TestComponentOfferingAssociationExpanded: corrected references
- spec.yaml
    - added model elements for document
    - added model element for attempts
    - added path elements as mentioned in the added section above.
- Renamed TestComponentOfferingTestComponentOfferingAssociationCollection.yaml to TestComponentOfferingAssociationCollection.yaml (and updated path in spec.yaml)
- Renamed TestComponentOfferingTestComponentOfferingCollection.yaml to TestComponentOfferingCollection.yaml (and updated path in spec.yaml)

## [6.0.0 Fix OpenAPI errors and warnings] - 2025-07-07

### Added

### Removed

### Changed
- personId: "123e4567-e89b-12d3-a456-426614174000" in v6/paths/LearningComponentOfferingAssociationInstance.yaml and v6/paths/TestComponentOfferingAssociationInstance.yaml
- removed required - state in v6/schemas/OfferingProperties.yaml
- removed required - items in v6/schemas/Pagination.yaml


## [6.0.0 Beta_postfeedback] - 2025-07-07

### Added
- Add /learning-components ant test-components path (based on feedback and OKE see: https://netwerkexamineringdigitalisering.github.io/NED-OOAPI/specification/v5/docs.html#tag/components/operation/listComponents) #377
- for OKE add:
- PUT /person/{personID}
- PUT /test-component-offering-associations/{testComponentOfferingAssociationId}
- PATCH /program-offerings/{programOfferingId}
- PUT /program-offerings/{programOfferingId}
- PUT /program-offering-associations/{programOfferingAssociationId}
- PUT /learning-component-offering-associations/{learningComponentOfferingAssociationId}
- PUT /course-offering-associations/{courseOfferingAssociationId}
- PATCH /course-offerings/{courseOfferingId}
- PUT /course-offerings/{courseOfferingId}
- PATCH /test-component-offerings/{testComponentOfferingId}
- PUT /test-component-offerings/{testComponentOfferingId}
- PATCH /learning-component-offerings/{learningComponentOfferingId}
- PUT /learning-component-offerings/{learningComponentOfferingId}
- GET /learning-component-offerings/{learningComponentOfferingId}/learning-component-offering-associations
- GET /test-component-offering-associations/{testComponentOfferingAssociationId}/url

### Removed


### Changed
- not implemented request for teachingLanguage query paramater to match the type in schema from string to array (#373)
- update link in enumeration (#384)
- update all enumerations to extisible enumerations
- altered modeOfDelivery string -> modesOfDelivery (array)
- altered personalNeeds string -> personalNeeds (array)
- altered enumarations:
    - made enumerations singular and only string
    - modesOfDelivery (array) -> modeOfdelivery (string) 
    - personAffiliation (array) -> personAffiliation (string)
    - personalNeeds (array) -> personalNeed (string)

## [6.0.0 Beta] - 2025-05-22

### Added
- Adds academic-session to groups #247
- Add preferredName to person for OKE
- Add alternateName to person #308
- Add idCheckName and assignedNeeds # OKE 
- Add generic OKE elements #353
- Add languageTypedString subfields should be required #316
- Add assignedNeeds (not personalNeed this is part of association) #327
- Add learning outcomes as an object #340, #349 and #356 
- Add enumeration for learning outcome types (based on SOLO SOLO taxonomy (www.johnbiggs.com.au))
- add paths for learning outcomes
- add learning-component object
- add testing-component object #333
- add paths for:
    - learning-component
    - learning-component-offering
    - learning-component-offering-association
- add paths for:
    - test-component
    - test-component-offering
    - test-component-offering-association
- add path for documents
- implement longer self explanatory Ids
- update and create sub paths on groups academic-sessions persons for ...offering-associations
- remove sorting
- improve rendering by removing general offering.yaml and association.yaml in favour of referencing to shared properties and separate Id
- fix Consider changing query parameter result-state to resultState. #320
- add learningComponent and testComponent #333
- add enrollment periods to offering properties #319
- operationId to all paths based on schema:
    - put -> replaceResource
    - get -> listResources
    - get (byId) -> listResourceById
    - post -> createResource
    - patch -> partialUpdateResource
    - /me -> {action}ResourceByMyOauthId
    Reasoning for this schema is based on:
    https://github.com/watson-developer-cloud/api-guidelines/blob/master/swagger-coding-style.md
- membership element added for groupmembership
- added PUT path for memebership to a group

### Removed
- reomved components 
- removed offerings
- removed education specification #345
- removed news #347
- removed newsfeeds #347
- removed path /groups/persons
- removed server side sorting from all paths for improved performance and more consistent results


### Changed
- update of model
- update relations and remove generic offering #108
- update query elements in paths to use date-time in stead of only date 
- update of visualisation of the information model #331
- update result-state parameter to resultState #320
- update relation between component offerings allow for 0 or more relations #341 and 



## [5.0.0] - 2022-07-19
The v5.0.0 release is the same as 5.0.0 RC2.

## [5.0.0 RC2] - 2022-06-10
### Added
- Adds an expandable `children` attribute to EducationSpecification.

### Removed
- removed required attribute for startDate in EducationSpecification

### Changed
- update of model

## [5.0.0 RC1] - 2022-06-08

### Added
- Added group functionality to OOAPI
- An `ext` objects to all collection endpoints
- Adds consumer functionality to all entities, including a query parameter to request entities meant for a specific consumer
- Added descriptions for HTTP error responses: 400, 401, 403, 404, 405, 429 and 500. Fixes #125 and #144.
- Add multilingual responses for M2M requests (#163)
- Added `primaryCode` and `otherCodes` (#157)
- Adds the expand functionality and add linking attributes to show linking UUID's between objects
- Adds a Persons POST endpoint
- Adds the attribute `activeEnrollment` to Person.
- Adds `POST associations/external/me` endpoint endpoint with OIDC security information
- Adds `PATCH associations/{associationId}` endpoint
- Adds `pass` attribute to an association result
- Added implementation for RIO consumer in EducationSpecification
- Adds timelineOverride functionality to EducationSpecification, Course and Program. This mechanism allows implementations to communicate about historic and future versions of entities.
- Add education-specification endpoint and create a relation between education-specification and program and course
- Add three pre-filtered education-specification endpoints for courses, programs and education-specifications search bu educationSpecificationID
- Added `/programs/{programId}/programs` endpoint
- Adds `modeOfStudy` to Program.
- Adds `modeOfDelivery` to Program and Component.
- Add `addresses` to Program, Course, Offering and Component schema's (#164)
- Adds attribute `firstStartDate` to Program and Course.
- Adds the following levels to the `level` enumeration: `secondary vocational education`, `secondary vocational education 1`, `secondary vocational education 2`, `nt2-1`, `nt2-2`, `undefined` and `undivided`.
- Adds `validFrom` and `validTo` attributes to EducationSpecification, Program and Course.
- Adds `coordinators` to Program
- Adds the attribute `level` to Program.
- Adds the attributes `assessment`, `resources` and `enrollment` to Program and Component
- Adds the attribute `fieldsOfStudy` to Course
- Adds the attribute `duration` to Course and Component.
- Adds the attribute `learningOutcomes` to Component
- Adds `startEnrollDate` and `endEnrollDate` to all Offerings.
- Adds `flexibleEntryPeriodStart` and `flexibleEntryPeriodEnd` to ProgramOffering and CourseOffering. These two attributes can be used in addition to `startDate` to signify a Program or Course wherein a student can start at various moments with the offering, without missing anything. In that case `startDate` is usually the same as `flexibleEntryPeriodStart`.
- Adds `modeOfDelivery to all offerings.
- Adds `priceInformation` to all Offerings.
- Adds `minNumberStudents` to Offerings
- Adds the attribute `link` to Offerings
- Make the enumeration of AcademicSession `type` extensible and add the following options: `trimester`, `quarter` and `testing period`.
- Adds the option to expand NewsFeeds when requesting a single NewsItem.

### Changed
- Improve error responses to make them more semantically correct (#158)
- Changed pagination for all responses returning a collection of items. Responses now include `hasNextPage`, `hasPreviousPage` and optional `totalPages` attributes. These additions make pagination easier for clients.
- Split person and associations into properties - ID and a aggregated person association object this allows for better reuse e.g. in POST where ID is not mandatory and in typed responses
- Renames the offering attribute `mainLanguage` to `teachingLanguage` and also adds it to all Programs, Courses and Components. `teachingLanguage` now only allows three-letter language codes as specified in ISO 639-2.
- Changed the enumeration for organizationTypes. Renamed `institution` to `institute` to prevent confusion with `root`. Added `branch`, `academy` and `school`.
- Changed postalType enumeration. Added `billing` and `teaching` address type
- Rename the `lengthOfProgram` attribute to `duration` and change the format to duration as described in RFC 3339.
- Changed object types from string to array: `Name`, `Description`, `learningOutcomes`, `admissionRequirements` and `qualificationRequirements`(if present) in Program, Course, Component, Offering and Organization. (#163)
- Removed the enums `alliance`, `elective`, `module` and `joint-degree` from `programTypes`. These values described properties of programs (or courses) that are independent of the type of the program. Therefore they have been removed.
- Split course requirements into admissionRequirements and qualificationRequirements
- Renamed option `year` of the AcademicSession `type` enumeration to `academicYear` to clarify what is meant.
- Renamed isLineItem to resultExpected to improve understandability of the specification
- Changed the `ects` attribute of an association result to `studyLoad`.

### Removed
- Removed the attribute `profileOfProgram` from Program, because it was effectively a duplicate of `description`.
- Removed 404 responses for paths that return a collection.
- Removed `crohoCreboCode` from Program and `brin` from Organization. Use the new otherCode schema for this. (#157)
- Removed the enums `alliance` and `joint-degree` from `programTypes`. These values described properties of programs that are independent of the type of the program. Therefore they have been removed.
- Removed the Accept-Language header from all requests. It is superseded by the new LanguageTypedStrings which always return text in all available languages.
- Removed the attribute `modeOfStudy` from ProgramOffering and CourseOffering.
- Removed option `term` of the AcademicSession `type` enumeration because term is a synonym for Academic session, so all sessions are terms.

### Documentation
- rename of changed.md file on version level to release file on version level to provide for additional release information fo future releases
- Added a single CHANGELOG.md file to track all changes to the OOAPI specification repository.
- Added Explanation on associations
- Improved explanation on Markdown
- Include README.md into documentation website update readme to allow for relative linking of version 5 in to ease testing in development

## [4.0.0] - 2019-09-01
### Added
- Educations concept to align with EDU-API including the nine square model, for programs, courses and components offerings will be provided that can also be associated to a person
- Adaptation of The Dutch api strategy
- wiki for explanation on the specification and underlying architecture.

### Changed
- Endpoint Courses
- Endpoints on courseGroups and educationalPrograms are merged to Program endpoint
- Endpoints on EducationalPlans, CourseResults, TestResults, Schedules are merged to Associations
- Endpoints on Institution, Faculties, EducationalDepartments are merged to Organizations
- Endpoint Tests is moved to Components

### Removed
- Hypermedia support
