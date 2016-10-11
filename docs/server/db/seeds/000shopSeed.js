var faker = require('faker');

exports.seed = (knex, Promise) => {
  return knex.raw('truncate table shop CASCADE').then(() => {
    return knex('shop').then(events => {
      const promises = [];
      for (let i = 0; i < 4; i++) {
        let promise = knex('shop').insert({
          name: faker.company.companyName(),
          city: faker.address.city()
        });
        promises.push(promise);
      }
      return Promise.all(promises);
    });
  });
};
