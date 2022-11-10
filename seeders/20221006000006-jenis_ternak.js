'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_ternak', [
      {
        jenis_ternak: "Indukan"
      },
      {
        jenis_ternak: "Pejantan"
      },
      {
        jenis_ternak: "Cempe"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_ternak', null, {});
  }
};
