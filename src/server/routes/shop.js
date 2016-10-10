const express = require('express');
const router = express.Router();
const knex = require('../db/connection.js');

// employee index	GET	/employees	/employees
// employee show page	GET	/employees/1/show	/employees/:id
// employee edit	GET	/employees/1/edit	/employees/:id/edit
// employee update	POST	/employees/edit	/employees/edit
// employee new page	GET	/employees/new	/employees/new
// employee create	POST	/employees	/employees
// employee destroy	POST	/employees/1/delete
