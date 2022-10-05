'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_kandang', { 
      id_kandang:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      kode_kandang:{
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_kandang:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        attributes: {
          onUpdate: 'CURRENT_TIMESTAMP'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_kandang');
  }
};
