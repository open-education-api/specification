# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2022-04-12
### added
- added group functionality to ooapi

## [Unreleased] - 2022-01-07
### Added
- CHANGELOG.md
- Improved explanation on Markdown
- ext objects to all collection endpoints
- #158 Improve error responses to make them more semantically correct
- Added descriptions for HTTP error responses: 400, 401, 403, 404, 405, 429 and 500. Fixes #125 and #144.
- #163 Multilingual responses for M2M requests
- Adds attribute `firstStartDate` to Program.
- Adds the attribute `duration` to Course and Component.
- Adds `enrollStartDate` and `enrollEndDate` to all Offerings.
- Adds `flexibleEntryPeriodStart` and `flexibleEntryPeriodEnd` to ProgramOffering and CourseOffering. These two attributes can be used in addition to `startDate` to signify a Program or Course wherein a student can start at various moments with the offering, without missing anything. In that case `startDate` is usually the same as `flexibleEntryPeriodStart`.
- #164 Add `addresses` to Program, Course, Offering and Component schema's

### Changed
- rename of changed.md file on version level to release file on version level to provide for additional release information fo future releases
- Changed pagination for all responses returning a collection of items. Responses now include `hasNextPage`, `hasPreviousPage` and optional `totalPages` attributes. These additions make pagination easier for clients.
- Renames the offering attribute `mainLanguage` to `teachingLanguage` and also adds it to all Programs, Courses and Components.
- Changed the enumeration for organizationTypes. Renamed `institution` to `institute` to prevent confusion with `root`. Added `branch`, `academy` and `school`.
- Changed postalType enumeration. Added `billing` address type
- Removed 404 responses for paths that return a collection.
- Rename the `lengthOfProgram` attribute to `duration` and change the format to duration as described in RFC 3339.
- #163 Changed object types from string to array: `Name`, `Description`, `learningOutcomes`, `admissionrequirements` and `qualificationRequirements`(if present) in Program, Course, Component, Offering and Organization.

### Removed
- Removed the attribute `profileOfProgram` from Program, because it was effectively a duplicate of `description`.
- Removed the Accept-Language header from all requests. It is superseded by the new LanguageTypedStrings which always return text in all available languages.

## [4.0.0] - 2019-09-01
### Added
- Educations concept to align with EDU-API including the nine square model, for programs, courses and components offerings will be provided that can also be associated to a person
- Adaptation of The Dutch api strategy
- wiki for explanation on the specification and underlying architecture.

### Changed
- Endpoint Courses
- Endpoints on courseGroups and educationalPrograms are merged to Program endpoint
- Endpoints on EducationalPlans, CourseResults, TestResults, Schedules are merged to Associations
- Endpoints on Institution, Faculties, EducationalDeparments are merged to Organizations
- Endpoint Tests is moved to Components

### Removed
- Hypermedia support