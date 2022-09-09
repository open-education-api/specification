# Sorting responses

When requesting collections of resources a client can request that the items be sorted based on one or more attributes. This can be done using the query parameter `sort`, e.g. `sort=name`. By default items are sorted ascending on the specified attribute. By prefixing the attribute with a `-` the direction becomes descending, e.g. `sort=-name`.

The sorting takes place based on comma separated values. e.g.:

```
GET /programs?sort=programId
```

Returns a list of all programs sorted ascending based on `programId`.

```
GET /programs?sort=name,-ects
```
Returns a list of all programs first sorted on `name` ascending and `ects` descending.
