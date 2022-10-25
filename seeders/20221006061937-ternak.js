'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('s_ternak', [
      {
        rf_id: "00e2001a83191322050669e0c1ff",
        id_user: 2,
        image: null,
        jenis_kelamin: null,
        id_bangsa: null,
        id_kandang: null,
        id_fp: null,
        id_status_ternak: null,
        id_dam: null,
        id_sire: null,
        berat: 100,
        suhu: 37,
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-11-01 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
      },
      {
        rf_id: "00e2001a83191322780669e0c1ff",
        id_user: 2,
        image: null,
        jenis_kelamin: null,
        id_bangsa: null,
        id_kandang: null,
        id_fp: null,
        id_status_ternak: null,
        id_dam: null,
        id_sire: null,
        berat: 100,
        suhu: 37,
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-11-01 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
      },
      {
        rf_id: "00e2001a83541322780669e0c1ff",
        id_user: 2,
        image: null,
        jenis_kelamin: null,
        id_bangsa: null,
        id_kandang: null,
        id_fp: null,
        id_status_ternak: null,
        id_dam: null,
        id_sire: null,
        berat: 100,
        suhu: 37,
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-01-28 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
      },
      {
        rf_id: "00e2001a83541532780669e0c1ff",
        id_user: 2,
        image: null,
        jenis_kelamin: null,
        id_bangsa: null,
        id_kandang: null,
        id_fp: null,
        id_status_ternak: null,
        id_dam: null,
        id_sire: null,
        berat: 100,
        suhu: 37,
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-01-28 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('s_ternak', null, {});
  }
};
