'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      hashedPassword: bcrypt.hashSync('password'),
      owner: false
    },
    {
      email: faker.internet.email(),
      username: 'FakeUser1',
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      owner: false
    },
    {
      email: faker.internet.email(),
      username: 'FakeUser2',
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      owner: false
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', {
    username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
  }, {});
  }
};
