const { Router } = require('express');
const s$verify = require('../services/verify.service');
const response = require('../utils/response');
const authentication = require('../middlewares/authentication');

const VerifyController = Router();

/**
 * List User
 */
VerifyController.get('/', authentication, async (req, res, next) => {
    const list = await s$verify.verify(req);
    response.sendResponse(res, list);
});

module.exports = VerifyController;