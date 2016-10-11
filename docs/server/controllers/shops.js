const knex = require('../db/connection.js');

function getShops() {
  return knex('shop');
}

function newShop(newShop) {
  return knex('shop')
          .insert(newShop)
          .returning('*');
}

function editShop(editedShop, id) {
  return knex('shop')
          .where('id', id)
          .update(editedShop, '*');
}

function deleteShop(id) {
  return knex('shop')
          .where('id', id)
          .del();
}

function joinStoreDonut(id) {
  return knex('shop')
          .select('shop.name AS store_name', 'donut.id as donut_id', '*')
          .join('shop_donut', 'shop.id', 'shop_donut.shop_id')
          .join('donut', 'shop_donut.donut_id', 'donut.id')
          .where('shop.id', id);
}

function joinStoreEmployee(id) {
  return knex('shop')
          .select('shop.name AS store_name', 'employee.id as employee_id', '*')
          .join('employee', 'shop.id', 'employee.shop_id')
          .join('donut', 'employee.favorite_donut', 'donut.id')
          .where('shop.id', id);
}

module.exports = {
  getShops,
  newShop,
  editShop,
  deleteShop,
  joinStoreEmployee,
  joinStoreDonut
};
