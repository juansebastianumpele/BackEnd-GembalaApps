const { Router } = require('express');
const superAdminService = require('../services/superadmin.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { superAdminMiddleware } = require('../middlewares/authorization');

const superAdminController = (db) => {
    const s$superAdmin = superAdminService(db);
    const SuperAdminController = Router();

    /**
     * List User
     */
    SuperAdminController.get('/', authentication, superAdminMiddleware, async (req, res, next) => {
        const list = await s$superAdmin.getUsers(req);
        response.sendResponse(res, list);
    });

    /**
     * Generate new token for superadmin and bod
     * @param {string} id_user
     */
    SuperAdminController.post('/generate-token', authentication, superAdminMiddleware, async (req, res, next) => {
        const result = await s$superAdmin.generateNewToken(req);
        response.sendResponse(res, result);
    });

    return SuperAdminController;
}

module.exports = superAdminController;