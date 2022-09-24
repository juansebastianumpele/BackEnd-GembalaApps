const { Router } = require('express');
const s$timbangan = require('../services/timbangan.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');


const TimbanganController = Router();


/**
 * Get data timbangan
*/

TimbanganController.get('/', authMiddleware, async (req, res, next) => {
    const detail = await s$timbangan.getDataTimbangan(req);
    response.sendResponse(res, detail);
} );

/**
 * Create new data timbangan
 * @param {number} id_ternak
 * @param {string} rf_id
 * @param {number} berat_berkala
 * @param {number} suhu_berkala
 * @param {string} tanggal
 */

TimbanganController.post('/', authMiddleware, async (req, res, next) => {
    const add = await s$timbangan.createDataTimbangan(req.body);
    response.sendResponse(res, add);
});

/**
 * Update data timbangan
 * @param {number} id_timbangan
 * @param {number} id_ternak
 * @param {string} rf_id
 * @param {number} berat_berkala
 * @param {number} suhu_berkala
 * @param {string} tanggal
*/

TimbanganController.put('/', authMiddleware, async (req, res, next) => {
    const edit = await s$timbangan.updateDataTimbangan(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete data timbangan
 * @param {number} id_timbangan
*/

TimbanganController.delete('/', authMiddleware, async (req, res, next) => {
    const del = await s$timbangan.deleteDataTimbangan(req.body);
    response.sendResponse(res, del);
});

module.exports = TimbanganController;