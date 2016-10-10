const express = require('express');
const router = express.Router();
const helper = require('../controllers/shops');

router.get('/', (req, res, next) => {
  helper.getShops().then((shops) => {
    const renderObject = {};
    renderObject.title = 'Shops';
    renderObject.shops = shops;
    res.render('shops', renderObject);
  });
});

router.get('/newShop', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Add new Shop';
  res.render('newShop', renderObject);
});

router.post('/', (req, res, next) => {
  helper.newShop(req.body).then((shop) => {
    res.redirect('shops');
  });

});

router.get('/:id', (req, res, next) => {
  const renderObject = {};
  let shopEmployeePromise = helper.joinStoreEmployee(req.params.id);
  let shopDonutPromise = helper.joinStoreDonut(req.params.id);
  Promise.all([shopEmployeePromise, shopDonutPromise]).then(resolvedPromises => {
    console.log(resolvedPromises[0]);
    renderObject.title = resolvedPromises[0][0].store_name;
    renderObject.employees = resolvedPromises[0];
    renderObject.donuts = resolvedPromises[1];
    res.render('shop', renderObject);
  });

});

router.get('/:id/edit', (req, res, next) => {
  const renderObject = {
    name: req.query.name,
    city: req.query.city,
    id: req.params.id,
    title: `Edit ${req.query.name}`
  };
  res.render('editShop',renderObject);
});

router.put('/:id/edit', (req, res, next) => {
  helper.editShop(req.body, req.params.id).then((shop) => {
    res.redirect('/shops');
  });
});

router.delete('/:id/delete', (req, res, next) => {
  helper.deleteShop(req.params.id).then(deletedShop => {
    res.redirect('/shops');
  });
});

module.exports = router;
