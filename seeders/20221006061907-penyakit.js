'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_penyakit', [{
      nama_penyakit: 'Penyakit 1',
      gejala: 'Gejala 1',
      penanganan: 'Penanganan 1',
    },
    {
      nama_penyakit: 'Penyakit 2',
      gejala: 'Gejala 2',
      penanganan: 'Penanganan 2',
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_penyakit', null, {});
  }
};
