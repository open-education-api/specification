# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2022-04-15
### Added
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

### Changed
- rename of changed.md file on version level to release file on version level to provide for additional release information fo future releases
- Changed pagination for all responses returning a collection of items. Responses now include `hasNextPage`, `hasPreviousPage` and optional `totalPages` attributes. These additions make pagination easier for clients.
- split person and associations into properties - ID and a aggragated person association object this allows for better reuse e.g. in POST where ID is not mandatory and in typed responses
- Changed the enumeration for organizationTypes. Renamed `institution` to `institute` to prevent confusion with `root`. Added `branch`, `academy` and `school`.
- Changed postalType enumeration. Added `billing` address type
- Removed 404 responses for paths that return a collection.

### Removed
- Removed the attribute `profileOfProgram` from Program, because it was effectively a duplicate of `description`.

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