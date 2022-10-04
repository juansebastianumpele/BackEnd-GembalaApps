'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_riwayat_kesehatan', { 
      id_riwayat_kesehatan:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_ternak:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        }
      },
      id_penyakit:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_penyakit',
          key: 'id_penyakit'
        }
      },
      tanggal_sakit:{
        type: Sequelize.DATE,
        allowNull: false
      },
      tanggal_sembuh:{
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_riwayat_kesehatan');
  }
};

