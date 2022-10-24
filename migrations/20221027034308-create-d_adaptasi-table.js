'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_adaptasi', {
      id_adaptasi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ternak: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 's_ternak',
          key: 'id_ternak'
        }
      },
      id_treatment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_treatments',
          key: 'id_treatment'
        }
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tanggal_treatment: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_adaptasi');
  }
};
