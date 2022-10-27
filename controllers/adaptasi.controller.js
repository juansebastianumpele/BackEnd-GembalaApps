const { Router } = require('express');
const adaptasiService = require('../services/adaptasi.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const adaptasiController = (db) => {
    const s$adaptasi = adaptasiService(db);
    const AdaptasiController = Router();

    /**
     * Get adaptasi by id_ternak
     */
    AdaptasiController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const list = await s$adaptasi.getAdaptasi(req);
        response.sendResponse(res, list);
    });

    return AdaptasiController;
}

module.exports = adaptasiController;