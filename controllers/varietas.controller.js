const { Router } = require('express');
const s$varietas = require('../services/varietas.service');
const response = require('../utils/response');
const userSession = require('../middlewares/auth.middleware');


const VarietasController = Router();


/**
 * Get List Varietas
*/

VarietasController.get('/', userSession, async (req, res, next) => {
    const detail = await s$varietas.listVarietas(req.body);
    response.sendResponse(res, detail);
} );

/**
 * Create Varietas
 * @param {string} nama_varietas
 */

VarietasController.post('/', userSession, async (req, res, next) => {
    const add = await s$varietas.createVarietas(req.body);
    response.sendResponse(res, add);
});

/**
 * Update Varietas
 * @param {string} id_varietas
 * @param {string} nama_varietas
*/

VarietasController.put('/', userSession, async (req, res, next) => {
    const edit = await s$varietas.updateVarietas(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Varietas
 * @param {number} id_varietas
*/

VarietasController.delete('/', userSession, async (req, res, next) => {
    const del = await s$varietas.deleteVarietas(req.body);
    response.sendResponse(res, del);
});

module.exports = VarietasController;