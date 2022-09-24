const { Router } = require('express');
const s$auth = require('../services/auth.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');

const AuthController = Router();

/**
 * Login
 * @param {string} username
 * @param {string} password
 */

AuthController.post('/login', async (req, res, next) => {
    req.cookies = req.headers.cookie;
    const login = await s$auth.login(req.body);
    response.sendResponse(res, login);
});

/**
 * Register
 * @param {string} nama_mitra
 * @param {string} username
 * @param {string} email
 * @param {string} no_hp
 * @param {string} alamat
 * @param {string} password
 */

AuthController.post('/register', async (req, res, next) => {
    const register = await s$auth.register(req.body);
    response.sendResponse(res, register);
});

/**
 * Logout
 */

AuthController.post('/logout', authMiddleware, async (req, res, next) => {
    const logout = await s$auth.logout(req, res);
    response.sendResponse(res, logout);
});

/**
 * Delete Account
 * @param {string} password
 */

AuthController.delete('/delete-account', authMiddleware, async (req, res, next) => {
    const deleteAccount = await s$auth.deleteAccount(req.body);
    response.sendResponse(res, deleteAccount);
});

/**
 * Update Account
 * @param {string} nama_mitra
 * @param {string} username
 * @param {string} email
 * @param {string} no_hp
 * @param {string} alamat
 */

AuthController.put('/update-account', authMiddleware, async (req, res, next) => {
    const updateAccount = await s$auth.updateAccount(req.body);
    response.sendResponse(res, updateAccount);
});

/**
 * Update Password
 * @param {string} password
 * @param {string} newPassword
 */

AuthController.put('/update-password', authMiddleware, async (req, res, next) => {
    const updatePassword = await s$auth.updatePassword(req.body);
    response.sendResponse(res, updatePassword);
});

module.exports = AuthController;