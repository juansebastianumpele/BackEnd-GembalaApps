const { Router } = require('express');
const s$ternak = require('../services/ternak.service');
const response = require('../utils/response');
const userSession = require('../middlewares/auth.middleware');


const TernakController = Router();


/**
 * Get List Ternak
*/

TernakController.get('/all', async (req, res, next) => {
    const detail = await s$ternak.listTernak(req.body);
    response.sendResponse(res, detail);
});

/**
 * Get List My ternak
*/

TernakController.get('/', userSession, async (req, res, next) => {
    const detail = await s$ternak.listMyTernak(req.body);
    response.sendResponse(res, detail);
});

/**
 * Get List Ternak by Id User
*/

TernakController.get('/user/:id', async (req, res, next) => {
    const detail = await s$ternak.listTernakByIdUser(req.params.id);
    response.sendResponse(res, detail);
});

/**
 * Get Ternak by Id
*/

TernakController.get('/:id', userSession, async (req, res, next) => {
    const detail = await s$ternak.getTernakById(req.params.id);
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

TernakController.post('/', userSession, async (req, res, next) => {
    const add = await s$ternak.createTernak(req.body);
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

TernakController.put('/', userSession, async (req, res, next) => {
    const edit = await s$ternak.updateTernak(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete data ternak
 * @param {number} id_ternak
*/

TernakController.delete('/', userSession, async (req, res, next) => {
    const del = await s$ternak.deleteTernak(req.body);
    response.sendResponse(res, del);
});

module.exports = TernakController;