const { Router } = require('express');
const s$kawin = require('../services/kawin.service');
const response = require('../utils/response');
const userSession = require('../middlewares/auth.middleware');


const KawinController = Router();


/**
 * Get List Kawin
*/

KawinController.get('/', userSession, async (req, res, next) => {
    const detail = await s$kawin.listKawinByIdUsers(req.body);
    response.sendResponse(res, detail);
} );

/**
 * Create new data kawin
 * @param {number} id_ternak
 * @param {string} tanggal
 * @param {number} id_pemancek
 */

KawinController.post('/', userSession, async (req, res, next) => {
    const add = await s$kawin.createDataKawin(req.body);
    response.sendResponse(res, add);
});

/**
 * Update data kawin
 * @param {number} id_kawin
 * @param {number} id_ternak
 * @param {string} tanggal
 * @param {number} id_pemancek
*/

KawinController.put('/', userSession, async (req, res, next) => {
    const edit = await s$kawin.updateDataKawin(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Varietas
 * @param {number} id_kawin
*/

KawinController.delete('/', userSession, async (req, res, next) => {
    const del = await s$kawin.deleteDataKawin(req.body);
    response.sendResponse(res, del);
});

module.exports = KawinController;