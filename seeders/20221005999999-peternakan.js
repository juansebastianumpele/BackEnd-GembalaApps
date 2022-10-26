'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_peternakan', [
      {
        nama_peternakan: "peternakan 1",
        alamat: "alamat 1"
      },
      {
        nama_peternakan: "peternakan 2",
        alamat: "alamat 2"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_peternakan', null, {});
  }
};
