const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');
const dashboardService = require('../services/dashboard.service');
const response = require('../utils/response');

const dashboardController = (db) => {
    const s$dashboard = dashboardService(db);
    const DashboardController = Router();

    /**
     * Get Populasi
     */
    DashboardController.get('/populasi', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$dashboard.getPopulasi(req);
        response.sendResponse(res, list);
    });
    s$dashboard.createPopulasi();

    /**
     * Get jumlah ternak sakit dan sehat
     */
    DashboardController.get('/status_kesehatan', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$dashboard.getStatusKesehatan(req);
        response.sendResponse(res, list);
    });

    return DashboardController;
}

module.exports = dashboardController;