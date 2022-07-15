# Expanding responses

The OOAPI is based on resources that are represent as objects in the object model. The objects themselves are identified through unique UUID's. This allows for referencing the object for retreival, updates and information on the creation of the object. The objects can also refer to eachother through these UUID's. For example the course object has a coordinator this coordinator is identified as the UUID of the person filling the coordination role for this course.

If you would like to get the complete information from a linked object you could do this by calling the UUID of this linked object. This then would require two API requests. If more than one object is linked to the object this would even requre more requests. To reduce the number of requests the expand mechanism is introduced. 

This is why the expand mechanism is introduced. This mechanism allows you to retreive the linked objects in a single call by replacing the object ID of the linked object with all its properties. 
The expand mechanism works by adding an expand parameter and the name of the linked object you would like to expand. For example if you would like to see the details of the person in an association this is done by 
`GET association/{associationID}?expand=person`

## Endpoints which are expandable
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

## Example of the use of expand

`GET association/{associationID}` will provide

```
{
    "associationId": "123e4567-e89b-12d3-a456-426614174000",
    "associationType": "componentOfferingAssociation",
    "role": "student",
    "state": "associated",
    "remoteState": "associated",
    "consumers": [
        {
            "consumerKey": "x-test-consumer",
            "additional": "custom",
            "attributes": "here"
        }
    ],
    "ext": { },
    "result": {
        "state": "completed",
        "pass": "passed",
        "comment": "string",
        "score": "9",
        "resultDate": "2020-09-28T00:00:00.000Z",
        "ext": { },
        "studyLoad": {
            "studyLoadUnit": "ects",
            "value": 3
        }
    },
    "person": "05035972-0619-4d0b-8a09-7bdb6eee5e6d",
    "offering": "811aede5-3f86-4ee8-bd58-925df0b0509d"
}
```

To complete this information a person request and an offering request is needed. this would then result in three different requests to complete all the data. To reduce the amount of requests we can also use the aforementioned expand functionality.

`GET association/{associationID}?expand=person,offering` will provide

