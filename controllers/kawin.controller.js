const { Router } = require('express');
const kawinService = require('../services/kawin.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const { employeeAuth } = require('../middlewares/authorization');

const kawinController = (db) => {
    const s$kawin = kawinService(db);
    const KawinController = Router();

    /**
     * Get Data Kawin
    */

    KawinController.get('/', authentication, async (req, res, next) => {
        const detail = await s$kawin.getKawin(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create new data kawin
     * @param {number} id_ternak
     * @param {string} tanggal_kawin
     * @param {number} id_pemancek
     */

    KawinController.post('/', authentication, employeeAuth, async (req, res, next) => {
        const add = await s$kawin.createDataKawin(req);
        response.sendResponse(res, add);
    });

    /**
     * Update data kawin
     * @param {number} id_kawin
     * @param {number} id_ternak
     * @param {string} tanggal_kawin
     * @param {number} id_pemancek
    */

    KawinController.put('/', authentication, employeeAuth, async (req, res, next) => {
        const edit = await s$kawin.updateDataKawin(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete data kawin
     * @param {number} id_kawin
    */

    KawinController.delete('/', authentication, employeeAuth, async (req, res, next) => {
        const del = await s$kawin.deleteDataKawin(req);
        response.sendResponse(res, del);
    });

    return KawinController;
}

module.exports = kawinController;