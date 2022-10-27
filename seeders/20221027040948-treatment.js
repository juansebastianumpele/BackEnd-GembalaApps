'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_treatments', [
      {
        treatment: "Vaksin",
        day: 1,
      },
      {
        treatment: "Vaksin 2",
        day: 2, 
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_treatments', null, {});
  }
};
