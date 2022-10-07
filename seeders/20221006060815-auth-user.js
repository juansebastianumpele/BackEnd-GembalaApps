'use strict';

/** @type {import('sequelize-cli').Migration} */
const {hashPassword} = require('../utils/auth')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auth_users', [{
      nama_lengkap: 'admin',
      username: 'admin',
      email: 'admin@gmail.com',
      no_hp: '29478927348',
      alamat: 'test',
      password: await hashPassword('12345678')
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_users', null, {});
  }
};
