
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('username').notNullable();
    table.text('hash').notNullable();
    table.text('salt').notNullable();
    table.dateTime('createdAt').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
