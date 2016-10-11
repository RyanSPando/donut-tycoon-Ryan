const knex = require('../db/connection.js');

function getDonuts() {
  return knex('donut');
}

function getDonut(id) {
  return knex('donut').where('id', id);
}

function newDonut(newDonut) {
  return knex('donut')
          .insert(newDonut)
          .returning('*');
}

function editDonut(editedDonut, id) {
  return knex('donut')
          .where('id', id)
          .update(editedDonut, '*');
}

function deleteDonut(id) {
  return knex('donut')
          .where('id', id)
          .del();
}

function joinStoreDonut(id) {
  return knex('donut')
          .select('donut.name AS donut_name', 'shop.id as shop_id', '*')
          .join('shop_donut', 'donut.id', 'shop_donut.donut_id')
          .join('shop', 'shop_donut.shop_id', 'shop.id')
          .where('donut.id', id);
}

module.exports = {
  getDonuts,
  newDonut,
  editDonut,
  deleteDonut,
  joinStoreDonut,
  getDonut
};
