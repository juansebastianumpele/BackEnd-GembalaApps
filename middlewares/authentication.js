const config = require('../config/app.config')
const jwt = require('jsonwebtoken')
const { log_error, log_info } = require('../utils/logging');
const db = require('../models');
const response = require('../utils/response');

const authentication = async (req, res, next) => {

    // Check token in header
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {

        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret)

        // Set user from decoded token
        const user = await db.AuthUser.findOne({where : {username: decoded.username}});
        console.log(user);
        if (user == null) {
          response.sendResponse(res, {code: 401, error: 'Invalid token'})
          return
        }

        // Check status user
        if(user.status == 'inactive'){
            res.status(401).send({ code: 401, error: 'Not authorized, User Unverifed' })
            return
        }

        // Set user to request
        req.dataAuth = {
          id_users: decoded.id_users,
          username: decoded.username,
          role: decoded.role,
          status: decoded.status,
          id_peternakan: decoded.id_peternakan
        }
        
        next()
        return
      } catch (error) {
        log_error('Authentication Middleware', error)
        response.sendResponse(res, {code: 401, error})
        return
      }
    }
  
    if (!token) {
      response.sendResponse(res, {code: 401, error: 'Not authorized, no token'})
      return
    }
}

module.exports = authentication