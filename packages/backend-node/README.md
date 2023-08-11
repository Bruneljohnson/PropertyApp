# PropertyApp TypeScript Express Backend Server

![node](https://img.shields.io/badge/node-v18.16.0-green) ![node](https://img.shields.io/badge/scripting%E2%80%94language-typescript-blue) ![docker](https://img.shields.io/badge/docker-support-red)

![Documentation](https://img.shields.io/badge/Documentation%20via-README%20|%20FAQs%20|%20Swagger%20docs-lightgrey)

A REST API built using TypeScript, Node.JS server that returns bios of employees.

- [Prerequisites](#prerequisites)
- [Quick overview](#quick-overview)
  - [Authentication](#authentication)
  - [Project Structure](#project-structure)
  - [Git Conventions](#git-conventions)
  - [Gitlab CI Pipeline](#gitlab-ci-pipeline)
  - [Slides](#slides)
- [Local/native environment](#localnative-environment)
  - [Install app](#install-app)
  - [Run app](#run-app)
- [Docker environment](#docker-environment)
  - [Build image](#build-image)
  - [Run container](#run-container)
- [RESTAPI endpoint](#restapi-endpoint)
- [RESTAPI docs](#restapi-docs)
- [Testing](#testing)
- [About the data](#about-the-data)
- [Project Management](#project-management)
- [Design docs](#design-docs)
- [Frequently asked questions](docs/faq.md)

## Prerequisites

- **[node](https://nodejs.org/en/download/)** v18.x.x or higher
- **[npm]** v8.x.x or higher
- **[Docker]**(https://docs.docker.com/get-docker/) 20.x.x or higher

## Quick overview

### Authentication

This application uses Auth0 as its authentication provider. For more information on how we have set up authentication click [here](https://anddigitaltransformation.atlassian.net/wiki/spaces/CHA/pages/4465917998/Authentication)

### Project structure

Apollo is using a Monorepo with npm workspaces.

- **Api**: Is where the backend application in located.
- **Web**: Is where the frontend application in located.
- **Infrastructure**: Is where the aws cloud operations are located.

The project structure within API is as following:

- All file names are written in kabab-case.

* **build**: Contains the converted javascript files when typescript is compiled.
* **src**: This is where our typescript files live.
  - **mocks**: Contains the functions that create mock data and auth verification for tests (`jest.setup.ts`)
  - **config**: Contains the set up files for the S3 Bucket (For image uploading) and the functions to get AUTH0 Management API Tokens and user info.
  - **config/database**: Contains the MongoDB database connection (`db.ts`). It also contains the folder called **files** that contains the JSON for stubbed bios and its function that populates the database (`database.ts`)
  - **controllers**: The controllers handles all the logic coming from services. (`handler-refactory.ts`)
  - **error**: The middleware that handles errors is in this folder. (`App-error.ts`)
  - **filtering**: The functions that handle query validation and filtering for GET requests. (`Api-features.ts`)
  - **middleware**: This contains the custom middlewares for the application, houses the auth middleware that'll be used across the app.(`auth.ts`)
  - **models**: The schema definition of the Model (the structure or shape of documents within a collection in mongodb) and it's types.(`bio.ts`)
  - **routes**: The routes that handles access to our apps resources - each service has its own router. (`employee-bio-router.ts`)
  - **services**: The services contains the database queries and returning objects or throwing errors.(`bio-service.ts`)
  - **types**: Where app-wide types are stored. (`environment.d.ts`)

### Git Conventions

Get more information about Apollo's Git conventions [here](https://anddigitaltransformation.atlassian.net/wiki/spaces/CHA/pages/4251189262/GIT+Branching+and+Commits)

### Gitlab CI Pipeline

Get more information about Apollo's Gitlab CI Pipeline [here](https://anddigitaltransformation.atlassian.net/wiki/spaces/CHA/pages/4212195376/Infrastructure) or alternatively Speak to Jonathan Gilroy-Powell, Davaasuren Dorjdagva or Nathan Askew.

### Slides

Get more detailed information about the project in this [Slide](https://docs.google.com/presentation/d/18-tW_807J_Gzv4q57ZXpAM8AfaxGa1msTbBVqUtv5BQ/edit#slide=id.p).

[Back to ToC](#apollo-typescript-express-backend-server)

## Local/Native Environment

- **NODE_ENV**: Is by default set to devolopment.

### Install App

You'll need SSH keys to clone the Repository

```bash
$ git clone git@git.core.and-digital.com:hamilton/apollo.git
$ cd api
$ npm install
```

### Run App

Go into the root folder of the project, and also make sure no instance of the app is running on this machine before running the below:

```bash
$ npm start -w apollo-backend
```

The above runs the app and listens on port 8080, if this port is not available or if you wish to run it on a different port then do the below:

```bash
$ PORT=<another port number> npm start -w apollo-backend
```

Once the server is up and running, you can also take a look at the [RESTAPI endpoint](#restapi-endpoint) and [RESTAPI docs](#restapi-docs) resources to see how to call the endpoint in your application or via postman, and what results to expect.

[Back to ToC](#apollo-typescript-express-backend-server)

## Docker Environment

This section expects familiarity about Docker concepts and using Docker. Use docker image builds as an additional way to check for application development time and runtime reliability, integrity and portability in an isolated environment.

Ensure that Docker Daemon is running and you see the whale-carrying-containers icon on your taskbar or in your activity/process manager, before going further to the next sub-section.

### Build Image

**Note** make sure you are in the root folder of api.

```bash
$ cd api
$ docker build -t {your-dockerhub-username}/apollo-backend:latest -f ./Dockerfile .
```

_Please build the image the first time and rebuild it each time the project changes in order to be in sync with the changes._

### Run Container

Go into the root folder of the project, and also make sure no instance of the app is running on this machine before running the below:

```bash
$ docker run -d -p 8080:80 --name apolloserver {your-dockerhub-username}/apollo-backend:latest
```

Once the server is up and running, you can also take a look at the [RESTAPI endpoint](#restapi-endpoint) and [RESTAPI docs](#restapi-docs) resources to see how to call the endpoint in your application or from the command-line, and what results to expect.

## RESTAPI Endpoint

To access the RESTAPI endpoints you'll need to generate a developers access token from Auth0.

To do this:

```bash
$ curl --request POST \
  --url https://dev-apollo.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"tgLhR6que9yZ92Pb4Ai8R5Pa4XUMl2CT","client_secret":"-rHBmPaGzG4rcokp9t6uXYnHNb42XTS1BP6jfYYYQf5fpilQhg0isayB7-7cqWPM","audience":"Apollo","grant_type":"client_credentials"}'
```

or

```
console log the getTestAccessToken() in the get-management-accesstoken.ts
```

You can access the RESTAPI endpoint:

http://localhost:8080/api/bios (with the access token.)

and you get an output like this: (this is the just an example of how the data looks like.)

```json
[
  {
    "user": "auth0|64b19441b2388ad0d32fd52a",
    "name": "Zachary Cook",
    "andTitle": "World Foodie",
    "bioName": "Financial Bio",
    "imageUrl": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    "squad": "Nova",
    "jobTitle": "Product Developer",
    "level": "2.2",
    "overview": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "coreFocus": "Full Stack Development",
    "keySkills": ["Teamwork", "Test Driven Development", "Problem Solving"],
    "experience": [
      {
        "jobTitle": "Software Developer",
        "clientName": "Sky",
        "outcomes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "engagementDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        "jobTitle": "Junior Software Developer",
        "clientName": "Monzo",
        "outcomes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        "engagementDescription": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        "jobTitle": "Designer",
        "clientName": "Apple",
        "outcomes": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "engagementDescription": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ],
    "keyClients": ["Lloyds Bank", "Frasers Group", "Sky", "Monzo", "Apple"],
    "industryExpertise": ["Banking", "Retail", "Entertainment", "Technology"],
    "tools": ["React", "JavaScript", "Node.js", "AWS", "Python", "Django"]
  }
]
```

[Back to ToC](#apollo-typescript-express-backend-server)

## RESTAPI Docs

We can get access to Swagger generated docs showing how the REST API endpoints are defined and can be accessed, by opening http://localhost:8080/api/api-docs in the browser.

We can see something like this in the browser:
![Swagger UI in the browswer ](./docs/swagger-ui-in-the-browser.jpg)

## Testing

The Backend is using Test Containers which allow us to spin up a docker container to test our apps connection with the database. This is better than mocking as we get to see if our tests pass in a real environment.

This would require that the developers Docker Deamon is running.

For the first few times the tests may fail to run - indicating a Docker strategy is missing.

```
Ctrl + C  - then re-run the tests again (do for a few times till it starts working.)
```

Every now and again clear the jest

```bash
$ cd api
$ npm run clear-jest
```

## Design Docs

See [Data Models](https://www.figma.com/file/uVRBqGiNfOgHs8xdaO115r/Apollo-Bios-Designs?type=design&mode=design&t=RE7iiPZk3Cdj9IRN-0) on the project wiki.

## Project Management

You can find the board for the [Apollo project here](https://anddigitaltransformation.atlassian.net/jira/software/projects/AP/boards/642) showing the latest progress of the project.

[Back to ToC](#apollo-typescript-express-backend-server)
