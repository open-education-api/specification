# Filtering responses

When requesting collections of resources a client can request that the items be filtered using the following query parameters.

## Filtering items based on string contents using `q`

This can be done using the query parameter `q`, e.g. `q=text`.

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

When an attribute contains the given search term (exact partial match, case-insensitive), an item is returned, otherwise it is excluded from the response.

## Filtering items meant for a specific consumer using `consumer`

Clients can filter items meant for a specific consumer using the query parameter `consumer`, e.g. `consumer=rio`. See for more information []

## Filtering on other entity-specific attributes

Responses that return collections of items can be filtered using item specific attributes. For example, you can filter responses returning Courses on specific values of the attribute `level`. Refer to the specification to find out which attributes are supported on which requests.
