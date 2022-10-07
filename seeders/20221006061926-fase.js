'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_fase_pemeliharaan', [
      {
        fase: 'Cempe',
      },
      {
        fase: 'Lepas Sapih',
      },
      {
        fase: 'Indukan',
      },
      {
        fase: 'Bunting 1',
      },
      {
        fase: 'Bunting 2',
      },
      {
        fase: 'Bunting 3',
      },
      {
        fase: 'Bunting 4',
      },
      {
        fase: 'Laktasi 1',
      },
      {
        fase: 'Laktasi 2',
      },
      {
        fase: 'Laktasi 3',
      },
      {
        fase: 'Laktasi 4',
      },
      {
        fase: 'Abortus 1',
      },
      {
        fase: 'Abortus 2',
      },
      {
        fase: 'Belum Bunting 1',
      },
      {
        fase: 'Belum Bunting 2',
      },
      {
        fase: 'Afkir',
      },
      {
        fase: 'Pejantan',
      },
      {
        fase: 'Lainnya',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_fase_pemeliharaan', null, {});
  }
};
