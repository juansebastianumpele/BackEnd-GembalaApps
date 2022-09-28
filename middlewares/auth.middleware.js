const config = require('../config/app.config.json')
const mysql = require('../utils/database');
const jwt = require('jsonwebtoken')
// const m$user = require('../modules/user.modules')

const authMiddleware = async (req, res, next) => {
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]
        console.log(token)

        const decoded = jwt.verify(token, config.jwt.secret)

        console.log(decoded)

        const user = await mysql.query('SELECT * FROM auth_users WHERE username = ?', [decoded.username]);
        if (user.length <= 0) {
          res.status(401).send({ status: false, message: 'Not authorized' })
        }
        
        // req.body.id_users = user[0].id_users
        // req.body.role = user[0].level[0]
        req.dataAuth = {
          id_users: user[0].id_users,
          role: user[0].level[0]
        }
        next()
        
      } catch (error) {
        res.status(401).send({ status: false, message: 'Not authorized Error. Token Expired.', error })
      }
    }
  
    if (!token) {
      res.status(401).send({
        status: false,
        message: 'Not authenticated, no token'
      })
    }
}

module.exports = authMiddleware