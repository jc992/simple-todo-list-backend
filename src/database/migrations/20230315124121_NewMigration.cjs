
exports.up = function(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary();
    table.enum('state', ['INCOMPLETE', 'COMPLETE']);
    table.text('description').notNullable();
    table.dateTime('createdAt').notNullable();
    table.dateTime('completedAt');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
