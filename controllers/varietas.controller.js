const { Router } = require('express');
const varietasService = require('../services/varietas.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');
const {employeeAuth} = require('../middlewares/authorization');

const varietasController = (db) => {
    const s$varietas = varietasService(db);
    const VarietasController = Router();

    /**
     * Get Data Varietas
    */
    VarietasController.get('/', authentication, async (req, res, next) => {
        const detail = await s$varietas.getVarietas(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Create Varietas
     * @param {string} nama_varietas
     */
    VarietasController.post('/', authentication, employeeAuth, async (req, res, next) => {
        const add = await s$varietas.createVarietas(req);
        response.sendResponse(res, add);
    });

    /**
     * Update Varietas
     * @param {string} id_varietas
     * @param {string} nama_varietas
    */
    VarietasController.put('/', authentication, employeeAuth, async (req, res, next) => {
        const edit = await s$varietas.updateVarietas(req);
        response.sendResponse(res, edit);
    });

    /**
     * Delete Varietas
     * @param {number} id_varietas
    */
    VarietasController.delete('/', authentication, employeeAuth, async (req, res, next) => {
        const del = await s$varietas.deleteVarietas(req);
        response.sendResponse(res, del);
    });

    return VarietasController;
}

module.exports = varietasController;