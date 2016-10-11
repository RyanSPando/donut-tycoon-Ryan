
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shop', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.text('city').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shop');
};
