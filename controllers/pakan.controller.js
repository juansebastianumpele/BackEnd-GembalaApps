const { Router } = require('express');
const s$pakan = require('../services/pakan.service');
const response = require('../utils/response');
const userSession = require('../middlewares/auth.middleware');


const PakanController = Router();


/**
 * Get List Pakan
*/

PakanController.get('/', userSession, async (req, res, next) => {
    const detail = await s$pakan.listPakan(req.body);
    response.sendResponse(res, detail);
} );

/**
 * Create Pakan
 * @param {string} name_pakan
 * @param {string} deskripsi
 * @param {string} komposisi
 * @param {number} jumlah
 */

PakanController.post('/', userSession, async (req, res, next) => {
    const add = await s$pakan.createPakan(req.body);
    response.sendResponse(res, add);
});

/**
 * Update Pakan
 * @param {string} name_pakan
 * @param {string} deskripsi
 * @param {string} komposisi
 * @param {number} jumlah
*/

PakanController.put('/', userSession, async (req, res, next) => {
    const edit = await s$pakan.updatePakan(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Pakan
 * @param {number} id_pakan
*/

PakanController.delete('/', userSession, async (req, res, next) => {
    const del = await s$pakan.deletePakan(req.body);
    response.sendResponse(res, del);
});

module.exports = PakanController;