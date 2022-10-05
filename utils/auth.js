const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/jwt.config')

const generateToken = (payload) => {
    return jwt.sign(payload, config.secret, {algorithm: "HS256", expiresIn: config.expiresIn });
}

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}


module.exports = {generateToken, hashPassword, comparePassword};