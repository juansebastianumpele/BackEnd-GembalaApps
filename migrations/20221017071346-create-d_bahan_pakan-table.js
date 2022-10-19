'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_bahan_pakan', { 
      id_bahan_pakan:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_peternakan:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'd_peternakan',
          key: 'id_peternakan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nama_bahan_pakan:{
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_bahan_pakan:{
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
    await queryInterface.dropTable('d_bahan_pakan');
  }
};
