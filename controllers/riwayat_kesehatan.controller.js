const { Router } = require('express');
const s$riwayatKesehatan = require('../services/riwayat_kesehatan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
// const {employeeAuth} = require('../middlewares/authorization');

const RiwayatKesehatanController = Router();

/**
 * Get Data Riwayat Kesehatan
*/
RiwayatKesehatanController.get('/', authentication, async (req, res, next) => {
    const detail = await s$riwayatKesehatan.getRiwayatKesehatan(req);
    response.sendResponse(res, detail);
} );

/**
 * Create Riwayat Kesehatan
 * @param {number} id_ternak
 * @param {number} id_penyakit
 * @param {date} tanggal_sakit
 * @param {date} tanggal_sembuh
 */
RiwayatKesehatanController.post('/', authentication, async (req, res, next) => {
    const add = await s$riwayatKesehatan.createRiwayatKesehatan(req);
    response.sendResponse(res, add);
});

/**
 * Update Riwayat Kesehatan
 * @param {number} id_riwayat_kesehatan
 * @param {number} id_ternak
 * @param {number} id_penyakit
 * @param {date} tanggal_sakit
 * @param {date} tanggal_sembuh
*/
RiwayatKesehatanController.put('/', authentication, async (req, res, next) => {
    const edit = await s$riwayatKesehatan.updateRiwayatKesehatan(req);
    response.sendResponse(res, edit);
});

/**
 * Delete Riwayat Kesehatan
 * @param {number} id_riwayat_kesehatan
*/
RiwayatKesehatanController.delete('/', authentication, async (req, res, next) => {
    const del = await s$riwayatKesehatan.deleteRiwayatKesehatan(req);
    response.sendResponse(res, del);
});

module.exports = RiwayatKesehatanController;