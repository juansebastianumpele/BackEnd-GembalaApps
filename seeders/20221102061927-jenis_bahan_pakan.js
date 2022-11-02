'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_bahan_pakan', [{
      id_peternakan: 1,
      jenis_bahan_pakan: 'Bongkol Jagung',
      satuan: "Kg",
    },
    {
      id_peternakan: 1,
      jenis_bahan_pakan: 'Premix',
      satuan: "Pcs",
    },
    {
      id_peternakan: 1,
      jenis_bahan_pakan: 'Dedak',
      satuan: "Kg",
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_bahan_pakan', null, {});
  }
};
