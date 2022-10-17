const config = require('../config/app.config')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const { log_error, log_info } = require('../utils/logging');
const AuthModel = require('../models/auth.model')(sequelize, DataTypes)

const authentication = async (req, res, next) => {
    // Check url path is not need authentication
    log_info('autMiddleware', req.path)
    if(req.path == '/api/auth/login' || req.path == '/api/auth/register' || req.path == '/api/rfid' || req.path == '/api/auth/verify-account'){
      next()
      return
    }

    // Check token in header
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {

        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret)

        // Set user from decoded token
        const user = await AuthModel.findOne({where : {username: decoded.username}});
        if (user == null) {
          res.status(401).send({ code: 401, error: 'Not authorized' })
          return
        }

        // Set user to request
        req.dataAuth = {
          id_users: user.id_users,
          username: user.username,
          role: user.role,
          status: user.status,
          nama_lengkap: user.nama_lengkap,
        }
        
        // Check status user
        if(user.status == 'inactive' && req.path != '/api/auth/verify-account'){
            res.status(401).send({ code: 401, error: 'Not authorized, User Unverifed' })
            return
        }

        next()
      } catch (error) {
        log_error('Authentication Middleware', error)
        res.status(401).send({ code: 401, error })
        return
      }
    }
  
    if (!token) {
      res.status(401).send({
        code: 401,
        error: 'Not authenticated, no token'
      })
      return
    }
}

module.exports = authentication