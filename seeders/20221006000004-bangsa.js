'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_bangsa', [
      {
        bangsa: 'Garut'
      },
      {
        bangsa: 'Texel'
      },
      {
        bangsa: 'Dorper'
      },
      {
        bangsa: 'Merino'
      },
      {
        bangsa: 'Dombos'
      },
      {
        bangsa: 'Ekor Tipis'
      },
      {
        bangsa: 'Ekor Gemuk'
      },
      {
        bangsa: 'Batur'
      },
      {
        bangsa: 'St. Croix'
      },
      {
        bangsa: 'Suffolk'
      },
      {
        bangsa: 'Barbados Blackbelly'
      },
      {
        bangsa: 'Kisar'
      },
      {
        bangsa: 'Donggala'
      },
      {
        bangsa: 'Indramayu '
      },
      {
        bangsa: 'Jonggol'
      },
      {
        bangsa: 'Rote'
      },
      {
        bangsa: 'Dorset'
      },
      {
        bangsa: 'Sumbawa'
      },
      {
        bangsa: 'Waringin'
      },
      {
        bangsa: 'Merino'
      },
      {
        bangsa: 'Lainnya'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_bangsa', null, {});
  }
};
