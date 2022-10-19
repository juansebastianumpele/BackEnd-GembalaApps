'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('auth_users', {
      id_users:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      foto:{
        type: Sequelize.STRING,
        allowNull: true
      },
      nama_lengkap:{
        type: Sequelize.STRING,
        allowNull: false
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      no_hp:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      alamat:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      role:{
        type: Sequelize.ENUM,
        values: ['superadmin', 'admin'],
        defaultValue: 'admin',
        allowNull: false
      },
      status:{
        type: Sequelize.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'inactive',
        allowNull: false
      },
      lastAccess:{
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('auth_users');
  }
};
