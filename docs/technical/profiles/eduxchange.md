---

---
# eduXchange and Project Studentmobiliteit (Version 2.0)

The project Studentmobiliteit is split into two parts
1. Students orientation on courses and minors from participating institutions.
2. Student registration on a particular offering of a course or minor

## Required requests

To be compatible with eduXchange and the Project 'Studentmobiliteit' an institution needs to implement the following requests:

* `GET /organizations`
* `GET /organizations?organizationType=root`
* `GET /organizations/{organizationId}`
* `GET /organizations/{organizationId}/programs?programType=minor`
* `GET /organizations/{organizationId}/courses`
* `GET /programs?programType=minor`
* `GET /programs/{programId}`
* `GET /programs/{programId}/offerings`
* `GET /courses`
* `GET /courses/{courseId}`
* `GET /courses/{courseId}/offerings`
* `GET /offerings/{offeringId}`
* `GET /academic-sessions`
* `GET /academic-sessions/{academicSessionId}`
* `GET /academic-sessions/{academicSessionId}/offerings`
* `GET /persons/me`
* `GET /persons/{personId}`
* `GET /associations/{associationId}`
* `POST /associations/external/me`
* `PATCH /associations/{associationId}`

!> For `/organizations` the `organziationType=root` parameter must be supported and for all calls returning programs the `programType=minor` parameter will be set and must be supported.

!> To select educational information meant for eduXchange, eduXchange will always append the query parameter `consumer=eduxchange` to every call.

# The student orientation part

The documentation below is essential for the orientation part.

## Specific expands that have to be implemented

To be compatible with the [eduXchange catalogue website](https://www.eduxchange.nl), an implementation needs to support the following \[expands\]:

* `expand=coordinator` on all calls returning a single instance of a Program and Course should include the coordinators for the specified Program or Course.
* `expand=academicSession` on all calls returning a single instance of an Offering should include the AcademicSession the offering is related to.
* `expand=program` and `expand=course` on all calls returning a single instance of an Offering should include the relevant Program or Course.

# The student registration part

The documentation below is essential for the registration part.

## Specific attributes that are required in the project

!> For the person object that is requested either through  `GET /persons/me`
or `GET /persons/{personId}`. The object also needt to enclude a studielinkNumber to facilitate deduplication. This is achieved by adding an extra object in the otherCodes array of Person:

```json
{
  "personId": "123e4567-e89b-12d3-a456-426614174000",
  "primaryCode": {
  "codeType": "identifier",
  "code": "s123456"
},
...
...
"otherCodes": [
	{
      "codeType": "studielinkNummer",
      "code": "12345678"
	}
],
"consumers": [
  {
    "consumerKey": "eduxchange",
    "enrollments": [
      {
        "crohoCreboCode": "34401",
        "name": "B Bedrijfseconomie",
        "phase": "bachelor",
        "modeOfStudy": "full-time",
        "startDate": "2020-09-01",
        "endDate": "2021-08-31"
      }
    ],
    "institutionBRINCode": "11AA"
  }
],
"ext": { }
}
```

!> For the home institutions to get a full overview of the course a student is trying to enroll the `POST /associations/external/me` needs to have the courseOffering or programOffering expanded.


## Explanation of rules governing the association state

* pending (proces is waiting on the status of the students home institution)
* associated (the student is enrolled in the learning activity) 
* canceled (by student) 
* denied (either learning activity is stopped or student is not allowed)
* queued (student is put on a waiting list)

## Explanation of rules governing the association remoteState

* pending (proces is waiting on the status of the students home institution)
* associated (the student is enrolled in the learning activity) 
* canceled (by student)
* denied (student is not allowed)
* queued (student is put on a waiting list)

# Changes since OOAPI v4

In OOAPI version 5.0 the following changes were made that are relevant for eduXchange and Project Studentmobiliteit. Some of the highlights:

1. Some attributes were added to the Program object.
2. Some attributes were added to the Course object.
3. Some attributes were added to the Association object or updated. For example: `state` has been expanded with a `queued` value and the `result` object has been expanded with a new attribute `pass`.
4. Some of the attributes we specified in the `ext` object or the nested `targetGroup` object have been moved to the consumer object.
5. Some of the attributes we specified in the `ext` object or the nested `targetGroup` object have been moved to the regular top level objects. For example `enrollmentStartDate` in the `ext` object of an offering has been moved to the regular offering object and been renamed to `enrollStartDate`.
6. New calls for enrolling students and updating enrollment status have been added (- `POST /associations/external/me` and `PATCH /associations/{associationId}`).
7. AcademicSessions now have a type `academicSessionType`.

See the CHANGELOG for more information.