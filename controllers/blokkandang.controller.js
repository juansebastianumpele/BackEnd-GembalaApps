const { Router } = require('express');
const s$blokKandang = require('../services/blokkandang.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');

const BlokKandangController = Router();

/**
 * Get Blok Kandang (use query)
*/

BlokKandangController.get('/', authMiddleware, async (req, res, next) => {
    const detail = await s$blokKandang.getBlokKandang(req);
    response.sendResponse(res, detail);
} );

/**
 * Create Blok Kandang
 * @param {string} nama_kandang
 * @param {number} id_blok
 */

BlokKandangController.post('/', authMiddleware, async (req, res, next) => {
    const add = await s$blokKandang.createBlokKandang(req);
    response.sendResponse(res, add);
});

/**
 * Update Blok Kandang
 * @param {string} name_kandang
 * @param {string} id_blok
*/

BlokKandangController.put('/', authMiddleware, async (req, res, next) => {
    const edit = await s$blokKandang.updateBlokKandang(req);
    response.sendResponse(res, edit);
});

/**
 * Delete Blok Kandang
 * @param {number} id_kandang
*/

BlokKandangController.delete('/', authMiddleware, async (req, res, next) => {
    const del = await s$blokKandang.deleteBlokKandang(req);
    response.sendResponse(res, del);
});

module.exports = BlokKandangController;