# eduXchange and Project Studentmobiliteit

## Required requests

To be compatible with eduXchange and the Project 'Studentmobiliteit' an institution needs to implement the following requests:

- `GET /organizations`
- `GET /organizations/{organizationId}`
- `GET /organizations/{organizationId}/programs?type=minor`
- `GET /organizations/{organizationId}/courses`
- `GET /organizations?type=root`
- `GET /programs?type=minor`
- `GET /programs/{programId}`
- `GET /programs/{programId}/offerings`
- `GET /courses`
- `GET /courses/{courseId}`
- `GET /courses/{courseId}/offerings`
- `GET /academic-sessions`
- `GET /academic-sessions/{academicSessionId}`
- `GET /academic-sessions/{academicSessionId}/offerings`
- `GET /persons/me`
- `GET /persons/{personId}`
- `POST ????`
- alles met intekenen, persons en associations

!> For `/organizations` the `type=root` parameter must be supported and for all calls returning programs the `type=minor` parameter will be set and must be supported.

## Specific expands that have to be implemented

To be compatible with the [eduXchange catalogue website](https://www.eduxchange.nl), an implementation needs to support the following [expands]: 

- `expand=coordinator` on all calls returning a single instance of a Program and Course should include the coordinators for the specified Program or Course.
- `expand=academicSession` on all calls returning a single instance of an Offering should include the AcademicSession the offering is related to.

## Eduxchange consumer object and query parameter

To be compatible with the [eduXchange catalogue website](https://www.eduxchange.nl), an implementation needs to implement the eduXchange consumer object and query parameter. See [specific consumers](consumers.md) for more information:

When a client requests programs or courses and the query parameter `consumer` is set to `eduxchange`, only Programs and Courses meant for eduxchange should be returned.

Also the eduxchange consumer object should be added to the array of consumer objects when returning Programs and Courses. The consumer object for eduXchange has the following attributes:

- `consumerKey`, should always have the value `"eduxchange"`
- `alliances`, an array with all the alliances this Program or Course is offered for. Each alliance is an object with the following attributes:
    - `name`: (required) the name of the alliance, allowed values are `"ewuu"` or `"lde"`
    - `theme`: the theme of the Program or Course within the alliance
    - `selection`: boolean value (`true` or `false`) indicating whether this Program or Course is selective, e.g. whether student need to pass extra requirements before being allowed to enroll.
    - `type`: a string indicating whether a Program or Course is broadening or deepening. Allowed values are: `"broadening"` and `"deepening"`.
    - `visibleForOwnStudents`: a boolean value (`true` or `false`) indicating whether this Program or Course should be visible for students of the offering institution. The default values for this attribute is specified outside of this specification on the alliance level. By default students who are not enrolled in one of the participating alliances can see all Programs and Courses but not enroll.
    - `enrollmentForOwnStudents`: a string indicating which enrollments process should be followed for students of the offering institution. Allowed values are `"broker"` or `"url"`. This attribute is only used if `visibleForOwnStudents` is set to `true`. If `"url"` is chosen the attribute `enrollmentUrl` is mandatory.
    - `enrollmentUrl`: a string formatted as an url to which students will be redirected if `enrollmentForOwnStudents` is set to `"url"`.

## Changes since OOAPI v4

In OOAPI version 5.0 the following changes were made that are relevant for eduXchange and Project Studentmobiliteit. Some of the highlights:

1. Some attributes were added to the Program object.
2. Some attributes were added to the Course object.
3. Some attributes were added to the Association object or updated. For example: `state` has been expanded with a `queued` value and the `result` object has been expanded with a new attribute `pass`.
4. Some of the attributes we specified in the `ext` object or the nested `targetGroup` object have been moved to the consumer object.
5. Some of the attributes we specified in the `ext` object or the nested `targetGroup` object have been moved to the regular top level objects. For example `enrollmentStartDate` in the `ext` object of an offering has been moved to the regular offering object and been renamed to `enrollStartDate`.
6. New calls for enrolling students have been added.
7. AcademicSessions now have a type `academicSessionType`.

See the CHANGELOG for more information.
