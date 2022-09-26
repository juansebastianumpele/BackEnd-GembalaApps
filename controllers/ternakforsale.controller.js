const { Router } = require('express');
const s$ternakForSale = require('../services/ternakforsale.service');
const response = require('../utils/response');
const authMiddleware = require('../middlewares/auth.middleware');


const TernakController = Router();


/**
 * Get List Ternak For Sale
*/

TernakController.get('/', async (req, res, next) => {
    const detail = await s$ternakForSale.getTernak(req);
    response.sendResponse(res, detail);
});

/**
 * Get List My ternak For Sale
*/

TernakController.get('/myternak', authMiddleware, async (req, res, next) => {
    const detail = await s$ternakForSale.getMyTernak(req);
    response.sendResponse(res, detail);
});

/**
 * Create new data ternak For Sale
 * @param {number} id_ternak
 * @param {string} harga_per
 * @param {number} harga
 */

TernakController.post('/', authMiddleware, async (req, res, next) => {
    const add = await s$ternakForSale.createTernak(req);
    response.sendResponse(res, add);
});

/**
 * Update data ternak
 * @param {number} id_ternak_for_sale
 * @param {string} harga_per
 * @param {number} harga
 */

TernakController.put('/', authMiddleware, async (req, res, next) => {
    const edit = await s$ternakForSale.updateTernak(req);
    response.sendResponse(res, edit);
});

/**
 * Delete data ternak
 * @param {number} id_ternak_for_sale
*/

TernakController.delete('/', authMiddleware, async (req, res, next) => {
    const del = await s$ternakForSale.deleteTernak(req);
    response.sendResponse(res, del);
});

module.exports = TernakController;