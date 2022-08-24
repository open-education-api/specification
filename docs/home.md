---

---
# Open Education API

Educational institutes are increasingly using **apps** to share education data with their students. However, the underlying data for these apps are stored in different systems (i.e. databases), both within and outside the educational institutes. For new and existing apps to communicate with these various systems, a set of software definitions known as an [API (Application Programming Interface)](https://en.wikipedia.org/wiki/API) is required.

Of course, each school, college, or university can develop their own APIs, but this is a time-consuming and costly process. That is why the Open Education API, known in Dutch as the ‘Open Onderwijs API’ (OOAPI) was created. 

The OOAPI is the result of a collaboration between several education institutes and suppliers in the Netherlands and is facilitated by SURF (collectively known as the [Community](community/)).

This [open API](technical/) (or public API as it is sometimes referred to) is constantly being defined and developed so that apps can efficiently process education data, such as registering for a course online, viewing a timetable on a mobile device, or securely checking exam results.

For a brief introduction to the OOAPI, please take a look at the short video below:

## Benefits for students

By incorporating the OOAPI into your IT infrastructure, students can easily:

* Use a smartphone to find the nearest unoccupied computer.
* Conveniently use an app to check the status of study credits.
* Register online for a course or an exam.
* View class timetables on a smartphone. *
* Securely check exam results.*
* And more…

\* To protect personal data such as exam results and timetables, it is advisable to use an authorization server that supports OAuth 2.0 in combination with SURFconext. These security measurements are not included in the OOAPI, but their use is supported.

## Benefits for web-development team

* Fast development times due to standardization.
* No major cost/investment required.
* Easier to exchange data with other educational institutes.
* No need to develop individual, bespoke APIs.
* Convenient reuse of third-party apps across multiple educational institutes.
* Safe sharing of information in a trusted environment.
* Continuous knowledge sharing thanks to collaboration with other educational institutes.

## Creating a standard together

Apps are constantly evolving…

To create an all-encompassing, standard API, it is essential to understand the ever-changing needs of the various educational institutes. Therefore, the [Community](community/) places great value on working closely together to create a standard API (the OOAPI) that best serves as many educational institutes in the Netherlands as possible.

Furthermore, educational institutes that want to publish education data in a standardized way can implement their own API, based on the OOAPI standard.

## Interested in joining us?

Are you an educational institute and interested in having the OOAPI developed to suit your needs? Then why not join us. For more information, access the [Community](community/) link at the top of this page.

## Case study

How the OOAPI can benefit the community...

Both the University of Amsterdam (UvA) and the Zuyd Hogeschool use the OOAPI on a daily basis as part of their IT infrastructure. The MijnUvA app, as used by students at the UvA, combines data from the electronic learning environment, the student information system, the timetable system, and the UvA website. By using the OOAPI, these data can be accessed and presented in a clear and organized way.

When the Zuyd Hogeschool decided to develop a new intranet for their students, to save time and money, the OOAPI was the obvious choice as a major building block for their IT infrastructure.

_Interview with Johannes Maas (involved with implementing the OOAPI at Zuyd Hogeschool):_

“_The OOAPI translates information from existing source systems and makes it available for educational apps. Take for example a new app that allows you to view the class timetable on your smartphone or reserve a workspace while heading into work on the train. The existing systems supply the underlying information, but the functionality and display are new. By using the OOAPI to unlock the existing systems, a comprehensive range of new apps can be developed. And moreover, this can be achieved without having to adapt the source systems themselves_.”