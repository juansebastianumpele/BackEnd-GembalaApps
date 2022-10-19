'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_riwayat_perkawinan', { 
      id_kawin:{
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
      id_pemacek:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        }
      },
      tanggal_kawin:{
        type: Sequelize.DATE,
        allowNull: false
      },
      id_kandang:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_kandang',
          key: 'id_kandang'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      } });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_riwayat_perkawinan');
  }
};
