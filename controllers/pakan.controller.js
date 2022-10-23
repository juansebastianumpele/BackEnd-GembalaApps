const { Router } = require('express');
const pakanService = require('../services/pakan.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { adminMiddleware } = require('../middlewares/authorization');

const pakanController = (db) => {
    const s$pakan = pakanService(db);
    const PakanController = Router();

    /**
     * Get Data Pakan
    */
    PakanController.get('/', authentication, adminMiddleware, async (req, res, next) => {
        const detail = await s$pakan.getPakan(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Pakan
     * @param {string} name_pakan
     * @param {string} deskripsi
     * @param {string} komposisi
     * @param {number} jumlah
     */
    PakanController.post('/', authentication, adminMiddleware, async (req, res, next) => {
        const add = await s$pakan.createPakan(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Pakan
     * @param {number} id_pakan
     * @param {string} name_pakan
     * @param {string} deskripsi
     * @param {string} komposisi
     * @param {number} jumlah
    */
    PakanController.put('/', authentication, adminMiddleware, async (req, res, next) => {
        const edit = await s$pakan.updatePakan(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Pakan
     * @param {number} id_pakan
    */
    PakanController.delete('/', authentication, adminMiddleware, async (req, res, next) => {
        const del = await s$pakan.deletePakan(req);
        response.sendResponse(res, del);
    });

    return PakanController;
}

module.exports = pakanController;