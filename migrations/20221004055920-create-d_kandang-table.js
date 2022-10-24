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
      id_user:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'auth_users',
          key: 'id_user'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      kode_kandang:{
        type: Sequelize.STRING,
        allowNull: false
      },
      jenis_kandang:{
        type: Sequelize.STRING,
        allowNull: false
      },
      id_jenis_pakan:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_jenis_pakan',
          key: 'id_jenis_pakan'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      persentase_kebutuhan_pakan:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_kandang');
  }
};
