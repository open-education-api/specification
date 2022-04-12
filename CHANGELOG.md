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

### Changed
- rename of changed.md file on version level to release file on version level to provide for additional release information fo future releases
- Changed pagination for all responses returning a collection of items. Responses now include `hasNextPage`, `hasPreviousPage` and optional `totalPages` attributes. These additions make pagination easier for clients.

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