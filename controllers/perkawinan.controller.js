const { Router } = require('express');
const perkawinanService = require('../services/perkawinan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const perkawinanController = (db) => {
    const s$perkawinan = perkawinanService(db);
    const PerkawinanController = Router();

    /**
     * Get Ternak in waiting list perkawinan
     */
    PerkawinanController.get('/waiting-list', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$perkawinan.getTernakWaitingList(req);
        response.sendResponse(res, list);
    });

    return PerkawinanController;
}

module.exports = perkawinanController;