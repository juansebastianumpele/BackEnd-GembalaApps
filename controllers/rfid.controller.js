const { Router } = require('express');
const s$rfid = require('../services/rfid.service');
const response = require('../utils/response');

const RfidController = Router();

/**
 * Get Data Varietas
*/
RfidController.post('/', async (req, res, next) => {
    const detail = await s$rfid.rfid(req);
    response.sendResponse(res, detail);
} );

module.exports = RfidController;