const { Router } = require('express');
const s$ternak = require('../services/ternak.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {employeeAuth} = require('../middlewares/authorization');

// Router
const TernakController = Router();

/**
 * Get List Ternak
*/
TernakController.get('/', authentication, async (req, res, next) => {
    const detail = await s$ternak.getTernak(req);
    response.sendResponse(res, detail);
});

/**
 * Create new data ternak
 * @param {string} rf_id
 * @param {number} id_varietas
 * @param {number} id_induk
 * @param {number} id_pejantan
 * @param {number} fase_pemeliharaan
 * @param {number} id_pakan
 * @param {number} id_kandang
 * @param {string} foto
 * @param {string} jenis_kelamin
 * @param {number} berat
 * @param {number} suhu
 * @param {string} status_sehat
 * @param {string} tanggal_lahir
 * @param {string} tanggal_masuk
 * @param {string} tanggal_keluar
 * @param {number} status_keluar
 */
TernakController.post('/', authentication, employeeAuth, async (req, res, next) => {
    const add = await s$ternak.createTernak(req);
    response.sendResponse(res, add);
});

/**
 * Update data ternak
 * @param {number} id_ternak
 * @param {string} rf_id
 * @param {number} id_varietas
 * @param {number} id_induk
 * @param {number} id_pejantan
 * @param {number} fase_pemeliharaan
 * @param {number} id_pakan
 * @param {number} id_kandang
 * @param {string} foto
 * @param {string} jenis_kelamin
 * @param {number} berat
 * @param {number} suhu
 * @param {string} status_sehat
 * @param {string} tanggal_lahir
 * @param {string} tanggal_masuk
 * @param {string} tanggal_keluar
 * @param {number} status_keluar
 */
TernakController.put('/', authentication, employeeAuth, async (req, res, next) => {
    const edit = await s$ternak.updateTernak(req);
    response.sendResponse(res, edit);
});

/**
 * Delete data ternak
 * @param {number} id_ternak
*/
TernakController.delete('/', authentication, employeeAuth, async (req, res, next) => {
    const del = await s$ternak.deleteTernak(req);
    response.sendResponse(res, del);
});

module.exports = TernakController;