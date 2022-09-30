const { Router } = require('express');
const m$user = require('../services/user.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {adminAuth, employeeAuth} = require('../middlewares/authorization');

const UserController = Router();

/**
 * List User
 */
UserController.get('/', authentication, adminAuth, async (req, res, next) => {
    const list = await m$user.getUsers(req);
    response.sendResponse(res, list);
});

/**
 * Req to Employee
 */

UserController.post('/req', authentication, async (req, res, next) => {
    const reqToEmployee = await m$user.reqToEmployee(req);
    response.sendResponse(res, reqToEmployee);
});

module.exports = UserController;