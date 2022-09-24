const { Router } = require('express');
const s$kawin = require('../services/kawin.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');


const KawinController = Router();


/**
 * Get Data Kawin
*/

KawinController.get('/', authMiddleware, async (req, res, next) => {
    const detail = await s$kawin.getKawin(req);
    response.sendResponse(res, detail);
} );

/**
 * Create new data kawin
 * @param {number} id_ternak
 * @param {string} tanggal_kawin
 * @param {number} id_pemancek
 */

KawinController.post('/', authMiddleware, async (req, res, next) => {
    const add = await s$kawin.createDataKawin(req.body);
    response.sendResponse(res, add);
});

/**
 * Update data kawin
 * @param {number} id_kawin
 * @param {number} id_ternak
 * @param {string} tanggal_kawin
 * @param {number} id_pemancek
*/

KawinController.put('/', authMiddleware, async (req, res, next) => {
    const edit = await s$kawin.updateDataKawin(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete data kawin
 * @param {number} id_kawin
*/

KawinController.delete('/', authMiddleware, async (req, res, next) => {
    const del = await s$kawin.deleteDataKawin(req.body);
    response.sendResponse(res, del);
});

module.exports = KawinController;