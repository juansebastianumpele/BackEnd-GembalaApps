'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('s_ternak', [
      {
        rf_id: "00e2001a83191322050669e0c1ff",
        id_peternakan: 1,
        foto: null,
        jenis_kelamin: "Betina",
        id_varietas: "1",
        id_kandang: "1",
        id_pakan: "1",
        id_fp: "3",
        id_induk: null,
        id_pejantan: null,
        berat: "23.13",
        suhu: "35",
        id_penyakit: null,
        status_kesehatan: "Sehat",
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-11-01 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
    },
    {
        rf_id: "00e2001a83191322780669e0c1ff",
        id_peternakan: 1,
        foto: null,
        jenis_kelamin: "Betina",
        id_varietas: "1",
        id_kandang: "1",
        id_pakan: "1",
        id_fp: "3",
        id_induk: null,
        id_pejantan: null,
        berat: "22.15",
        suhu: "39",
        id_penyakit: null,
        status_kesehatan: "Sehat",
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-11-01 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
    },
    {
        rf_id: "00e2001a83541322780669e0c1ff",
        id_peternakan: 1,
        foto: null,
        jenis_kelamin: "Betina",
        id_varietas: "1",
        id_kandang: "1",
        id_pakan: "1",
        id_fp: "3",
        id_induk: null,
        id_pejantan: null,
        berat: "23.75",
        suhu: "38",
        id_penyakit: null,
        status_kesehatan: "Sehat",
        tanggal_lahir: "2022-01-01 00:00:00",
        tanggal_masuk: "2022-01-28 00:00:00",
        tanggal_keluar: null,
        status_keluar: null
    },
    {
      rf_id: "00e2001a83541532780669e0c1ff",
      id_peternakan: 1,
      foto: null,
      jenis_kelamin: "Jantan",
      id_varietas: "1",
      id_kandang: "1",
      id_pakan: "1",
      id_fp: "17",
      id_induk: null,
      id_pejantan: null,
      berat: "30.75",
      suhu: "38",
      id_penyakit: 1,
      status_kesehatan: "Sakit",
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
