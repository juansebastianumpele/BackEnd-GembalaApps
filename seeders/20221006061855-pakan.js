'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_pakan', [{
      id_peternakan: 1,
      nama_pakan: 'Pakan 1',
      interval_pakan: 10,
      satuan: 'Tong',
      komposisi: 'Komposisi 1',
      nutrien: 'Nutrien 1',
    },
    {
      id_peternakan: 2,
      nama_pakan: 'Pakan 2',
      interval_pakan: 10,
      satuan: 'Tong',
      komposisi: 'Komposisi 2',
      nutrien: 'Nutrien 2',
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_pakan', null, {});
  }
};
