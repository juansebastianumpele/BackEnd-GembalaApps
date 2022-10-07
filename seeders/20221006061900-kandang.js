'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_kandang', [
      {
        kode_kandang: 'F1',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F2',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F3',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F4',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F5',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F6',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F7',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F8',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F9',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F10',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F11',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'F12',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L1',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L2',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L3',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L4',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L5',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L6',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L7',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L8',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L9',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L10',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L11',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'L12',
        jenis_kandang: 'Kawin'
      },
      {
        kode_kandang: 'R1',
        jenis_kandang: 'Rekondisi'
      },
      {
        kode_kandang: 'R2',
        jenis_kandang: 'Rekondisi'
      },
      {
        kode_kandang: 'R3',
        jenis_kandang: 'Rekondisi'
      },
      {
        kode_kandang: 'R4',
        jenis_kandang: 'Rekondisi'
      },
      {
        kode_kandang: 'I1',
        jenis_kandang: 'Isolasi'
      },
      {
        kode_kandang: 'I2',
        jenis_kandang: 'Isolasi'
      },
      {
        kode_kandang: 'I3',
        jenis_kandang: 'Isolasi'
      },
      {
        kode_kandang: 'I4',
        jenis_kandang: 'Isolasi'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_kandang', null, {});
  }
};
