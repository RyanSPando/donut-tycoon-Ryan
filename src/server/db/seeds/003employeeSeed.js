var faker = require('faker');

exports.seed = (knex, Promise) => {
  return knex.raw('truncate table employee CASCADE').then(() => {
    return knex('shop').max('id').then(shops=> {
      const maxShops = shops[0].max;
      const minShops = maxShops - 3;
      return knex('donut').max('id').then(donuts => {
        const maxDonuts = donuts[0].max;
        const minDonuts = maxDonuts - 3;
        let promises = [];
        for (let i = 0; i < 2; i++) {
          let promise = knex('employee').insert({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            favorite_donut: faker.random.number({min: minDonuts, max: maxDonuts}),
            shop_id:faker.random.number({min: minShops, max: maxShops})
          });
          promises.push(promise);
        }
        return Promise.all(promises);
      });
    });
  });
};
