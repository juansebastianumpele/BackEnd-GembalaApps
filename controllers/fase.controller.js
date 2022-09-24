const { Router } = require('express');
const s$fase = require('../services/fasepemeliharaan.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');


const FaseController = Router();


/**
 * Get List Fase
*/

FaseController.get('/', authMiddleware, async (req, res, next) => {
    const detail = await s$fase.getFase(req);
    response.sendResponse(res, detail);
} );

/**
 * Create Fase
 * @param {string} fase
 */

FaseController.post('/', authMiddleware, async (req, res, next) => {
    const add = await s$fase.createFase(req.body);
    response.sendResponse(res, add);
});

/**
 * Update Fase
 * @param {string} fase
*/

FaseController.put('/', authMiddleware, async (req, res, next) => {
    const edit = await s$fase.updateFase(req.body);
    response.sendResponse(res, edit);
});

/**
 * Delete Fase
 * @param {number} id_fp
*/

FaseController.delete('/', authMiddleware, async (req, res, next) => {
    const del = await s$fase.deleteFase(req.body);
    response.sendResponse(res, del);
});

module.exports = FaseController;