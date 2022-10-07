'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_timbangan', [
    {
      id_ternak: 1,
      rf_id: 'RFID 1',
      berat: 100,
      suhu: 100
    },
    {
      id_ternak: 2,
      rf_id: 'RFID 2',
      berat: 100,
      suhu: 100
    },
    {
      id_ternak: 2,
      rf_id: 'RFID 1',
      berat: 100,
      suhu: 100
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_timbangan', null, {});
  }
};
