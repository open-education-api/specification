# Filtering responses

When requesting collections of resources a client can request that the items be filtered based on one or more attributes. This can be done using the query parameter `q`, e.g. `q=text`.

This parameter filters items by matching on the following attributes:
* `name`
* `abbreviation`
* `description`

or for persons:
* `givenName`
* `surNamePrefix`
* `surname`
* `displayName`
* `initials`
* `mail`
* `secondaryMail`

When an attribute contains the given search term (exact partial match, case insensitive), an item is returned, otherwise it is excluded from the response.
