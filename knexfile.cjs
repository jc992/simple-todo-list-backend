require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING || {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    migrations: {
      directory: 'src/database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: 'src/database/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING || {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING || {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
