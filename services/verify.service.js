// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const config = require('../config/jwt.config.json');
const jwt = require('jsonwebtoken');
const db = require('../models');

class _verify{
    // Verify token
    verify = async (req) => {
        try{
            const decoded = jwt.verify(req.body.token, config.secret)

            const user = await db.AuthUser.findOne({where : {username: decoded.username}});
            if (user == null) {
              res.status(401).send({ code: 401, error: 'Not authorized' })
            }
            return {
                code: 200,
                data: {
                    id: user.id_users,
                    user: user.username,
                    name: user.nama_lengkap,
                    level: user.role,
                    time: new Date(),
                    v: 'p',
                    iat: decoded.iat,
                    exp: decoded.exp
                }
            };
        }catch (error){
            console.error('getUsers user module Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _verify();