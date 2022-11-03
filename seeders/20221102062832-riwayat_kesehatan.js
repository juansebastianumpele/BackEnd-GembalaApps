'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_riwayat_kesehatan', [{
      id_peternakan: 1,
      id_ternak: 1,
      id_penyakit: 1,
      tanggal_sakit: "2022-09-02",
      tanggal_sembuh: "2022-10-02",
    },
    {
      id_peternakan: 1,
      id_ternak: 4,
      id_penyakit: 2,
      tanggal_sakit: "2022-10-02",
      tanggal_sembuh: "2022-10-15",
    },
    {
      id_peternakan: 1,
      id_ternak: 4,
      id_penyakit: 3,
      tanggal_sakit: "2022-11-02",
      tanggal_sembuh: null,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_bahan_pakan', null, {});
  }
};
