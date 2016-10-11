(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const shops = require('../routes/shops');
    const donuts = require('../routes/donuts');
    const employees = require('../routes/employees');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/shops', shops);
    app.use('/donuts', donuts);
    app.use('/employees', employees);

  };

})(module.exports);
