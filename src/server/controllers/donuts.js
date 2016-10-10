const knex = require('../db/connection.js');

function getDonuts() {
  return knex('donut');
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

module.exports = {
  getDonuts,
  newDonut,
  editDonut,
  deleteDonut
};
