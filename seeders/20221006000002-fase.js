'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase', [
      {
        fase: "adaptasi 1"
      },
      {
        fase: "adaptasi 2"
      },
      {
        fase: "adaptasi 3"
      },
      {
        fase: "adaptasi 4"
      },
      {
        fase: "adaptasi 5"
      },
      {
        fase: "Waiting List Perkawinan"
      },
      {
        fase: "perkawinan"
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
