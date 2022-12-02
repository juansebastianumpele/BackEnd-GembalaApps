'use strict';

/** @type {import('sequelize-cli').Migration} */
const {hashPassword} = require('../utils/auth')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auth_users', [{
      nama_pengguna: 'superadmin',
      email: 'superadmin@email.com',
      nomor_telepon: '081315372263',
      id_peternakan: null,
      role: 'superadmin',
      status: 'active',
      kata_sandi: await hashPassword('12345678')
    },{
      nama_pengguna: 'admin1',
      email: 'admin1@email.com',
      nomor_telepon: '081315372231',
      id_peternakan: 1,
      role: 'admin',
      status: 'active',
      kata_sandi: await hashPassword('12345678')
    },{
      nama_pengguna: 'admin2',
      email: 'admin2@email.com',
      nomor_telepon: '081315372232',
      id_peternakan: 2,
      role: 'admin',
      status: 'active',
      kata_sandi: await hashPassword('12345678')
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_users', null, {});
  }
};
