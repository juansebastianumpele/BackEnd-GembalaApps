'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_timbangan', [
    {
      id_ternak: 1,
      rf_id: '00e2001a83191322050669e0c1ff',
      berat: 24.76,
      suhu: 35
    },
    {
      id_ternak: 1,
      rf_id: '00e2001a83191322050669e0c1ff',
      berat: 25.34,
      suhu: 34
    },
    {
      id_ternak: 1,
      rf_id: '00e2001a83191322050669e0c1ff',
      berat: 26.53,
      suhu: 35
    },
    {
      id_ternak: 2,
      rf_id: '00e2001a83191322780669e0c1ff',
      berat: 24.82,
      suhu: 35
    },
    {
      id_ternak: 2,
      rf_id: '00e2001a83191322780669e0c1ff',
      berat: 25.64,
      suhu: 34
    },
    {
      id_ternak: 2,
      rf_id: '00e2001a83191322780669e0c1ff',
      berat: 26.93,
      suhu: 35
    },
    {
      id_ternak: 3,
      rf_id: '00e2001a83541322780669e0c1ff',
      berat: 24.96,
      suhu: 35
    },
    {
      id_ternak: 3,
      rf_id: '00e2001a83541322780669e0c1ff',
      berat: 25.84,
      suhu: 34
    },
    {
      id_ternak: 3,
      rf_id: '00e2001a83541322780669e0c1ff',
      berat: 26.78,
      suhu: 35
    },
    {
      id_ternak: 4,
      rf_id: '00e2001a83541532780669e0c1ff',
      berat: 31.21,
      suhu: 35
    },
    {
      id_ternak: 4,
      rf_id: '00e2001a83541532780669e0c1ff',
      berat: 32.11,
      suhu: 34
    },
    {
      id_ternak: 4,
      rf_id: '00e2001a83541532780669e0c1ff',
      berat: 33.32,
      suhu: 35
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_timbangan', null, {});
  }
};
