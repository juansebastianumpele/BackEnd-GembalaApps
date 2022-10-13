const { Router } = require('express');
const s$dashboard = require('../services/dashboard.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {adminAuth, employeeAuth} = require('../middlewares/authorization');

const PopulasiController = Router();

/**
 * Get Populasi
 */
PopulasiController.get('/populasi', authentication, async (req, res, next) => {
    const list = await s$dashboard.getPopulasi(req);
    response.sendResponse(res, list);
});
s$dashboard.createPopulasi();

/**
 * Get jumlah ternak sakit dan sehat
 */
PopulasiController.get('/status_kesehatan', authentication, async (req, res, next) => {
    const list = await s$dashboard.getStatusKesehatan(req);
    response.sendResponse(res, list);
});

module.exports = PopulasiController;