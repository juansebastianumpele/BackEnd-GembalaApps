const { Router } = require('express');
const s$user = require('../services/user.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware, superAdminMiddleware } = require('../middlewares/authorization');

const UserController = Router();

/**
 * List User
 */
UserController.get('/', authentication, superAdminMiddleware, async (req, res, next) => {
    const list = await s$user.getUsers(req);
    response.sendResponse(res, list);
});

/**
 * Get Profile
 */
UserController.get('/profile', authentication, async (req, res, next) => {
    const detail = await s$user.getProfile(req);
    response.sendResponse(res, detail);
});

module.exports = UserController;