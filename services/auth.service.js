const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../utils/auth');
const date = require('date-and-time');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const AuthModel = require('../models/auth.model')(sequelize, DataTypes)
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
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        // const checkUsername = await this.db.query('SELECT * FROM auth_users WHERE username = ?', [value.username]);
        const checkUsername = await AuthModel.findOne({where : {username: value.username}});
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
            return {
                code: 400,
                error: errorDetails
            }
        }
        // Check if user exist
        const checkUser = await AuthModel.findOne({where : {username: value.username}});
        if (checkUser !== null) {
            return {
                code: 400,
                error: 'Sorry, username already exist'
            }
        }

        // Hash password
        value.password = await hashPassword(value.password);
        
        // Insert data
        const register = await AuthModel.create({
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
        const update = await AuthModel.update({lastAccess: new Date()}, {where: {id_users: req.dataAuth.id_users}});
        console.log('update = ' + update);
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
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        // const checkUser = await this.db.query('SELECT * FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        const checkUser = await AuthModel.findOne({where : {id_users: req.dataAuth.id_users}});
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
        // const deletedAccount = await this.db.query('DELETE FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        const deletedAccount = await AuthModel.destroy({where: {id_users: req.dataAuth.id_users}});
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
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Update data
        const updatedAccount = await AuthModel.update({
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
            return {
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        // const checkUser = await this.db.query('SELECT * FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        const checkUser = await AuthModel.findOne({where : {id_users: req.dataAuth.id_users}});
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
        const updatedPassword = await AuthModel.update({password: newPassword}, {where: {id_users: req.dataAuth.id_users}});
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
}

module.exports = new _auth();