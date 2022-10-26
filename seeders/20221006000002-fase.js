'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase', [
      {
        fase: "pemasukan"
      },
      {
        fase: "adaptasi"
      },
      {
        fase: "waiting list perkawinan"
      },
      {
        fase: "proses perkawinan"
      },
      {
        fase: "kebuntingan"
      },
      {
        fase: "kelahiran"
      },
      {
        fase: "lepas sapih"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_fase', null, {});
  }
};
