var faker = require('faker');

exports.seed = (knex, Promise) => {
  return knex.raw('truncate table donut CASCADE').then(() => {
    return knex('donut').then(events => {
      const promises = [];
      for (let i = 0; i < 4; i++) {
        let promise = knex('donut').insert({
          name: faker.name.firstName(),
          topping: faker.company.bs(),
          price: faker.random.number({min: 1.00, max: 6.00})
        });
        promises.push(promise);
      }
      return Promise.all(promises);
    });
  });
};
