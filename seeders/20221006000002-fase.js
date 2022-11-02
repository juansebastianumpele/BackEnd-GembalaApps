'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase', [
      {
        fase: "Pemasukan"
      },
      {
        fase: "Adaptasi"
      },
      {
        fase: "Waiting List Perkawinan"
      },
      {
        fase: "Proses Perkawinan"
      },
      {
        fase: "Kebuntingan"
      },
      {
        fase: "Kelahiran"
      },
      {
        fase: "Lepas Sapih"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_fase', null, {});
  }
};
