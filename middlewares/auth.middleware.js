const config = require('../config/app.config.json')
const mysql = require('../utils/database');
const jwt = require('jsonwebtoken')
// const m$user = require('../modules/user.modules')

const userSession = async (req, res, next) => {
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, config.jwt.secret)

        const user = await mysql.query('SELECT * FROM auth_users WHERE username = ?', [decoded.username]);
        console.log(user);
        if (user.length <= 0) {
          res.status(401).send({ message: 'Not authorized' })
        }
        
        req.body.id_users = user[0].id_users
        req.body.role = user[0].level[0]
        next()
        
      } catch (error) {
        res.status(401).send({ message: 'Not authorized Error. Token Expired.', error })
      }
    }
  
    if (!token) {
      res.status(401).send({
        message: 'Not authenticated, no token'
      })
    }
}

module.exports = userSession