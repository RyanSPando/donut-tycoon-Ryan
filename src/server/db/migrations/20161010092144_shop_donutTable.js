
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shop_donut', (table) => {
    table.increments();
    table.integer('shop_id');
    table.foreign('shop_id').references('id').inTable('shop');
    table.integer('donut_id');
    table.foreign('donut_id').references('id').inTable('donut');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shop_donut');
};
