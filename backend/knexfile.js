// Update with your config settings.

module.exports = {
    client: 'mssql',
    connection: {
      database: 'AppNode',
      user:     'sa',
      password: 'Extr@123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
