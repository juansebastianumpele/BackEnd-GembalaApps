'use strict';

/** @type {import('sequelize-cli').Migration} */
const {hashPassword} = require('../utils/auth')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auth_users', [{
      nama_lengkap: 'Admin',
      username: 'admin',
      email: 'admin@gmail.com',
      no_hp: '081315372263',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      password: await hashPassword('12345678')
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_users', null, {});
  }
};
