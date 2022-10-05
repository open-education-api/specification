# Steps to implement an OOAPI endpoint

The OOAPI itself is not an API that can be used out of the box. There are several implementations of the API, but the OOAPI in itself, as is in the github repostory is not a queryable API. It is merely a starting point on your journey to expose your institutional information to other parties. The OOAPI repository provides you with insights on the data model and proposed endpoints. Most of these endpoints are based on GET methods, as this is currently the method that is being used in most Use Cases. If you would like to add new methods or would like to propose additional attributes please feel free to contact the OOAPI working group.

This page provides you, the reader with 4 steps which you could take to start implementing your own OOAPI endpoint.

1. Data modelling (locating authoritative sources, determining scope of OOAPI endpoint), mainly on the level of entities.

The first step is to determine which OOAPI endpoints you would like to expose. This determines the data sources that need to be found. When the choice has been made the source(s) that can act as a source of truth for the specific data can be identified and a global match can be made between the OOAPI data objects and the objects in the data source(s).  

2. Designing the endpoint (using a single source, ESB, etc)

Depending on the amount of data sources and the possibility of joining, aggregating, patching or other methods needed to enable certain use cases a decision needs to be made on the flow of information to and from the endpoint. This data flow determines the design of the endpoint. E.g. Is it possible to source all data from one system or do we need to retrieve information from several systems? Do we need data to flow back into one system or will it be distributed. Will there be data security on the API based on trust between systems or trust based on individual interactions?

3. Detailed information mapping, on the level of individual attributes.

Once the choices on interaction have been made a further detailed mapping of the data can take place to ensure all the data needed can be made available and can be translated if 

4. Technical realisation.

The final step is to do the actual technical implementation of the selected endpoints and methods. 
