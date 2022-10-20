'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_pakan', [{
      id_user: 2,
      nama_pakan: 'Pakan 1',
      interval_pakan: 10,
      satuan: 'Tong',
      komposisi: 'Komposisi 1',
      nutrien: 'Nutrien 1',
    },
    {
      id_user: 3,
      nama_pakan: 'Pakan 2',
      interval_pakan: 10,
      satuan: 'Tong',
      komposisi: 'Komposisi 2',
      nutrien: 'Nutrien 2',
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_pakan', null, {});
  }
};
