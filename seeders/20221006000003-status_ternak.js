'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_status_ternak', [
      {
        status_ternak: "Bunting"
      },
      {
        status_ternak: "Tidak Bunting"
      },
      {
        status_ternak: "Abortus"
      },
      {
        status_ternak: "Lepas Sapih"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_status_ternak', null, {});
  }
};
