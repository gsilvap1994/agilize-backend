# AGILIZE-BACKEND

This repository is the backend for the Agilize project. This project was built using NestJs, Prisma, GraphQL and Apollo. This project is hosted in Heroku.

## Prerequisites

Before runnning this project locally, you need to have installed:

- Node v16 or greater

## Start developing

Run the following commands to start the project in your local environment:

```bash
git clone
npm install
npm run start:dev:watch
```

THen you can navigate to [GraphQL](http://localhost:3000/) and start querying and playing with Apollo Server.

## CI/CD/Deploy

This repository is connected to heroku, every new PR approved triggers the CI/CD pipeline, after that, if tests run exits with no failure, it's deployed a new version to the Heroku instance, the url is https://agilize-api-39c04c08f2cc.herokuapp.com/.
