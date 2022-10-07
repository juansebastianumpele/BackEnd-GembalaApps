'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_varietas', [
      {
        varietas: 'Garut'
      },
      {
        varietas: 'Texel'
      },
      {
        varietas: 'Dorper'
      },
      {
        varietas: 'Merino'
      },
      {
        varietas: 'Dombos'
      },
      {
        varietas: 'Ekor Tipis'
      },
      {
        varietas: 'Ekor Gemuk'
      },
      {
        varietas: 'Batur'
      },
      {
        varietas: 'St. Croix'
      },
      {
        varietas: 'Suffolk'
      },
      {
        varietas: 'Barbados Blackbelly'
      },
      {
        varietas: 'Kisar'
      },
      {
        varietas: 'Donggala'
      },
      {
        varietas: 'Indramayu '
      },
      {
        varietas: 'Jonggol'
      },
      {
        varietas: 'Rote'
      },
      {
        varietas: 'Dorset'
      },
      {
        varietas: 'Sumbawa'
      },
      {
        varietas: 'Waringin'
      },
      {
        varietas: 'Lainnya'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_varietas', null, {});
  }
};
