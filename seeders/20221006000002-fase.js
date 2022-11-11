'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase', [
      {
        fase: 'Pemasukan'
      },
      {
        fase: "Adaptasi 1"
      },
      {
        fase: "Adaptasi 2"
      },
      {
        fase: "Adaptasi 3"
      },
      {
        fase: "Adaptasi 4"
      },
      {
        fase: "Adaptasi 5"
      },
      {
        fase: "Waiting List Perkawinan"
      },
      {
        fase: "Perkawinan"
      },
      {
        fase: "Kebuntingan"
      },
      {
        fase: "Laktasi"
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
