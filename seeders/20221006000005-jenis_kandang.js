'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_kandang', [
    {
      jenis_kandang: 'Kandang Sapi',
    },
    {
      jenis_kandang: 'Kandang Kambing',
    },
    {
      jenis_kandang: 'Kandang Ayam',
    },
    {
      jenis_kandang: 'Kandang Bebek',
    },
    {
      jenis_kandang: 'Kandang Itik',
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_kandang', null, {});
  }
};
