'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_adaptasi', [
      {
        id_ternak: 1,
        id_treatment: 1,
        status: true,
        tanggal_treatment: new Date(),
      },
      {
        id_ternak: 1,
        id_treatment: 2,
        status: true,
        tanggal_treatment: new Date(),
      },
      {
        id_ternak: 1,
        id_treatment: 3,
        status: false,
        tanggal_treatment: null,
      },
      {
        id_ternak: 2,
        id_treatment: 1,
        status: false,
        tanggal_treatment: null,
      },
      {
        id_ternak: 2,
        id_treatment: 2,
        status: false,
        tanggal_treatment: null,
      },
      {
        id_ternak: 2,
        id_treatment: 3,
        status: false,
        tanggal_treatment: null,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_adaptasi', null, {});
  }
};
