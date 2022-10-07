'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_kandang', [{
      kode_kandang: 'Kandang 1',
      jenis_kandang: 'Kandang 1'
    },{
      kode_kandang: 'Kandang 2',
      jenis_kandang: 'Kandang 2'
    },{
      kode_kandang: 'Kandang 3',
      jenis_kandang: 'Kandang 3'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_kandang', null, {});
  }
};
