'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_peternakan', [
      {
        nama_peternakan: "Texley Ranch",
        alamat: "Selomartani, Kalasan, Sleman, Yogyakarta",
      },
      {
        nama_peternakan: "Gembala Farm",
        alamat: "Selomartani, Kalasan, Sleman, Yogyakarta"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_peternakan', null, {});
  }
};
