# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
