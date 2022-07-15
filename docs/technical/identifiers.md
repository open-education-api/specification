# About identifiers

## UUID's
Each resource specified in OOAPI has an identifier in the form of a [UUID (Universally unique identifier)](https://en.wikipedia.org/wiki/Universally_unique_identifier), the attribute name for this identifier is `Id` prefixed with the name of the resource, e.g. `programId`. Using UUID's guarantees that all identifiers are globally unique. The id's for resources should be stable. 

OOAPI recommends using version 4 UUID's (random). We strongly advice institutions and suppliers implementing OOAPI to make sure their UUID's are properly generated  using enough randomness. 

## Primary codes
Most institutions already have their own unique, often human-readable, identifiers or codes for resources. Such codes can be communicated using the `primaryCode` attribute. If no primary code is available for a resource, the `primaryCode` attribute can be filled with the UUID used as the resource id.

## Other codes
Besides the identifier and primary code, resources or entities may also be known by other codes. These codes can be communicated using the `otherCodes` attribute, which is an array of "Identifier Entries". Each entry consists of a `codeType`, which indicates what kind of code it is and a `code` containing the actual code.

The following `codeTypes` are available:

| codeType                 | Description                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `brin`                   | The registration number for a Dutch educational institution that is issued by the Dutch Ministry of Education, Culture and Science |
| `crohoCreboCode`         | programs with a CREBO and CROHO number are accredited by the Dutch Ministry of Education, Culture and Science (OCW)                |
| `programCode`            | Identifier for the program (collection of courses)                                                                                 |
| `componentCode`          | The code for a component (part of a course)                                                                                        |
| `offeringCode`           | The code to identify a specific offering (program, course or component offering)                                                   |
| `organizationId`         | The identifier for the organization                                                                                                |
| `buildingId`             | The number or code to identify a building                                                                                          |
| `bagId`                  | The identification of a building as it is known in the Dutch Building Administration (BAG)                                         |
| `roomCode`               | The code for a room                                                                                                                |
| `systemId`               | Identifier assigned to an entity in context of a specific system                                                                   |
| `productId`              | Identifier assigned to a specific product                                                                                          |
| `nationalIdentityNumber` | Identifier assigned by the government of the person. e.g. a social security number in the USA                                     |
| `studentNumber`          | Identifier for the student                                                                                                         |
| `studielinkNumber`       | Identifier for the person as determined by Studielink                                                                              |
| `esi`                    | European Student Identifier                                                                                                        |
| `userName`               | The name of a user                                                                                                                 |
| `accountId`              | Identifier assigned to a specific account                                                                                          |
| `emailAdress`            | An email address                                                                                                                   |
| `groupCode`              | The identifier for a group (of persons)                                                                                            |
| `isbn`                   | International Standard Book Number that serve as product identifiers for Books                                                     |
| `issn`                   | International Standard Book Number that serve as product identifiers for periodicals                                               |
| `orcId`                  | Open Researcher and Contributor ID                                                                                                 |
| `uuid`                   | A universally unique identifier                                                                                                    |
| `schacHome`              | An identifier identifying an institution.                                                                                          |
| `identifier`             | Generic Identifier                                                                                                                 |

Since `codeType` is an extensible enumeration, implementation may add their own `codeTypes`, as long as their are prefixed with "x-".