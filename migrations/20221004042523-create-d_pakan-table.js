'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_pakan', { 
      id_pakan:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama_pakan:{
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_pakan:{
        type: Sequelize.STRING,
        allowNull: false
      },
      komposisi:{
        type: Sequelize.STRING,
        allowNull: false
      },
      stok:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      satuan:{
        type: Sequelize.ENUM,
        values: [
          'Kg',
          'Pcs'
        ],
        defaultValue: 'Kg',
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        attributes: {
          onUpdate: 'CURRENT_TIMESTAMP'
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_pakan');
  }
};
