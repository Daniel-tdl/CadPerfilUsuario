
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.string('nome').notnull()
        table.string('usuario').notnull()
        table.string('senha').notnull()
        table.string('pathImagem')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios')
};
