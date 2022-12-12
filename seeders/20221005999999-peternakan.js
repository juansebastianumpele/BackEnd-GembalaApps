'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('d_peternakan', [
      {
        nama_peternakan: "Texley Ranch",
        alamat: "Selomartani, Kalasan, Sleman, Yogyakarta",
        subscribe: null,
        postcode: "55581",
        longitude: "110.393",
        latitude: "-7.782",
        alamat_postcode: "Jl. Selomartani, Kalasan, Sleman, Yogyakarta, 55581",
        token: jwt.sign({
            id_peternakan: 1
        }, config.jwt.secret)
      },
      {
        nama_peternakan: "Gembala Farm",
        alamat: "Selomartani, Kalasan, Sleman, Yogyakarta",
        subscribe: null,
        postcode: "55581",
        longitude: "110.393",
        latitude: "-7.782",
        alamat_postcode: "Jl. Selomartani, Kalasan, Sleman, Yogyakarta, 55581",
        token: jwt.sign({
            id_peternakan: 2
        }, config.jwt.secret)
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('d_peternakan', null, {});
  }
};
