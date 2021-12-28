# Color management app - CLIENT

This is the frontend part of a color management dashboard. The application is built with React using CRA, react-router, and CSS modules.

# Get started

To start the application simply clone the repository, set the `REACT_APP_API_URL` environment variable if needed, and run 

```
npm install
npm start
```

To connect it to the server check out the [Server README.md](server/README.md).

# Overview

This application is using the [ant-design](https://github.com/ant-design/ant-design) UI library.

All API-related logic is in the [useColors](src/hooks/useColors.tsx) hook.

Once the application is mounted, this hook will attempt to fetch all the colors in the database, and store it in a global context.

# Tests

React testing library and jest has been used to create unit tests. The server responses are mocked with [nock](https://github.com/nock/nock).

As a general rule, the tests are mainly focused on testing what is rendered to the screen and not the implementation details.

For example, if the delete button is clicked, the tests should not check if the axios.delete function has been called, they should check that the color has been removed from the dashboard or not.

To run tests simply issue `npm test` in the root directory.

# Improvement opportunities

As it has been mentioned before, on application mount all the items in the database are fetched. This is fine for this smaller application, but can cause performance issues with larger quantities.

As a more scalable solution, you could implement a pagination system, meaning on the table view, you only query for a subset of all data and on color view, you only query for the current color.