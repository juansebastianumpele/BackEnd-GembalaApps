const config = require('../config/jwt.config')
const mysql = require('../utils/database');
const jwt = require('jsonwebtoken')
// const m$user = require('../modules/user.modules')

const authentication = async (req, res, next) => {
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, config.secret)

        const user = await mysql.query('SELECT * FROM auth_users WHERE username = ?', [decoded.username]);
        if (user.length <= 0) {
          res.status(401).send({ code: 401, error: 'Not authorized' })
        }

        req.dataAuth = {
          id_users: user[0].id_users,
          username: user[0].username,
          role: user[0].role
        }
        
        next()
        
      } catch (error) {
        res.status(401).send({ code: 401, error })
      }
    }
  
    if (!token) {
      res.status(401).send({
        code: 401,
        error: 'Not authenticated, no token'
      })
    }
}

module.exports = authentication