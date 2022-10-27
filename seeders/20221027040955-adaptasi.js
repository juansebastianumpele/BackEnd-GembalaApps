'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_adaptasi', [
      {
        id_ternak: 1,
        id_treatment: 1,
      },
      {
        id_ternak: 1,
        id_treatment: 2,
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_adaptasi', null, {});
  }
};
