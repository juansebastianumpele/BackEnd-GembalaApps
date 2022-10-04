'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('d_penyakit', { 
      id_penyakit:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama_penyakit:{
        type: Sequelize.STRING,
        allowNull: false
      },
      deskripsi:{
        type: Sequelize.STRING,
        allowNull: false
      },
      ciri:{
        type: Sequelize.STRING,
        allowNull: false
      },
      pengobatan:{
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('d_penyakit');
  }
};
