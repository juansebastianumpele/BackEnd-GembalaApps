const { Router } = require('express');
const s$pakan = require('../services/pakan.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');


const PakanController = Router();


/**
 * Get Data Pakan
*/

PakanController.get('/', authMiddleware, async (req, res, next) => {
    const detail = await s$pakan.getPakan(req);
    response.sendResponse(res, detail);
} );

/**
 * Create Pakan
 * @param {string} name_pakan
 * @param {string} deskripsi
 * @param {string} komposisi
 * @param {number} jumlah
 */

PakanController.post('/', authMiddleware, async (req, res, next) => {
    const add = await s$pakan.createPakan(req);
    response.sendResponse(res, add);
});

/**
 * Update Pakan
 * @param {number} id_pakan
 * @param {string} name_pakan
 * @param {string} deskripsi
 * @param {string} komposisi
 * @param {number} jumlah
*/

PakanController.put('/', authMiddleware, async (req, res, next) => {
    const edit = await s$pakan.updatePakan(req);
    response.sendResponse(res, edit);
});

/**
 * Delete Pakan
 * @param {number} id_pakan
*/

PakanController.delete('/', authMiddleware, async (req, res, next) => {
    const del = await s$pakan.deletePakan(req);
    response.sendResponse(res, del);
});

module.exports = PakanController;