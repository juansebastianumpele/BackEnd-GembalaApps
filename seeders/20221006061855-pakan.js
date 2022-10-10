'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_pakan', [{
      nama_pakan: 'Pakan 1',
      jenis_pakan: 'Pakan 1',
      komposisi: 'Pakan 1',
      stok: 100,
      satuan: 'Kg',
    },
    {
      nama_pakan: 'Pakan 2',
      jenis_pakan: 'Pakan 2',
      komposisi: 'Pakan 2',
      stok: 100,
      satuan: 'Kg',
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_pakan', null, {});
  }
};
