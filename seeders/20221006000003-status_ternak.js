'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_status_ternak', [
      {
        status_ternak: "cempe"
      },
      {
        status_ternak: "indukan"
      },
      {
        status_ternak: "pejantan"
      },
      {
        status_ternak: "bunting"
      },
      {
        status_ternak: "abortus"
      },
      {
        status_ternak: "kelahiran"
      },
      {
        status_ternak: "lepas sapih"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_status_ternak', null, {});
  }
};
