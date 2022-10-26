'use strict';

/** @type {import('sequelize-cli').Migration} */
const {hashPassword} = require('../utils/auth')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auth_users', [{
      nama_pengguna: 'admin',
      email: 'admin@email.com',
      nomor_telepon: '081315372263',
      role: 'superadmin',
      status: 'active',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      kata_sandi: await hashPassword('12345678')
    },{
      nama_pengguna: 'admin1',
      email: 'admin1@email.com',
      nomor_telepon: '081315372231',
      role: 'admin',
      status: 'active',
      nama_peternakan: 'Texley Ranch',
      alamat: 'Selomartani, Kalasan, Sleman, D.I. Yogyakarta',
      kata_sandi: await hashPassword('12345678')
    },{
      nama_pengguna: 'admin2',
      email: 'admin2@email.com',
      nomor_telepon: '081315372232',
      role: 'admin',
      status: 'inactive',
      nama_peternakan: 'Kaley Farm',
      alamat: 'Tamanmartani, Kalasan, Sleman, D.I. Yogyakarta',
      kata_sandi: await hashPassword('12345678')
    },{
      nama_pengguna: 'admin3',
      email: 'admin3@email.com',
      nomor_telepon: '081315372253',
      role: 'admin',
      status: 'inactive',
      nama_peternakan: 'Peternakan Sanggrahan',
      alamat: 'Purwomartani, Kalasan, Sleman, D.I. Yogyakarta',
      kata_sandi: await hashPassword('12345678')
    },{
      nama_pengguna: 'admin4',
      email: 'admin4@email.com',
      nomor_telepon: '081315372254',
      role: 'admin',
      status: 'inactive',
      nama_peternakan: 'Peternakan Pak Purwo',
      alamat: 'Purwomartani, Kalasan, Sleman, D.I. Yogyakarta',
      kata_sandi: await hashPassword('12345678')
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_users', null, {});
  }
};
