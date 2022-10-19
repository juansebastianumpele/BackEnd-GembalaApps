const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');
const s$dashboard = require('../services/dashboard.service');
const response = require('../utils/response');

const PopulasiController = Router();

/**
 * Get Populasi
 */
PopulasiController.get('/populasi', authentication, adminMiddleware, async (req, res, next) => {
    const list = await s$dashboard.getPopulasi(req);
    response.sendResponse(res, list);
});
s$dashboard.createPopulasi();

/**
 * Get jumlah ternak sakit dan sehat
 */
PopulasiController.get('/status_kesehatan', authentication, adminMiddleware, async (req, res, next) => {
    const list = await s$dashboard.getStatusKesehatan(req);
    response.sendResponse(res, list);
});

module.exports = PopulasiController;