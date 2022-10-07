'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_kawin', [
    {
      id_ternak: 1,
      id_pemacek: 4,
      tanggal_kawin: '2022-12-01',
    },
    {
      id_ternak: 2,
      id_pemacek: 4,
      tanggal_kawin: '2021-12-01',
    },
    {
      id_ternak: 3,
      id_pemacek: 4,
      tanggal_kawin: '2021-12-01',
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_kawin', null, {});
  }
};
