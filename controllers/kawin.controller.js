const { Router } = require('express');
const s$kawin = require('../services/kawin.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const KawinController = Router();

/**
 * Get Data Kawin
*/

KawinController.get('/', authentication, adminMiddleware, async (req, res, next) => {
    const detail = await s$kawin.getKawin(req);
    response.sendResponse(res, detail);
} );

/**
 * Get data indukan
 */
KawinController.get('/indukan', authentication, adminMiddleware, async (req, res, next) => {
    const detail = await s$kawin.getDataIndukan(req);
    response.sendResponse(res, detail);
} );

/**
 * Get data pejantan
 */
 KawinController.get('/pejantan', authentication, adminMiddleware, async (req, res, next) => {
    const detail = await s$kawin.getDataPejantan(req);
    response.sendResponse(res, detail);
} );

/**
 * Create new data kawin
 * @param {number} id_ternak
 * @param {string} tanggal_kawin
 * @param {number} id_pemacek
 * @param {number} id_fp
 */

KawinController.post('/', authentication, adminMiddleware, async (req, res, next) => {
    const add = await s$kawin.createDataKawin(req);
    response.sendResponse(res, add);
});

/**
 * Update data kawin
 * @param {number} id_kawin
 * @param {number} id_ternak
 * @param {string} tanggal_kawin
 * @param {number} id_pemacek
*/

KawinController.put('/', authentication, adminMiddleware, async (req, res, next) => {
    const edit = await s$kawin.updateDataKawin(req);
    response.sendResponse(res, edit);
});

/**
 * Delete data kawin
 * @param {number} id_kawin
*/

KawinController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
    const del = await s$kawin.deleteDataKawin(req);
    response.sendResponse(res, del);
});

module.exports = KawinController;