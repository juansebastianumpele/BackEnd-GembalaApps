'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_pakan', {
      id_pakan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_user:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'auth_users',
          key: 'id_user'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_jenis_pakan:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_jenis_pakan',
          key: 'id_jenis_pakan'
        }
      },
      status: {
        type: Sequelize.ENUM,
        values: [
          'Tersedia',
          'Tidak Tersedia',
          'Belum Siap'
        ],
        defaultValue: 'Tidak Tersedia',
        allowNull: false
      },
      tanggal_pembuatan:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      tanggal_konsumsi:{
        type: Sequelize.DATE,
        allowNull: true
      },
      jumlah_pakan:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_pakan');
  }
};
