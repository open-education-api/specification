# Extending OOAPI
 
Implementations can extend OOAPI by adding extra attributes to the `ext` object that is defined in the specification for most resources. Extending OOAPI can also be done by specifying a specific consumer, this is a mechanism that allows specifying an extension that can be more easily reused across several implementations. See [Specific consumers](consumers.md) for more information.

All users of the OOAPI are encouraged to feed their extensions back to the OOAPI working group so this information can be used as feedback for future versions of the OOAPI.

## When to use `ext` and when to use `consumer`?

Use `ext` when:
- You only need a few extra attributes that will only be used by a limited set of clients or consuming systems.
- The attributes are specific to your own institution.

Use `consumers` when:
- You need a set of extra attributes to supply a system that will be used by more than one institution.
- You would like to promote the use of this extension.

## Do not add extra paths or resources
Adding extra paths or resources that are not defined in the specification is discouraged. If you have a specific usecase that cannot be served with the existing resources and paths, we recommend contacting the OOAPI work group to determine how the specification should be updated to accommodate your usecase.
