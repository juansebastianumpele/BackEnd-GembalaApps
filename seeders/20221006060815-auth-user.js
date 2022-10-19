'use strict';

/** @type {import('sequelize-cli').Migration} */
const {hashPassword} = require('../utils/auth')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auth_users', [{
      nama_lengkap: 'Admin',
      username: 'admin',
      email: 'admin@email.com',
      no_hp: '081315372263',
      role: 'superadmin',
      status: 'active',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      password: await hashPassword('12345678')
    },{
      nama_lengkap: 'Admin1',
      username: 'admin1',
      email: 'admin1@email.com',
      no_hp: '081315372231',
      role: 'admin',
      status: 'active',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      password: await hashPassword('12345678')
    },{
      nama_lengkap: 'Admin2',
      username: 'admin2',
      email: 'admin2@email.com',
      no_hp: '081315372232',
      role: 'admin',
      status: 'inactive',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      password: await hashPassword('12345678')
    },{
      nama_lengkap: 'Admin3',
      username: 'admin3',
      email: 'admin3@email.com',
      no_hp: '081315372253',
      role: 'admin',
      status: 'inactive',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      password: await hashPassword('12345678')
    },{
      nama_lengkap: 'Admin4',
      username: 'admin4',
      email: 'admin4@email.com',
      no_hp: '081315372254',
      role: 'admin',
      status: 'inactive',
      alamat: 'Jl. Asem Kranji Blok K-7 Universitas Gadjah Mada Sekip, Bulaksumur, Sendowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284',
      password: await hashPassword('12345678')
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth_users', null, {});
  }
};