```
{
    "associationId": "123e4567-e89b-12d3-a456-426614174000",
    "associationType": "componentOfferingAssociation",
    "role": "student",
    "state": "associated",
    "remoteState": "associated",
    "consumers": [
        {
            "consumerKey": "x-test-consumer",
            "additional": "custom",
            "attributes": "here"
        }
    ],
    "ext": { },
    "result": {
        "state": "completed",
        "pass": "passed",
        "comment": "string",
        "score": "9",
        "resultDate": "2020-09-28T00:00:00.000Z",
        "ext": { },
        "studyLoad": {
            "studyLoadUnit": "ects",
            "value": 3
        }
    },
    "person": {
        "personId": "05035972-0619-4d0b-8a09-7bdb6eee5e6d",
        "primaryCode": {
            "codeType": "crohoCreboCode",
            "code": "string"
        },
        "givenName": "Maartje",
        "surnamePrefix": "van",
        "surname": "Damme",
        "displayName": "Maartje van Damme",
        "initials": "MCW",
        "activeEnrollment": false,
        "dateOfBirth": "2003-09-30",
        "cityOfBirth": "Utrecht",
        "countryOfBirth": "NL",
        "nationality": "Dutch",
        "dateOfNationality": "2003-09-30",
        "affiliations": [
            "student"
        ],
        "mail": "vandamme.mcw@universiteitvanharderwijk.nl",
        "secondaryMail": "poekie@xyz.nl",
        "telephoneNumber": "+31 123 456 789",
        "mobileNumber": "+31 612 345 678",
        "photoSocial": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Placeholder_female_superhero_c.png/203px-Placeholder_female_superhero_c.png",
        "photoOfficial": "https://upload.wikimedia.org/wikipedia/commons/6/66/Johannes_Vermeer_%281632-1675%29_-_The_Girl_With_The_Pearl_Earring_%281665%29.jpg",
        "gender": "F",
        "titlePrefix": "drs",
        "titleSuffix": "BSc",
        "office": "string",
        "address": {
            "addressType": "postal",
            "street": "Moreelsepark",
            "streetNumber": "48",
            "additional": [
                {
                    "language": "en-GB",
                    "value": "On the other side of the road"
                }
            ],
            "postalCode": "3511 EP",
            "city": "Utrecht",
            "countryCode": "NL",
            "geolocation": {
                "latitude": 52.089123,
                "longitude": 5.113337
            },
            "ext": { }
        },
        "ICEName": "Janne",
        "ICEPhoneNumber": "+31 623 456 789",
        "ICERelation": "partner",
        "languageOfChoice": [
          "nl-NL"
        ],
        "otherCodes": [
            {
                "codeType": "nationalIdentityNumber",
                "code": "00000"
            }
        ],
        "consumers": [
            {
                "consumerKey": "x-test-consumer",
                "additional": "custom",
                "attributes": "here"
            }
        ],
        "ext": { }
    }, 
    "offering": {
        "offeringId": "811aede5-3f86-4ee8-bd58-925df0b0509d",
        "primaryCode": {
            "codeType": "crohoCreboCode",
            "code": "string"
        },
        "offeringType": "component",
        "academicSession": "937983ad-cc0f-45a6-95ca-a8f60b7cf125",
        "name": [
            {
            "language": "en-GB",
            "value": "Final written test for INFOMQNM for fall semseter 2020"
            }
        ],
        "abbreviation": "Test-INFOMQNM-20FS",
        "description": [
            {
            "language": "en-GB",
            "value": "'Prove in writing knowledge of research methods, including:\nAcquire knowledge of HCI research paradigms\nAble to design suitable research studies (e.g., choose between within and between subject designs)\nDefine/apply/design metrics and scales\nDefine/produce materials (e.g., stimuli and questionnaires)\nDefine protocols for research studies\nUnderstands and take in account concepts of reliability and validity\nAnalyze and improve methods and analysis of published scientific articles\nAble to deliver scientific reports\nProve in writing knowledge of ­­­statistics, including:\nHandle hypothesis testing with complex designs (e.g., including , dependent, independent, and co variates)\nData preparation (e.g., coding and feature selection)\nReason towards adequate techniques to ensure valid outcomes (e.g., be aware of type I, type II errors)\nSelect an appropriate sampling method (e.g., stratified)\nPerform parametric tests (e.g., repeated measures (M)ANOVA)\nPerform non-parametric tests (e.g., Chi-square, Mann-Whitney, and Kruskal-Wallis)'\n"
            }
        ],
        "teachingLanguage": "nld",
        "modeOfDelivery": [
            "situated"
        ],
        "maxNumberStudents": 200,
        "enrolledNumberStudents": 150,
        "pendingNumberStudents": 50,
        "minNumberStudents": 15,
        "resultExpected": true,
        "resultValueType": "1-10",
        "link": "https://osiris.uu.nl/osiris_student_uuprd/OnderwijsCatalogusZoekCursus.do#submitForm?cursuscode=INFOMQNM",
        "otherCodes": [
            {
            "codeType": "crohoCreboCode",
            "code": "string"
            }
        ],
        "consumers": [
            {
            "consumerKey": "rio",
            "explanationRequiredPermission": "Toestemming is vereist omdat we daarom vragen.",
            "requiredPermissionRegistration": "yes",
            "registrationStatus": "open"
            }
        ],
        "ext": {},
        "startDate": "2019-08-21T00:00:00.000Z",
        "endDate": "2019-10-23T00:00:00.000Z",
        "enrollStartDate": "2019-05-01T00:00:00.000Z",
        "enrollEndDate": "2019-08-01T00:00:00.000Z",
        "flexibleEntryPeriodStart": "2019-08-24",
        "flexibleEntryPeriodEnd": "2019-08-24",
        "addresses": [
            {
            "addressType": "postal",
            "street": "Moreelsepark",
            "streetNumber": "48",
            "additional": [
                {
                "language": "en-GB",
                "value": "On the other side of the road"
                }
            ],
            "postalCode": "3511 EP",
            "city": "Utrecht",
            "countryCode": "NL",
            "geolocation": {
                "latitude": 52.089123,
                "longitude": 5.113337
            },
            "ext": {}
            }
        ],
        "priceInformation": [
            {
            "costType": "total costs",
            "amount": "340.84",
            "vatAmount": "40",
            "amountWithoutVat": "300.84",
            "currency": "EUR",
            "displayAmount": [
                {
                "language": "nl-NL",
                "value": "€380,84"
                },
                {
                "language": "en-US",
                "value": "$401.17"
                }
            ],
            "ext": {}
            }
        ],
        "course": "4c88e8b1-8fa9-4021-9bad-b22efe4d02eb",
        "programOffering": "8ac6982d-28e6-4714-8f27-4da24a40a52a",
        "organization": "452c1a86-a0af-475b-b03f-724878b0f387"
    }
}
```


The expand functionality is inspired on the stripe examples
See also https://stripe.com/docs/expand
