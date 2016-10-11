const express = require('express');
const router = express.Router();
const helper = require('../controllers/donuts');
const helperShop = require('../controllers/shops');

router.get('/', (req, res, next) => {
  helper.getDonuts().then((donuts) => {
    const renderObject = {};
    renderObject.title = 'Donuts';
    renderObject.donuts = donuts;
    res.render('donuts', renderObject);
  });
});

router.get('/newDonut', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Add new Donut';
  res.render('newDonut', renderObject);
});

router.post('/', (req, res, next) => {
  helper.newDonut(req.body).then((shop) => {
    res.redirect('donuts');
  });

});

router.get('/:id', (req, res, next) => {
  const renderObject = {};

  helper.joinStoreDonut(req.params.id).then(shops => {
    if (shops[0]) {
      renderObject.title = shops[0].donut_name;
    }
    else {
      renderObject.title = null;
    }
    helper.getDonut(req.params.id).then(donut => {
      renderObject.shops = shops;
      renderObject.donut = donut[0];
      res.render('donut', renderObject);
    });
  });

});

router.get('/:id/edit', (req, res, next) => {
  const renderObject = {
    name: req.query.name,
    topping: req.query.topping,
    price: parseInt(req.query.price),
    id: req.params.id,
    title: `Edit ${req.query.name}`
  };
  helperShop.getShops().then(shops => {
    renderObject.shops = shops;
    res.render('editDonut',renderObject);
  });

});

router.put('/:id/edit', (req, res, next) => {
  helper.editDonut(req.body, req.params.id).then((shop) => {
    res.redirect('/donuts');
  });
});

router.delete('/:id/delete', (req, res, next) => {
  helper.deleteDonut(req.params.id).then(deletedDonut => {
    res.redirect('/donuts');
  });
});

module.exports = router;
