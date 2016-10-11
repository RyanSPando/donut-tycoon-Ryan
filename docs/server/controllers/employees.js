const knex = require('../db/connection.js');

function getEmployees() {
  return knex('employee');
}

function newEmployee(newEmployee) {
  return knex('employee')
          .insert(newEmployee)
          .returning('*');
}

function editEmployee(editedEmployee, id) {
  return knex('employee')
          .where('id', id)
          .update(editedEmployee, '*');
}

function deleteEmployee(id) {
  return knex('employee')
          .where('id', id)
          .del();
}

function joinStoreEmployee(id) {
  return knex('employee')
          .select('employee.id as employee_id', 'shop.name as shop_name', '*')
          .join('shop', 'shop.id', 'employee.shop_id')
          .join('donut', 'employee.favorite_donut', 'donut.id')
          .where('employee.id', id);
}

module.exports = {
  getEmployees,
  newEmployee,
  editEmployee,
  deleteEmployee,
  joinStoreEmployee
};
