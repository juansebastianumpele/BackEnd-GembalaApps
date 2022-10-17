const { Router } = require('express');
const s$penyakit = require('../services/penyakit.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
// const {employeeAuth} = require('../middlewares/authorization');

const PenyakitController = Router();

/**
 * Get List Penyakit
*/
PenyakitController.get('/',  async (req, res, next) => {
    const detail = await s$penyakit.getPenyakit(req);
    response.sendResponse(res, detail);
} );

/**
 * Create Penyakit
 * @param {string} nama_penyakit
 * @param {string} deskripsi
 * @param {string} ciri_penyakit
 * @param {string} pengobatan
 */
PenyakitController.post('/',  async (req, res, next) => {
    const add = await s$penyakit.createPenyakit(req);
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
PenyakitController.put('/',  async (req, res, next) => {
    const edit = await s$penyakit.updatePenyakit(req);
    response.sendResponse(res, edit);
});

/**
 * Delete Penyakit
 * @param {number} id_penyakit
*/
PenyakitController.delete('/',  async (req, res, next) => {
    const del = await s$penyakit.deletePenyakit(req);
    response.sendResponse(res, del);
});

module.exports = PenyakitController;