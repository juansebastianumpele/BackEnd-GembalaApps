'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_peternakan', [{
      nama_peternakan: 'Peternakan 1',
      alamat: 'Jl. Peternakan 1',
      id_users: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_peternakan: 'Peternakan 2',
      alamat: 'Jl. Peternakan 2',
      id_users: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nama_peternakan: 'Peternakan 3',
      alamat: 'Jl. Peternakan 3',
      id_users: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_peternakan', null, {});
  }
};
