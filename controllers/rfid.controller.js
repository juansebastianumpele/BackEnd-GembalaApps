const { Router } = require('express');
const rfidService = require('../services/rfid.service');
const response = require('../utils/response');

const rfidController = (db) => {
    const s$rfid = rfidService(db);
    const RfidController = Router();

    /**
     * Add Ternak
     * @param {string} rf_id
     * @param {number} id_peternakan
     * @param {string} jenis_ternak_baru
    */
    RfidController.post('/', async (req, res, next) => {
        const detail = await s$rfid.rfid(req);
        response.sendResponse(res, detail);
    } );

    /**
     * Get Data Ternak
    */
    RfidController.get('/', async (req, res, next) => {
        const detail = await s$rfid.rfidGetTernak(req);
        response.sendResponse(res, detail);
    } );

    return RfidController;
}

module.exports = rfidController;