const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../utils/auth');
const date = require('date-and-time');
const db = require('../models');
const config = require('../config/jwt.config.json');
const jwt = require('jsonwebtoken');
const {log_error} = require('../utils/logging');
class _auth{
    login = async (data) => {
        // Validate data
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        });
        const {error, value} = schema.validate(data);
        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(',');
            log_error('login Service', errorDetails);
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUsername = await db.AuthUser.findOne({where : {username: value.username}});
        if (checkUsername == null) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.password, checkUsername.password);
        if (!isMatch) {
            return {
                code: 400,
                error: 'Sorry, password not match'
            }
        }

        // Generate token
        const token = generateToken({ 
            id: checkUsername.id_users, 
            username: value.username, 
            role: checkUsername.role
        });
        if (!token) {
            return {
                code: 500,
                error: 'Sorry, something went wrong'
            }
        }

        return {
            code : 200,
            data: {
                token,
                expiresAt: date.format(date.addSeconds(new Date(), 3600), 'YYYY-MM-DD HH:mm:ss')
            },
        }
    }

    register = async (data) => {
        // Validate data
        const schema = joi.object({
            nama_lengkap: joi.string().required(),
            username: joi.string().alphanum().min(4).max(30).required(),
            email: joi.string().email().required(),
            no_hp: joi.string().required(),
            alamat: joi.string().required(),
            password: joi.string().min(8).required(),
            repeat_password: joi.ref('password')
        });
        const {error, value} = schema.validate(data);
        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(', ');
            log_error('register Service', errorDetails);
            return {
                code: 400,
                error: errorDetails
            }
        }
        // Check if user exist
        const checkUser = await db.AuthUser.findOne({where : {username: value.username}});
        if (checkUser !== null) {
            return {
                code: 400,
                error: 'Sorry, username already exist'
            }
        }

        // Hash password
        value.password = await hashPassword(value.password);
        
        // Insert data
        const register = await db.AuthUser.create({
            nama_lengkap: value.nama_lengkap,
            username: value.username,
            email: value.email,
            no_hp: value.no_hp,
            alamat: value.alamat,
            password: value.password
        });
        if (register.affectedRows <= 0) {
            return {
                code: 500,
                error: 'Sorry, something went wrong'
            }
        }

        return {
            code: 200,
            data : {
                id_users: register.id_users,
                username: register.username,
                registeredAt: date.format(register.createdAt, 'YYYY-MM-DD HH:mm:ss')
            },
        }
    }

    logout = async (req, res) => {
        const update = await db.AuthUser.update({lastAccess: new Date()}, {where: {id_users: req.dataAuth.id_users}});
        if (update <= 0) {
            return {
                code: 500,
                error: 'Sorry, something went wrong'
            }
        }
        return {
            code: 200,
            data: {
                id_users: req.dataAuth.id_users,
                username: req.dataAuth.username,
                logoutAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }

    deleteAccount = async (req) => {

        // Validate data
        const schema = joi.object({
            password: joi.string().required()
        });
        const {error, value} = schema.validate(req.body);
        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(', ');
            log_error('deleteAccount Service', errorDetails);
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUser = await db.AuthUser.findOne({where : {id_users: req.dataAuth.id_users}});
        if (checkUser == null) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.password, checkUser.password);
        if (!isMatch) {
            return {
                code: 404,
                error: 'Sorry, password not match'
            }
        }

        // Delete data
        const deletedAccount = await db.AuthUser.destroy({where: {id_users: req.dataAuth.id_users}});
        if (deletedAccount <= 0) {
            return {
                code: 500,
                error: `Sorry, delete account failed`
            }
        }

        return {
            code: 200,
            data: {
                id_users: req.dataAuth.id_users,
                username: req.dataAuth.username,
                deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }
    
    updateAccount = async (req) => {

        // Validate data
        const schema = joi.object({
            nama_lengkap: joi.string().required(),
            username: joi.string().required(),
            email: joi.string().required(),
            no_hp: joi.string().required(),
            alamat: joi.string().required()
        });
        const {error, value} = schema.validate(req.body);
        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(', ');
            log_error('updateAccount Service', errorDetails);
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Update data
        const updatedAccount = await db.AuthUser.update({
            nama_lengkap: value.nama_lengkap,
            username: value.username,
            email: value.email,
            no_hp: value.no_hp,
            alamat: value.alamat
        }, {where: {id_users: req.dataAuth.id_users}});
        if (updatedAccount <= 0) {
            return {
                code: 500,
                error: `Sorry, update account failed`
            }
        }

        return {
            code : 200,
            data : {
                id_users: req.dataAuth.id_users,
                username: value.username,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }

    updatePassword = async (req) => {

        // Validate Data
        const schema = joi.object({
            password: joi.string().required(),
            new_password: joi.string().required()
        });
        const {error, value} = schema.validate(req.body);
        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(', ');
            log_error('updatePassword Service', errorDetails);
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUser = await db.AuthUser.findOne({where : {id_users: req.dataAuth.id_users}});
        if (checkUser == null) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.password, checkUser.password);
        if (!isMatch) {
            return {
                code: 400,
                error: 'Sorry, password not match'
            }
        }

        // Hash password
        const newPassword = await hashPassword(value.new_password);

        // Update data
        const updatedPassword = await db.AuthUser.update({password: newPassword}, {where: {id_users: req.dataAuth.id_users}});
        if (updatedPassword <= 0) {
            return {
                code: 500,
                error: `Sorry, update password failed`
            }
        }

        return {
            code : 200,
            data : {
                id_users: req.dataAuth.id_users,
                username: checkUser.username,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }  

    // Verify token
    verify = async (req) => {
        try{
            const schema = joi.object({
                token: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map(detail => detail.message).join(', ');
                log_error('verify Service', errorDetails);
                return {
                    code: 400,
                    error: errorDetails
                }
            }

            const decoded = jwt.verify(value.token, config.secret)

            const user = await db.AuthUser.findOne({where : {username: decoded.username}});
            if (user == null) {
                return {
                    code: 404,
                    error: 'Sorry, user not found'
                }
            }
            return {
                code: 200,
                data: {
                    id: user.id_users,
                    user: user.username,
                    name: user.nama_lengkap,
                    level: user.role,
                    foto: user.foto,
                    email: user.email,
                    noHp: user.no_hp,
                    alamat: user.alamat,
                    time: new Date(),
                    v: 'p',
                    iat: decoded.iat,
                    exp: decoded.exp
                }
            };
        }catch (error){
            log_error('verify Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _auth();