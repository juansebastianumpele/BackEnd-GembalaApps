const { Router } = require('express');
const s$penyakit = require('../services/penyakit.service');
const response = require('../utils/response');
const userSession = require('../middlewares/auth.middleware');


const PenyakitController = Router();


/**
 * Get List Penyakit
*/

PenyakitController.get('/', userSession, async (req, res, next) => {
    const detail = await s$penyakit.listPenyakit(req.body);
    response.sendResponse(res, detail);
} );

/**
 * Create Penyakit
 * @param {string} nama_penyakit
 * @param {string} deskripsi
 * @param {string} ciri_penyakit
 * @param {string} pengobatan
 */

PenyakitController.post('/', userSession, async (req, res, next) => {
    const add = await s$penyakit.createPenyakit(req.body);
    response.sendResponse(res, add);
});

/**
 * Update Penyakit
 * @param {string} id_penyakit
 * @param {string} nama_penyakit
 * @param {string} deskripsi
 * @param {string} ciri_penyakit
 * @param {string} pengobatan
*/

PenyakitController.put('/', userSession, async (req, res, next) => {
    const edit = await s$penyakit.updatePenyakit(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Penyakit
 * @param {number} id_penyakit
*/

PenyakitController.delete('/', userSession, async (req, res, next) => {
    const del = await s$penyakit.deletePenyakit(req.body);
    response.sendResponse(res, del);
});

module.exports = PenyakitController;