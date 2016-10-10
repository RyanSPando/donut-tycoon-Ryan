const express = require('express');
const router = express.Router();
const knex = require('../db/connection.js');

router.get('/shops', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Shops';
  res.render('shops', renderObject);
});

// shop index	GET	/shops	/shops
// shop show page	GET	/shops/1/show	/shops/:id
// shop edit	GET	/shops/1/edit	/shops/:id/edit
// shop update	POST	/shops/edit	/shops/edit
// shop new page	GET	/shops/new	/shops/new
// shop create	POST	/shops	/shops
// shop destroy	POST	/shops/1/delete	/shops/:id/delete
