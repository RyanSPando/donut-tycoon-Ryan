
exports.up = function(knex, Promise) {
  return knex.schema.createTable('employee', (table) => {
    table.increments();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('email').notNullable();
    table.integer('favorite_donut').references('id').inTable('donut').onDelete('SET NULL').onUpdate('CASCADE');
    table.integer('shop_id').references('id').inTable('shop').onDelete('SET NULL').onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('employee');
};
