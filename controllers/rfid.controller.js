const { Router } = require('express');
const rfidService = require('../services/rfid.service');
const response = require('../utils/response');

const rfidController = (db) => {
    const s$rfid = rfidService(db);
    const RfidController = Router();

    /**
     * Get Data Varietas
    */
    RfidController.post('/', async (req, res, next) => {
        const detail = await s$rfid.rfid(req);
        response.sendResponse(res, detail);
    } );

    return RfidController;
}

module.exports = rfidController;