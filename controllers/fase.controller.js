const { Router } = require('express');
const s$fase = require('../services/fase.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {adminAuth, employeeAuth} = require('../middlewares/authorization');

const FaseController = Router();

/**
 * Get List Fase
*/

FaseController.get('/', authentication, async (req, res, next) => {
    const detail = await s$fase.getFase(req);
    response.sendResponse(res, detail);
} );

/**
 * Create Fase
 * @param {string} fase
 */

FaseController.post('/', authentication, employeeAuth, async (req, res, next) => {
    const add = await s$fase.createFase(req);
    response.sendResponse(res, add);
});

/**
 * Update Fase
 * @param {number} id_fp
 * @param {string} fase
*/

FaseController.put('/', authentication, employeeAuth, async (req, res, next) => {
    const edit = await s$fase.updateFase(req);
    response.sendResponse(res, edit);
});

/**
 * Delete Fase
 * @param {number} id_fp
*/

FaseController.delete('/', authentication, employeeAuth, async (req, res, next) => {
    const del = await s$fase.deleteFase(req);
    response.sendResponse(res, del);
});

module.exports = FaseController;