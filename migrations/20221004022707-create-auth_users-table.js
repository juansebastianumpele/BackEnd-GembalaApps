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
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      no_hp:{
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false
      },
      lastAccess:{
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        attributes: {
          onUpdate: 'CURRENT_TIMESTAMP'
        },
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('auth_users');
  }
};
