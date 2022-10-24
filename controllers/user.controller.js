const { Router } = require('express');
const userService = require('../services/user.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { superAdminMiddleware } = require('../middlewares/authorization');

const userController = (db) => {
    const s$user = userService(db);
    const UserController = Router();

    /**
     * List User
     */
    UserController.get('/', authentication, superAdminMiddleware, async (req, res, next) => {
        const list = await s$user.getUsers(req);
        response.sendResponse(res, list);
    });

    /**
     * Generate new token for superadmin and bod
     * @param {string} id_user
     */
    UserController.post('/generate-token', authentication, superAdminMiddleware, async (req, res, next) => {
        const result = await s$user.generateNewToken(req);
        response.sendResponse(res, result);
    });

    return UserController;
}

module.exports = userController;