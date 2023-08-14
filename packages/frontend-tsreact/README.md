# The PropertyApp TypeScript React Frontend Application

main branch: https://github.com/Bruneljohnson/PropertyApp/tree/main/packages/frontend-react

# Documentation

A React frontend application built using TypeScript, Node.js, and various supporting packages to display property listings.

## Prerequisites

- **[node](https://nodejs.org/en/download/)** v18.x.x or higher
- **npm** v8.x.x or higher

# Quick Overview

### Project structure

The PropertyApp is using a Monorepo with npm workspaces.

- **Packages**: Is where the all the packages of our application live.
  - **Backend-Node**: Is where the backend NodeJS application in located.
  - **Frontend-TSReact**: Is where the frontend React application in located.

The project structure is a a typical Typescript React Application

# Folder structure

- **public**: Contains the HTML template and other static files.
- **build**: Contains the converted javascript files when typescript is compiled.
- **src**: This is where our typescript files live.

  - **assets**: Contains images, icons, or other assets used in the application. (`error.png`)
  - **components**: Contains reusable React components used throughout the application.
    - **atoms**:
    - **molecules**:
    - **organisims**:
    - **pages**:
    - **templates**:
  - **config**: Contains the set up varibles used within the application (`listing-config.ts`).
  - **filters**: Contains the files resposible for making filtering within the application possible. (`filter-listings.ts`).
  - **hooks**: Contains custom hooks used in the application. (`useFetch.ts`)
  - **mocks**: Contains the files used for test our application. (`listings.ts`)
  - **Providers**: Contains files that allow use to utilise CONTEXT throughout our application. (`ListingFitersProvider.ts`)
  - **themes**: Contains files for our Mui theme and component library.(`theme.ts`)
  - **types**: Where app-wide types are stored. (`environment.d.ts`)
  - **utils**: Contains helper functions for validation and form checks (`validations.ts`)

# Local Development

Before running the frontend application, ensure you have completed the setup for the backend server.
Please read the Backend README file [HERE](https://github.com/Bruneljohnson/PropertyApp/blob/main/packages/backend-node/README.md)

# Install app:

```bash
$ cd packages
$ cd frontend-tsreact
$ npm install
$ npx dotenv-vault login
$ npx dotenv-vault pull
$ npm start
```

The (`npx`) command will grant you access to the .env files for the frontend application.
The above command will run the development server, and the application will be accessible at http://localhost:3000.

[Back to ToC](#the-propertyapp-typescript-react-frontend-application)
