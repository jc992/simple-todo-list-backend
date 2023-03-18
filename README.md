# Simple TODO Api using Hapi.js and Knex

This is a simple project using Hapi.js to build an API for managing a TODO list, backed up by Knex.

## Getting started

1. Copy .env.sample to .env
2. Create a local PostgreSQL instance
3. Setup environment variable (PG_CONNECTION_STRING=<connection_string_to_database>)
4. Run ```yarn knex:migration:run```. Now you have the tables
5. Run ```yarn start```

## Swagger Documentation
Access http://localhost:{port}/documentation while project is running.
