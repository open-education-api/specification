# Contributing Guidelines

## General

The following general rules apply on this project:

* All contributions including documentation, filenames and discussions should be written in English language.

## Issue tracker

Our [issue tracker](https://github.com/open-education-api/specification/issues) can be used to discuss problems or additions to the current or next version of the Open Education API specification.

Please follow these guidelines before opening an issue:

* Make sure your issue is not a duplicate.
* Make sure your issue is relevant to the specification.

## Formatting / naming conventions

* The spec must comply with the [Open API Specification v3.0](https://github.com/OAI/OpenAPI-Specification/)
* The spec files must be written in [YAML 1.2 format](http://www.yaml.org/spec/1.2/spec.html)
* YAML indentation should be 2 spaces (not tabs)
* YAML string keys/values should be unquoted when quotation is not needed
* YAML string keys/values should be single-quoted when quotation is needed
* Duplication should be avoided where possible (e.g. using [$ref](http://json-schema.org/latest/json-schema-core.html#rfc.section.7) attributes)
* Whether property- and relation names are written as single or plural, depends on the cardinality of the property or relation.
* Parameter or property names are written as [lowerCamelCase](https://nl.wikipedia.org/wiki/CamelCase), also for abbreviations (e.g. `organizationUnitId`).
* Path names are written as [kekab-case](https://en.wikipedia.org/wiki/Kebab_case) (e.g. `/organizations/{id}`).
* The default order of properties is:
  * Identifier
  * Properties
  * Meta properties (e.g. `createdAt`)
* Links should have descriptive names (e.g. `author` instead of `person` for blog posts).
* Nesting of properties is allowed.
* Date / date-time properties are formatted conforming to the [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14) standard.
