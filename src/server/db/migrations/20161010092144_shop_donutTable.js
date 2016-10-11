
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shop_donut', (table) => {
    table.increments();
    table.integer('shop_id').references('id').inTable('shop').onDelete('SET NULL').onUpdate('CASCADE');
    table.integer('donut_id').references('id').inTable('donut').onDelete('SET NULL').onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shop_donut');
};
