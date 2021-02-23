// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: '<user>',
      password: '<password>',
      database: 'indexing_samples',
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

};
