'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase_pemeliharaan', [{
      fase: 'fase 1',
    },{
      fase: 'fase 2',
    },{
      fase: 'fase 3',
    },{
      fase: 'fase 4',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_fase_pemeliharaan', null, {});
  }
};
