Expanding responses

!> This documentation must be updated when the expanding mechanism is clear.

The OOAPI is based on resources that are represent as objects in the object model. The objects themselves are identified through unique UUID's. This allows for referencing the object for retreival, updates and information on the creation of the object. The objects can also refer to eachother through these UUID's. For example the course object has a coordinator this coordinator is identified as the UUID of the person filling the coordination role for this course.

If you would like to get the complete information from a linked object you could do this by calling the UUID of this linked object. This then would require two API requests. If more than one object is linked to the object this would even requre more requests. To reduce the number of requests the expand mechanism is introduced. 

This is why the expand mechanism is introduced. This mechanism allows you to retreive the linked objects in a single call by replacing the object ID of the linked object with all its properties. 
The expand mechanism works by adding an expand parameter and the name of the linked object you would like to expand. For example if you would like to see the details of the person in an association this is done by 
`GET association/{associationID}?expand=person`

# Endpoints which are expandable
The current list of objects that allow for expansion of the related objects are:
* academic-session
* association
* component
* component-offering
* course
* course-offering
* group
* organization
* program
* program-offering
* room

to do 
changelog
write examples

      # Examples
      First expand the program only to show additional parent information:
      ```
      GET /programs/{programId}?expand=parent

      Result:
      {
      "programId": "123e4567-e89b-12d3-a456-426614174000",
      "type": "alliance",
      "name": "Student Mobility",
      "abbreviation": "studM",
      "description": "program that is a place holder for all courses that are made available for student mobility",
      "ects": 5,
      "qualificationAwarded": "None",
      "lengthOfProgram": 6,
      "levelOfQualification": 6,
      "sector": "university education",
      "fieldsOfStudy": "0732",
      "crohoCreboCode": "59312",
      "profileOfProgram": "the program is meant to be a place holder for all courses that can be exchanged between Universities, therefore there is no main focus for this program",
      "learningOutcomes": [
      "string"
      ],
      "admissionRequirements": "Students need to be enrolled at qualifying institutions of higher education that participate in this alliance",
      "qualificationRequirements": "None",
      "link": "https://bijvak.nl",
      "ext": { },
      "parent": {
        "programId": "123e4567-e89b-12d3-a456-426614174000",
        "type": "alliance",
        "name": "Student Mobility",
        "abbreviation": "studM",
        "description": "program that is a place holder for all courses that are made available for student mobility",
        "ects": 5,
        "qualificationAwarded": "None",
        "lengthOfProgram": 6,
        "levelOfQualification": 6,
        "sector": "university education",
        "fieldsOfStudy": "0732",
        "crohoCreboCode": "59312",
        "profileOfProgram": "the program is meant to be a place holder for all courses that can be exchanged between Universities, therefore there is no main focus for this program",
        "learningOutcomes": [
        "string"
        ],
        "admissionRequirements": "Students need to be enrolled at qualifying institutions of higher education that participate in this alliance",
        "qualificationRequirements": "None",
        "link": "https://bijvak.nl",
        "ext": { }
      }
      }
      ```

      When additional information is needed on a program the program information can be expanded further by including additional parameters in an array style. If no values are provided for expand there will be no additional information provided. An empty expand parameter will be handled in the same manner as the normal GET function to the API.


      ```
      GET /programs/{programId}?expand=parent,children,organization

      Result:
      {
      "programId": "123e4567-e89b-12d3-a456-426614174000",
      "type": "alliance",
      "name": "Student Mobility",
      "abbreviation": "studM",
      "description": "program that is a place holder for all courses that are made available for student mobility",
      "ects": 5,
      "qualificationAwarded": "None",
      "lengthOfProgram": 6,
      "levelOfQualification": 6,
      "sector": "university education",
      "fieldsOfStudy": "0732",
      "crohoCreboCode": "59312",
      "profileOfProgram": "the program is meant to be a place holder for all courses that can be exchanged between Universities, therefore there is no main focus for this program",
      "learningOutcomes": [
      "string"
      ],
      "admissionRequirements": "Students need to be enrolled at qualifying institutions of higher education that participate in this alliance",
      "qualificationRequirements": "None",
      "link": "https://bijvak.nl",
      "ext": { },
      "parent": {
        "programId": "123e4567-e89b-12d3-a456-426614174000",
        "type": "alliance",
        "name": "Student Mobility",
        "abbreviation": "studM",
        "description": "program that is a place holder for all courses that are made available for student mobility",
        "ects": 5,
        "qualificationAwarded": "None",
        "lengthOfProgram": 6,
        "levelOfQualification": 6,
        "sector": "university education",
        "fieldsOfStudy": "0732",
        "crohoCreboCode": "59312",
        "profileOfProgram": "the program is meant to be a place holder for all courses that can be exchanged between Universities, therefore there is no main focus for this program",
        "learningOutcomes": [
        "string"
        ],
        "admissionRequirements": "Students need to be enrolled at qualifying institutions of higher education that participate in this alliance",
        "qualificationRequirements": "None",
        "link": "https://bijvak.nl",
        "ext": { }
      },
      "children": [
        {
        "programId": "123e4567-e89b-12d3-a456-426614174000",
        "type": "alliance",
        "name": "Student Mobility",
        "abbreviation": "studM",
        "description": "program that is a place holder for all courses that are made available for student mobility",
        "ects": 5,
        "qualificationAwarded": "None",
        "lengthOfProgram": 6,
        "levelOfQualification": 6,
        "sector": "university education",
        "fieldsOfStudy": "0732",
        "crohoCreboCode": "59312",
        "profileOfProgram": "the program is meant to be a place holder for all courses that can be exchanged between Universities, therefore there is no main focus for this program",
        "learningOutcomes": [
        "string"
        ],
        "admissionRequirements": "Students need to be enrolled at qualifying institutions of higher education that participate in this alliance",
        "qualificationRequirements": "None",
        "link": "https://bijvak.nl",
        "ext": { }
        }
      ],
      "organization": {
        "organizationId": "123e4567-e89b-12d3-a456-123514174000",
        "name": "Coöperatie SURF U.A.",
        "shortName": "SURF",
        "description": "SURF is een coöperatieve vereniging van Nederlandse onderwijs- en onderzoeksinstellingen waarin de leden hun krachten bundelen. De leden zijn eigenaar van SURF.",
        "type": "root",
        "addresses": [
        {
        "type": "postal",
        "street": "Moreelsepark",
        "streetNumber": "48",
        "additional": "On the other side of the road",
        "postalCode": "3511 EP",
        "city": "Utrecht",
        "countryCode": "NL",
        "geolocation": {
        "latitude": 52.089123,
        "longitude": 5.113337
        },
        "ext": { }
        }
        ],
        "link": "https://surf.nl",
        "logo": "https://www.surf.nl/themes/surf/logo.svg",
        "brin": "00AA",
        "ext": { }
      }
      }



See also https://stripe.com/docs/expand
