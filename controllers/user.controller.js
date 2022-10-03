const { Router } = require('express');
const userService = require('../services/user.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {adminAuth, employeeAuth} = require('../middlewares/authorization');

const userController = (db) => {
    const s$user = userService(db);
    const UserController = Router();

    /**
     * List User
     */
    UserController.get('/', authentication, adminAuth, async (req, res, next) => {
        const list = await s$user.getUsers(req);
        response.sendResponse(res, list);
    });

    /**
     * Req to Employee
     */
    UserController.post('/req', authentication, async (req, res, next) => {
        const reqToEmployee = await s$user.reqToEmployee(req);
        response.sendResponse(res, reqToEmployee);
    });

    return UserController;
}

module.exports = userController;