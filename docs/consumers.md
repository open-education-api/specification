# Specific consumers

Since version 5.0, OOAPI has a mechanism to support extending the specification for specific consumers. This mechanism allows (a group of) users implementing and using OOAPI implementations to agree on a set of extensions that is necessary to fulfill a specific usecase. Such a mechanism also negates the necessity of providing for each and every usecase in the general OOAPI specification.

This consumer mechanism consists of the following:
1. A `consumer` query parameter that allows clients to request data meant for a specific consumer. E.g. `GET /courses?consumer=rio`.
2. A `consumers` attribute in all OOAPI entities, which implementers can use to add consumer-specific attributes:
```json
{
    "...": "...",
    "consumers": [
        {
            "rio": {"custom" "attribute"}
        }
    ]
}
```
3. A registry listing which keys are in use by which consumers. Users that want to use this mechanism without registering a key, should prefix their key with `x-`.

## Consumer registry
| Key | Description |
| --- | ----------- |
| `rio` | RIO is a central registry, maintained by the Dutch Government that lists all educational institutions and the education they offer. |
| `eduxchange` | eduXchange is a website that allows students to easily enroll in education from other institutions. |