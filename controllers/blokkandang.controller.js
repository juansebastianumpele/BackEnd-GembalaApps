const { Router } = require('express');
const blokKandangService = require('../services/blokkandang.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {employeeAuth} = require('../middlewares/authorization');

const blokKandangController = (db) => {
    const s$blokKandang = blokKandangService(db);

    const BlokKandangController = Router();

    /**
     * Get Blok Kandang (use query)
    */

    BlokKandangController.get('/', authentication, async (req, res, next) => {
        const detail = await s$blokKandang.getBlokKandang(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Blok Kandang
     * @param {string} nama_kandang
     * @param {number} id_blok
     */

    BlokKandangController.post('/', authentication, employeeAuth, async (req, res, next) => {
        const add = await s$blokKandang.createBlokKandang(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Blok Kandang
     * @param {string} name_kandang
     * @param {string} id_blok
    */

    BlokKandangController.put('/', authentication, employeeAuth, async (req, res, next) => {
        const edit = await s$blokKandang.updateBlokKandang(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Blok Kandang
     * @param {number} id_kandang
    */

    BlokKandangController.delete('/', authentication, employeeAuth, async (req, res, next) => {
        const del = await s$blokKandang.deleteBlokKandang(req);
        response.sendResponse(res, del);
    });

    return BlokKandangController;
}

module.exports = blokKandangController;