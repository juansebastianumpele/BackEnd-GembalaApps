'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_treatment', [
      {
        step: 1,
        treatment: "Masukkan ke Kandang Umbaran"
      },
      {
        step: 1,
        treatment: "Beri Air Gula"
      },
      {
        step: 1,
        treatment: "Pakan Rumput"
      },
      {
        step: 2,
        treatment: "Beri Vitol 140, 3ml/ekor"
      },
      {
        step: 2,
        treatment: "Pakan Rumput + Konsentrat"
      },
      {
        step: 2,
        treatment: "Pengobatan Jika Diperlukan"
      },
      {
        step: 3,
        treatment: "Pengecekan Kondisi"
      },
      {
        step: 3,
        treatment: "Beri Obat Cacing Oral Kalbazen 4ml/ekor"
      },
      {
        step: 3,
        treatment: "Pakan Rumput + Konsentrat"
      },
      {
        step: 4,
        treatment: "Suntik Anti Parasit Vet Oxy 1ml/10kg bb"
      },
      {
        step: 4,
        treatment: "Pakan Rumput + Konsentrat"
      },
      {
        step: 5,
        treatment: "Cukur Bulu Domba + Potong Kuku"
      },
      {
        step: 5,
        treatment: "Pemandian, Deterjen + Disinfektan"
      },
      {
        step: 5,
        treatment: "Suntik Anti Parasit Wormectin 0,25ml/10kg"
      },
      {
        step: 5,
        treatment: "Pakan Komplit"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_treatment', null, {});
  }
};
