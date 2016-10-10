var faker = require('faker');

exports.seed = (knex, Promise) => {
  return knex.raw('truncate table shop_donut CASCADE').then(() => {
    return knex('shop').max('id').then(shops => {
      const maxShops = shops[0].max;
      return knex('donut').orderBy('id').then(donuts => {
        const sortedDonuts = donuts.sort((a,b) => {
            return a.id - b.id;
          });
        const promises = [];
        sortedDonuts.forEach((donut, index) => {
          let promise = knex('shop_donut').insert({
            shop_id: maxShops - index,
            donut_id: donut.id
          });
          promises.push(promise);
        });
        return Promise.all(promises);
      });
    });
  });
};
