---

---
# Educhange

To be compatible with the [eduXchange catalogue website](https://www.eduxchange.nl), an implementation needs to implement the eduXchange consumer object and query parameter for three different kind of objects.
* programs & courses
* offerings
* persons


## Eduxchange consumer object and query parameter for Programs and Courses
 

!> When a client requests programs or courses and the query parameter `consumer` is set to `eduxchange`, only Programs and Courses meant for eduxchange should be returned.

Also the eduxchange consumer object should be added to the array of consumer objects when returning Programs and Courses. The consumer object for eduXchange has the following attributes:

* `consumerKey`, should always have the value `"eduxchange"`
* `alliances`, an array with all the alliances this Program or Course is offered for. Each alliance is an object with the following attributes:
  * `name`: (required) the name of the alliance, allowed values are `"ewuu"` or `"lde"`
  * `theme`: the theme of the Program or Course within the alliance
  * `selection`: boolean value (`true` or `false`) indicating whether this Program or Course is selective, e.g. whether student need to pass extra requirements before being allowed to enroll.
  * `type`: a string indicating whether a Program or Course is broadening or deepening. Allowed values are: `"broadening"` and `"deepening"`.
  * `visibleForOwnStudents`: a boolean value (`true` or `false`) indicating whether this Program or Course should be visible for students of the offering institution. The default values for this attribute is specified outside of this specification on the alliance level. By default, students who are not enrolled in one of the participating alliances can see all Programs and Courses but not enroll.
  * `enrollmentForOwnStudents`: a string indicating which enrollments process should be followed for students of the offering institution. Allowed values are `"broker"` or `"url"`. This attribute is only used if `visibleForOwnStudents` is set to `true`. 
    * If `"url"` is chosen the attribute `enrollmentUrl` **in the consumer object of an offering** is mandatory.
  * `source`: an optional object with a reference to the source of a Course or Program. In an alliance one of the institutions could act as overall coordinator and specifies the program and underlying courses. Underlying courses could be given at one of the other institutions. In this source object the course at the other institution can be specified. Use these attributes:
    * `shortName`: the shortName of the institution to identify the source institution. Possible values for ewuu are `"tue"`, `"wur"` and `"uu"`, for lde these are `"ul"`, `"tud"` and `"eur"`
    * `primaryCode`: a string value with the primaryCode of the course to identify the source course.
    * `uuid`: the uuid of the course to reference the OOAPI endpoint of the source course.

### Example

This is an example of the consumer object for eduXchange. The example reflects the default behaviour for visibility of the `ewuu` and `lde` alliances. The `ewuu` courses are not visible for students from the offering institution. The `lde` minors are visible for student from the offering institution. These students can enroll through the `broker`.

```json
{
  "consumers": [
    {
      "consumerKey": "eduxchange",
      "alliances": [
        {
          "name": "ewuu",
          "theme": "Information and Communication Technologies",
          "selection": false,
          "type": "broadening",
          "visibleForOwnStudents": false
        },
        {
          "name": "lde",
          "theme": "Information and Communication Technologies",
          "selection": false,
          "type": "deepening",
          "visibleForOwnStudents": true,
          "enrollmentForOwnStudents": "broker"
          "source": {
            "shortName": "tud",
            "primaryCode": "WB-MI-168",
            "uuid": "123e4567-e89b-12d3-a456-123514174000"
          }
        }
      ]
    }
  ]
}
```

## Eduxchange consumer object for Offerings

The outline of the consumer object for offerings is the same as specified above for the programs and courses.

This consumer object is used to specify the `enrollmentUrl` that is associated with the `enrollmentForOwnStudents=url` attribute in the consumer object of the corresponding progam or course.

  * `enrollmentUrl`: a string formatted as an URL to which students will be redirected if `enrollmentForOwnStudents` **in the program/course consumer object** is set to `"url"`.

The idea behind this construct is
* At the program/course level is specified if a student can enroll for a course of the homeinstitution at a specific URL of the homeinstitution. Specified with `enrollmentForOwsStudentes=url`.
* A program/course usually has multiple offerings associated with is, these offerings can have a different enrollment url's at the home institution. Therefor this url is specified in `enrollmentUrl` of the offering itself.

### Example

This is an example of the consumer object for eduXchange offerings. This consumer object specifies an `enrollmentUrl` for one of the `alliances` with a specific `name`.

```json
{
	"consumers": [{
		"consumerKey": "eduxchange",
		"alliances": [{
			"name": "ewuu",
			"enrollmentUrl": "https://www.my-url.nl/"
		}]
	}]
}
```

## Eduxchange consumer object for Persons

To be compatible with the registering process of the `broker` after the 'register' button is pressed in the eduxchange frontend, an implementation needs to implement the following consumer object and attributes on the Persons object. 

* `consumerKey`, should always have the value `"eduxchange"`
* `enrollments`, an array with all the CROHO enrollments for this person. Each enrollment is an object with the following attributes:
  * `crohoCreboCode`: (required) the crohoCreboCode for this program. This should be a five character string, e.g. "34401".
  * `name`: (required) the name of the program this enrollment is for.
  * `phase`: the phase of the program for this enrollment. Allowed values are `"bachelor"` or `"master"`.
  * `modeOfStudy`: the modeOfStudy of the program for this enrollment. Allowed values are `"full-time"`, `"part-time"`, `"dual training"` or `"self-paced"`.
  * `startDate`: the start date for this enrollment. Should be a string formatted as an RFC3099 full-date.
  * `endDate`: end start date for this enrollment. Should be a string formatted as an RFC3099 full-date.
* `institutionBRINCode`, the BRIN code of the institution. Should consist of two digits and two capital letters.

### Example

```json
{
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
  ]
}
```