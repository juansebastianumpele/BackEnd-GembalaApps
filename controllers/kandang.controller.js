const { Router } = require('express');
const s$kandang = require('../services/kandang.service');
const response = require('../utils/response');
const userSession = require('../middlewares/auth.middleware');

const KandangController = Router();

/**
 * Get List Kandang
*/

KandangController.get('/', userSession, async (req, res, next) => {
    const detail = await s$kandang.listKandang(req.body);
    response.sendResponse(res, detail);
} );

/**
 * Create Kandang
 * @param {string} nama_kandang
 * @param {string} blok_kandang
 */

KandangController.post('/', userSession, async (req, res, next) => {
    const add = await s$kandang.createKandang(req.body);
    response.sendResponse(res, add);
});

/**
 * Update Kandang
 * @param {string} name_kandang
 * @param {string} blok_kandang
*/

KandangController.put('/', userSession, async (req, res, next) => {
    const edit = await s$kandang.updateKandang(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Kandang
 * @param {number} id_kandang
*/

KandangController.delete('/', userSession, async (req, res, next) => {
    const del = await s$kandang.deleteKandang(req.body);
    response.sendResponse(res, del);
});

module.exports = KandangController;