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
        day: 1, 
      },
      {
        treatment: "Vaksin 3",
        day: 2,
      },
      {
        treatment: "Vaksin 4",
        day: 2,
      },
      {
        treatment: "Vaksin 5",
        day: 3,
      },
      {
        treatment: "Vaksin 6",
        day: 3,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_treatments', null, {});
  }
};
