const { Router } = require('express');
const m$user = require('../services/user.service');
// const response = require('../helpers/response');
const { userSession } = require('../utils/auth');

const UserController = Router();

/**
 * List User
 */
UserController.get('/', async (req, res, next) => {
    const list = await m$user.listUser(req.query.username);
    response.sendResponse(res, list);
});

/**
 * Detail User
 * @param {number} id_users
*/

UserController.get('/:id', async (req, res, next) => {
    const detail = await m$user.getUserById(req.params.id);
    response.sendResponse(res, detail);
} );

// /**
//  * Add User
//  * @param {string} name
//  * @param {string} email
//  */

// UserController.post('/', async (req, res, next) => {
//     // req body, req params, req query
//     const add = await m$user.addUser(req.body);
//     response.sendResponse(res, add);
// });

// /**
//  * Edit User
//  * @param {string} name
//  * @param {string} email
// */

// UserController.put('/', async (req, res, next) => {
//     const edit = await m$user.editUser(req.body);
//     response.sendResponse(res, edit);
// });

// /**
//  * Delete User
//  * @param {number} id
// */

// UserController.delete('/:id', async (req, res, next) => {
//     const del = await m$user.deleteUser(req.params.id);
//     response.sendResponse(res, del);
// });

module.exports = UserController;