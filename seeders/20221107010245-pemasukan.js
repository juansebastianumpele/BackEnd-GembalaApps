'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_lk_pemasukan', [
      {
        id_peternakan: 1,
        id_ternak: 1,
        rf_id: '00e2001a83191322050669e0c1ff',
        id_bangsa: 1,
        jenis_kelamin: 'jantan',
        cek_poel: 1,
        cek_mulut: "ok",
        cek_telinga: "ok",
        cek_kuku_kaki: "ok",
        cek_kondisi_fisik_lain: "ok",
        cek_bcs: 1,
        id_status_ternak: 2,
        status_kesehatan: "sehat",
        id_kandang: 1,
      },
      {
        id_peternakan: 1,
        id_ternak: 2,
        rf_id: '00e2001a83191322050669e0c1ff',
        id_bangsa: 1,
        jenis_kelamin: 'betina',
        cek_poel: 1,
        cek_mulut: "ok",
        cek_telinga: "ok",
        cek_kuku_kaki: "ok",
        cek_kondisi_fisik_lain: "ok",
        cek_bcs: 1,
        id_status_ternak: 2,
        status_kesehatan: "sehat",
        id_kandang: 1,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_lk_pemasukan', null, {});
  }
};
