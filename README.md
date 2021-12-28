# Color management app

This is a simple implementation of a color management application that is capable of basic CRUD operations.

The application is separated to a backend and a frontend part - server and client.

# Server

The server is a basic typescript express API, with a postgreSQL database using prisma as an ORM.

[Check out server README.md](server/)

# Client

The client is a basic React application bootstrapped by CRA, using react-router and css modules.

[Check out client README.md](client/)

# Note

.env files are pushed into this repository to showcase how environment variables are stored. In a production environment .env should be a part of gitignore and possibly only injected during deployment.