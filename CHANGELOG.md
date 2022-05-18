# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2022-04-15

### Added
- added group functionality to ooapi
- CHANGELOG.md
- Improved explanation on Markdown
- ext objects to all collection endpoints
- #158 Improve error responses to make them more semantically correct
- associations/me endpoint with OIDC security information
- associations/external endpoint
- associations/external/me endpoint
- persons POST endpoint
- explanation on associations
- extra attribute on results
- Added descriptions for HTTP error responses: 400, 401, 403, 404, 405, 429 and 500. Fixes #125 and #144.
- add education-specification endpoint and create a relation between education-specification and program and course
- add three prefiltered education-specification endpoints for courses, programs and education-specifications search bu educationSpecificationID
- #163 Multilingual responses for M2M requests
- #157 Added `primaryCode` and `otherCodes`
- Adds attribute `firstStartDate` to Program and Course.
- Adds the attribute `duration` to Course and Component.
- Adds `startEnrollDate` and `endEnrollDate` to all Offerings.
- Adds `flexibleEntryPeriodStart` and `flexibleEntryPeriodEnd` to ProgramOffering and CourseOffering. These two attributes can be used in addition to `startDate` to signify a Program or Course wherein a student can start at various moments with the offering, without missing anything. In that case `startDate` is usually the same as `flexibleEntryPeriodStart`.
- #164 Add `addresses` to Program, Course, Offering and Component schema's
- added group functionality to ooapi
- Adds consumer functionality to all entities, including a query parameter to request entities meant for a specific consumer
- added time-override functionality to course and program
- Added `/programs/{programId}/programs` endpoint
- Adds `modeOfStudy` to Program.
- Adds `modeOfDelivery` to Program and Component.
- Adds `modeOfDelivery to all offerings.
- Adds the following levels to the `level` enumeration: `secondary vocational education`, `secondary vocational education 1`, `secondary vocational education 2`, `nt2-1`, `nt2-2`, `undefined` and `undvided`.
- Adds `validFrom` and `validTo` attributes to EducationSpecification, Program and Course.
- Adds `priceInformation` to all Offerings.
- Adds `coordinators` to Program
- Adds `minNumberStudents` to Offerings
- Adds the attributes `assessment`, `resources` and `enrollment` to Program and Component
- Adds the attribute `link` to Offerings
- Adds the attribute `learningOutcomes` to component
- Adds the attribute `fieldsOfStudy` to Course
- Adds the attribute `level` to Program.

### Changed
- rename of changed.md file on version level to release file on version level to provide for additional release information fo future releases
- Changed pagination for all responses returning a collection of items. Responses now include `hasNextPage`, `hasPreviousPage` and optional `totalPages` attributes. These additions make pagination easier for clients.
- split person and associations into properties - ID and a aggragated person association object this allows for better reuse e.g. in POST where ID is not mandatory and in typed responses
- Renames the offering attribute `mainLanguage` to `teachingLanguage` and also adds it to all Programs, Courses and Components.
- Changed the enumeration for organizationTypes. Renamed `institution` to `institute` to prevent confusion with `root`. Added `branch`, `academy` and `school`.
- Changed postalType enumeration. Added `billing` address type
- Removed 404 responses for paths that return a collection.
- #157 removed `crohoCreboCode` from Program and `brin` from Organization. Use the new otherCode schema for this.
- Rename the `lengthOfProgram` attribute to `duration` and change the format to duration as described in RFC 3339.
- #163 Changed object types from string to array: `Name`, `Description`, `learningOutcomes`, `admissionrequirements` and `qualificationRequirements`(if present) in Program, Course, Component, Offering and Organization.
- Removed the enums `alliance` and `joint-degree` from `programTypes`. These values described properties of programs that are independent of the type of the program. Therefore they have been removed.
- Split course requirements into admissionRequirements and qualificationRequirements

### Removed
- Removed the attribute `profileOfProgram` from Program, because it was effectively a duplicate of `description`.
- Removed the Accept-Language header from all requests. It is superseded by the new LanguageTypedStrings which always return text in all available languages.
- Removed the attribute `modeOfStudy` from ProgramOffering and CourseOffering.

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