'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_jenis_pakan', [{
      id_user: 2,
      jenis_pakan: 'Complete Feed',
      interval_pakan: 14,
      satuan: 'Tong',
      komposisi: 'Bongkol Jagung 15%, Premix 0,1%, Jagung 60%',
      nutrien: 'BK 87%; PK 21%; LK 24%',
    },
    {
      id_user: 3,
      jenis_pakan: 'Complete Feed',
      interval_pakan: 14,
      satuan: 'Tong',
      komposisi: 'Bongkol Jagung 15%, Premix 0,1%, Jagung 60%',
      nutrien: 'BK 87%; PK 21%; LK 24%',
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_jenis_pakan', null, {});
  }
};
