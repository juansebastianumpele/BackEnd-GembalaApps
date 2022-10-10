'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('s_ternak', { 
      id_ternak:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      rf_id:{
        type: Sequelize.STRING,
        allowNull: false
      },
      foto:{
        type: Sequelize.STRING,
        allowNull: true
      },
      jenis_kelamin:{
        type: Sequelize.ENUM,
        values: [
          'Jantan',
          'Betina'
        ],
        defaultValue: 'Betina',
        allowNull: false
      },
      id_varietas:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_varietas',
          key: 'id_varietas'
        }
      },
      id_kandang:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_kandang',
          key: 'id_kandang'
        }
      },
      id_pakan:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_pakan',
          key: 'id_pakan'
        }
      },
      id_fp:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_fase_pemeliharaan',
          key: 'id_fp'
        }
      },
      id_induk:{
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'd_ternak',
        //   key: 'id_ternak'
        // }
      },
      id_pejantan:{
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'd_ternak',
        //   key: 'id_ternak'
        // }
      },
      berat:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      suhu:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      status_kesehatan:{
        type: Sequelize.ENUM,
        values: [
          'Sehat',
          'Sakit'
        ], 
        defaultValue: 'Sehat',
        allowNull: false
      },
      id_penyakit:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'd_penyakit',
          key: 'id_penyakit'
        }
      },
      tanggal_lahir:{
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_masuk:{
        type: Sequelize.DATE,
        allowNull: true
      },
      tanggal_keluar:{
        type: Sequelize.DATE,
        allowNull: true
      },
      status_keluar:{
        type: Sequelize.ENUM,
        values: [
          'Dijual',
          'Dipotong',
          'Dikembalikan',
          'Mati',
          'Lainnya'
        ],
        allowNull: true
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    }).then(() => {
      queryInterface.addConstraint('s_ternak', {
        fields: ['id_induk'],
        type: 'foreign key',
        name: 'fk_s_ternak_id_induk',
        references: {
          table: 's_ternak',
          field: 'id_ternak'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      }).then(() => {
        queryInterface.addConstraint('s_ternak', {
          fields: ['id_pejantan'],
          type: 'foreign key',
          name: 'fk_s_ternak_id_pejantan',
          references: {
            table: 's_ternak',
            field: 'id_ternak'
          },
          onDelete: 'set null',
          onUpdate: 'cascade'
        })
      }
    );
  },
  )},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('s_ternak');
  }
};
