const { Router } = require('express');
const s$peternakan = require('../services/peternakan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {superAdminMiddleware} = require('../middlewares/authorization');

const PeternakanController = Router();

/**
 * Get Data Peternakan
 */
PeternakanController.get('/', authentication, superAdminMiddleware, async (req, res, next) => {
    const detail = await s$peternakan.getPeternakan(req);
    response.sendResponse(res, detail);
});

/**
 * NewTokenSuperAdmin
 * @param {number} id_peternakan
 */
PeternakanController.post('/newtoken', authentication, superAdminMiddleware, async (req, res, next) => {
    const add = await s$peternakan.newTokenSuperAdmin(req);
    response.sendResponse(res, add);
});

/**
 * Create Peternakan
 * @param {string} nama_peternakan
 * @param {string} alamat
 * @param {string} email_admin
 */

PeternakanController.post('/', authentication, superAdminMiddleware, async (req, res, next) => {
    const add = await s$peternakan.createPeternakan(req);
    response.sendResponse(res, add);
});

/**
 * Update Peternakan
 * @param {string} id_peternakan
 * @param {string} nama_peternakan
 * @param {string} alamat
 * @param {string} email_admin
 */

PeternakanController.put('/', authentication, superAdminMiddleware, async (req, res, next) => {
    const edit = await s$peternakan.updatePeternakan(req);
    response.sendResponse(res, edit);
});

/**
 * Delete Peternakan
 * @param {number} id_peternakan
 */

PeternakanController.delete('/', authentication, superAdminMiddleware, async (req, res, next) => {
    const del = await s$peternakan.deletePeternakan(req);
    response.sendResponse(res, del);
});

module.exports = PeternakanController;