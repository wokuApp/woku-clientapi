# woku-clientapi

This project is a REST API for creating and rating wokus in our clients' applications. This application acts as an intermediary with the main woku server.

## Technology Stack

- **Framework**:
  Developed using NestJS with Express in TypeScript.

- **Deployment**:
  Dockerized and deployed through GitHub Actions to Azure Container Registry, and continuously deployed to Azure App Service.

## Prerequisites

Node.js and npm

## Installation and Running

### Installation

```bash
npm ci
```

### Running the app

Development

```bash
npm run start
```

Watch mode

```bash
npm run start:dev
```

Production mode

```bash
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# watch tests
$ npm run test:watch
```

## Branching and Deployment Strategy

1. **Develop Branch**:
   Default development branch. Dockerized and hosted on Azure Container Registry and deployed on Azure App Service. Access the API in development at [https://woku-clientapi-dev.azurewebsites.net](https://woku-clientapi-dev.azurewebsites.net).

2. **Main Branch**:
   Similar DevOps as develop. Production API available at [https://clientapi.woku.app](https://clientapi.woku.app).

## Documentation

The `woku-clientapi` is documented using Swagger in NestJS. This documentation covers the various endpoints, expected request/response structures. For more thorough and comprehensive documentation, review [API.md](API.md).

You can access the documentation for each environment as follows:

- **Development Environment**: For the development version of the API, access the documentation at [https://woku-clientapi-dev.azurewebsites.net/documentation](https://woku-clientapi-dev.azurewebsites.net/documentation). Ideal for working on or testing new features.

- **Local Environment**: When running the server locally, the documentation is available at [http://localhost:3000/documentation](http://localhost:3000/documentation). Useful for developers referring to the documentation while working on the local version of the API.

- **Production Environment**: For the main production version, the documentation can be found at [https://clientapi.woku.app/documentation](https://clientapi.woku.app/documentation). This is the definitive reference for users and developers interacting with the stable production version of the API.

The Swagger documentation provides a user-friendly interface, allowing for easy exploration, testing, and interaction with the API endpoints directly through the browser.

Note: A GET request to any main link should return "woku client api ⭐️💬". For local development, set up a .env file in the root of the project with the variable PORT=3000 and specify in the API variable the access to the main woku server in development or production.

## Contributing

Currently, this project is contributions are limited to internal members of [woku](https://woku.app).

## License

This project is under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Diego Orrego Brito - [@diorrego](https://github.com/diorrego) - diego@woku.app
