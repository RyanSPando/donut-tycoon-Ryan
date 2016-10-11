const express = require('express');
const router = express.Router();
const helper = require('../controllers/employees');
const helperDonut = require('../controllers/donuts');
const helperShop = require('../controllers/shops');

router.get('/', (req, res, next) => {
  helper.getEmployees().then((employees) => {
    const renderObject = {};
    renderObject.title = 'Employees';
    renderObject.employees = employees;
    res.render('employees', renderObject);
  });
});

router.get('/newEmployee', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Add new Employee';
  let donutPromise = helperDonut.getDonuts();
  let shopPromise = helperShop.getShops();

  Promise.all([donutPromise, shopPromise])
  .then(returnedPromises => {
    renderObject.donuts = returnedPromises[0];
    renderObject.shops = returnedPromises[1];
    res.render('newEmployee', renderObject);
  });
});

router.post('/', (req, res, next) => {
  helper.newEmployee(req.body).then((shop) => {
    res.redirect('employees');
  });

});

router.get('/:id', (req, res, next) => {
  const renderObject = {};

  helper.joinStoreEmployee(req.params.id)
  .then(employee => {
    if (employee[0]) {
      renderObject.title = employee[0].first_name + ' ' + employee[0].last_name;
    }
    else {
      renderObject.title = null;
    }
    renderObject.employee = employee[0];
    res.render('employee', renderObject);
  });

});

router.get('/:id/edit', (req, res, next) => {
  const renderObject = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    email: req.query.email,
    id: req.params.id,
    favorite_donut: req.query.favorite_donut,
    shop_id: req.query.shop_id,
    title: `Edit ${req.query.first_name} ${req.query.last_name}`
  };

  let donutPromise = helperDonut.getDonuts();
  let shopPromise = helperShop.getShops();

  Promise.all([donutPromise, shopPromise])
  .then(returnedPromises => {
    renderObject.donuts = returnedPromises[0];
    renderObject.shops = returnedPromises[1];
    res.render('editEmployee',renderObject);
  });

});

router.put('/:id/edit', (req, res, next) => {
  helper.editEmployee(req.body, req.params.id).then((shop) => {
    res.redirect('/employees');
  });
});

router.delete('/:id/delete', (req, res, next) => {
  helper.deleteEmployee(req.params.id).then(deletedEmployee => {
    res.redirect('/employees');
  });
});

module.exports = router;
