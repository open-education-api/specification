# Open Education API Specification

![Open Education API](logo.png)

This repository contains the [OpenAPI](https://github.com/OAI/OpenAPI-Specification) (fka Swagger) specification for the [Open Education API](https://openonderwijsapi.nl/en/).

* [Operating area and Application](#operating-area-and-application)
* [Documentation](#documentation)
* [Development](#development)
* [Contributing](#contributing)
* [Community](#community)
* [Roadmap](ROADMAP.md)

If you have a question, a Slack channel is available at: [openonderwijsapi.slack.com](https://openonderwijsapi.slack.com).

Currently there are 2 main branches:

* [master](https://github.com/open-education-api/specification/tree/master) (Current version - v3)
* [v2](https://github.com/open-education-api/specification/tree/v2) (Previous version - v2)

## Operating area and Application

The Open Education API is typically used to make educational data available. With educational data we mean
the data that is typically stored in the educational systems like the Student Information System (SIS), the Learning Management System (LMS) etc. Think of marks and study credits, couse information, schedules and timetables.
Education institutions can now publish this educational data in a standardised way by implementing their own Open Education API, following the the Open Education API specification. By doing so, application developers can then integrate education data that has been made available by the Open Education API implementations of the different education institutions in an uniform way, into new exiting applications.
See for more information about this project: https://openonderwijsapi.nl/en/

## Documentation

The specification can be rendered as HTML documentation:

* [API Reference Documentation](https://open-education-api.github.io/specification/docs.html)

## Development

To render the reference documentation locally during development, you can start a [Docker](https://www.docker.com/community-edition/) container:

```
docker run --rm -p 8080:80 -v ${PWD}:/usr/share/nginx/html nginx:alpine
```

Now you can view the docs in your web browser: http://localhost:8080/docs.html

## Contributing

The Open Education API is an open source, community-driven project. If you'd like to contribute, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## Maillist
A public mailinglist is available. Users can subscripe at:
https://list.surfnet.nl/mailman/listinfo/openonderwijsapi

## Community

The Open Education API is driven by the [Open Education API Working Group](https://openonderwijsapi.nl/en/community/). The working group includes representatives of higher education institutions and suppliers.
