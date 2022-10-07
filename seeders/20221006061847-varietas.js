'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_varietas', [{
      varietas: 'varietas 1',
    },{
      varietas: 'varietas 2',
    },{
      varietas: 'varietas 3',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_varietas', null, {});
  }
};
