
exports.up = function(knex, Promise) {
  return knex.schema.createTable('donut', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.text('topping').notNullable();
    table.integer('price').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('donut');
};
