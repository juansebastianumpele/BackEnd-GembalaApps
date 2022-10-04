'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_fase_pemeliharaan', { 
      id_fp:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fase:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updateAt:{
        type: Sequelize.DATE,
        allowNull: false
      }  
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_fase_pemeliharaan');
  }
};
