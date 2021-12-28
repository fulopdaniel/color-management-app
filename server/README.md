# Color management app - Server

This is the backend part of a color management dashboard. The application is written in typescript with the [Express.js](https://github.com/expressjs/express) framework.

# Get started

To start the application simply clone the repository, set the `DATABASE_URL` environment variable if needed, and run 

```
npm install
npm run db:push
npm run dev
```

# Overview

This application is a simple REST API. When a request comes in it is propagated as follows:

Request -> Router -> Controller -> Services -> DB

The DB is a postgreSQL instance. This repository uses [Prisma](https://github.com/prisma/prisma) for ORM.

# Tests

Jest and [supertest](https://github.com/visionmedia/supertest) has been used to test this application.

As a general rule, the tests are mainly focused on sending requests to each endpoints, checking edge cases, and asserting responses.

A test database is used for testing, which is resetted on every test run. This means you need to supply a test database string in the `.env.test` file.

To run tests simply issue `npm test` in the root directory.