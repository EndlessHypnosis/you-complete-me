
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/you_complete_me',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/you_complete_me_test',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    /* eslint-disable prefer-template */
    connection: process.env.DATABASE_URL + '?ssl=true',
    /* eslint-enable prefer-template */
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },

};
