'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_peternakan', {
      id_peternakan:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama_peternakan:{
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat:{
        type: Sequelize.STRING,
        allowNull: false
      },
      longtiude:{
        type: Sequelize.STRING,
        allowNull: false
      },
      latitude:{
        type: Sequelize.STRING,
        allowNull: false
      },
      id_users:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'auth_users',
          key: 'id_users'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_peternakan');
  }
};
