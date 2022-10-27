const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../utils/auth');
const date = require('date-and-time');
// const db = require('../models');
const config = require('../config/app.config');
const jwt = require('jsonwebtoken');
const {log_error, log_success, log_info} = require('../utils/logging');
const {verifyNewAccount, verifyEmailForgotPassword, bodEmailRegister} = require('../utils/email_verify');
const randomstring = require("randomstring");
class _auth{
    constructor(db){
        this.db = db;
    }
    login = async (data) => {
        // Validate data
        const schema = joi.object({
            email: joi.string().email().required(),
            kata_sandi: joi.string().required()
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
        const checkUsername = await this.db.AuthUser.findOne({where : {email: value.email}});
        if (checkUsername == null) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Check status users
        if(checkUsername.status == 'inactive'){
            verifyNewAccount(checkUsername);
            return {
                code: 401,
                error: 'Sorry, your account is not verified, please check your email'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.kata_sandi, checkUsername.kata_sandi);
        if (!isMatch) {
            return {
                code: 400,
                error: 'Sorry, password not match'
            }
        }

        // Generate token
        const token = generateToken({ 
            id_user: checkUsername.id_user, 
            nama_pengguna: checkUsername.nama_pengguna, 
            role: checkUsername.role,
            status: checkUsername.status,
            id_peternakan: checkUsername.id_peternakan
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
                expiresAt: date.format(date.addSeconds(new Date(), config.jwt.expiresIn), 'YYYY-MM-DD HH:mm:ss')
            },
        }
    }

    register = async (data) => {
        try{
            // Validate data
            const schema = joi.object({
                nama_pengguna: joi.string().alphanum().min(4).max(30).required(),
                email: joi.string().email().required(),
                nomor_telepon: joi.string().required(),
                alamat: joi.string().required(),
                nama_peternakan: joi.string().required(),
                kata_sandi: joi.string().min(8).required(),
                ulangi_kata_sandi: joi.ref('kata_sandi')
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
            const checkUsername = await this.db.AuthUser.findOne({
                where : {
                    nama_pengguna: value.nama_pengguna
                }
            });
            if (checkUsername !== null) {
                return {
                    code: 400,
                    error: 'Sorry, nama pengguna already exist'
                }
            }

            // check if email exist
            const checkEmail = await this.db.AuthUser.findOne({
                where : {
                    email: value.email
                }
            });
            if (checkEmail !== null) {
                return {
                    code: 400,
                    error: 'Sorry, email already exist'
                }
            }

            // add peternakan
            const addPeternakan = await this.db.Peternakan.create({
                nama_peternakan: value.nama_peternakan,
                alamat: value.alamat
            });
            if(addPeternakan == null){
                return {
                    code: 500,
                    error: 'Sorry, something went wrong'
                }
            }

            // Hash password
            value.kata_sandi = await hashPassword(value.kata_sandi);
            
            // Insert data
            const register = await this.db.AuthUser.create({
                nama_pengguna: value.nama_pengguna,
                email: value.email,
                role: 'admin',
                status: 'inactive',
                id_peternakan: addPeternakan.id_peternakan,
                nomor_telepon: value.nomor_telepon,
                kata_sandi: value.kata_sandi
            });
            if (register.affectedRows <= 0) {
                return {
                    code: 500,
                    error: 'Sorry, something went wrong'
                }
            }

            verifyNewAccount(register);

            return {
                code: 200,
                data: {
                    message: 'Email has been sent'
                }
            };
        }catch (error){
            log_error('emailVerification Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    logout = async (req, res) => {
        const update = await this.db.AuthUser.update({lastAccess: new Date()}, {where: {id_user: req.dataAuth.id_user}});
        if (update <= 0) {
            return {
                code: 500,
                error: 'Sorry, something went wrong'
            }
        }
        return {
            code: 200,
            data: {
                id_user: req.dataAuth.id_user,
                nama_pengguna: req.dataAuth.nama_pengguna,
                logoutAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }

    getProfile = async (req) => {
        try{
            // Query Data
            const list = await this.db.AuthUser.findOne({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status',  'createdAt', 'updatedAt'],
                include: [
                    {
                        model: this.db.Peternakan,
                        attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'createdAt', 'updatedAt']
                    }
                ],
                where : {
                    id_user: req.dataAuth.id_user
                }
             });
            if(list == null){
                return{
                    code: 404,
                    error: 'Data users not found'
                }
            }
            return {
                code: 200,
                data: list
            };
        }catch (error){
            log_error('getProfile Service', error);
            return {
                code: 500,
                error
            }
        }
    }
    
    deleteAccount = async (req) => {

        // Validate data
        const schema = joi.object({
            kata_sandi: joi.string().required()
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
        const checkUser = await this.db.AuthUser.findOne({where : {id_user: req.dataAuth.id_user}});
        if (checkUser == null) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.kata_sandi, checkUser.kata_sandi);
        if (!isMatch) {
            return {
                code: 404,
                error: 'Sorry, password not match'
            }
        }

        // Delete data
        const deletedAccount = await this.db.AuthUser.destroy({where: {id_user: req.dataAuth.id_user}});
        if (deletedAccount <= 0) {
            return {
                code: 500,
                error: `Sorry, delete account failed`
            }
        }

        return {
            code: 200,
            data: {
                id_user: req.dataAuth.id_user,
                nama_pengguna: req.dataAuth.nama_pengguna,
                deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }
    
    updateAccount = async (req) => {

        // Validate data
        const schema = joi.object({
            nama_pengguna: joi.string().required(),
            nomor_telepon: joi.string().required(),
            alamat: joi.string().required(),
            nama_peternakan: joi.string().required(),
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
        const updatedAccount = await this.db.AuthUser.update({
            nama_pengguna: value.nama_pengguna,
            nomor_telepon: value.nomor_telepon,
        }, {
            where: {
                id_user: req.dataAuth.id_user
            }
        });
        if (updatedAccount <= 0) {
            return {
                code: 500,
                error: `Sorry, update account failed`
            }
        }
        
        // Update peternakan
        const updatedPeternakan = await this.db.Peternakan.update({
            nama_peternakan: value.nama_peternakan,
            alamat: value.alamat,
        }, {
            where: {
                id_peternakan: req.dataAuth.id_peternakan
            }
        });
        if (updatedPeternakan <= 0) {
            return {
                code: 500,
                error: `Sorry, update peternakan failed`
            }
        }

        return {
            code : 200,
            data : {
                id_user: req.dataAuth.id_user,
                nama_pengguna: value.nama_pengguna,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }

    updatePassword = async (req) => {

        // Validate Data
        const schema = joi.object({
            kata_sandi: joi.string().required(),
            kata_sandi_baru: joi.string().required(),
            ulangi_kata_sandi_baru: joi.ref('kata_sandi_baru')
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
        const checkUser = await this.db.AuthUser.findOne({where : {id_user: req.dataAuth.id_user}});
        if (checkUser == null) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.kata_sandi, checkUser.kata_sandi);
        if (!isMatch) {
            return {
                code: 400,
                error: 'Sorry, password not match'
            }
        }

        // Hash password
        const newPassword = await hashPassword(value.kata_sandi_baru);

        // Update data
        const updatedPassword = await this.db.AuthUser.update({kata_sandi: newPassword}, {where: {id_user: req.dataAuth.id_user}});
        if (updatedPassword <= 0) {
            return {
                code: 500,
                error: `Sorry, update password failed`
            }
        }

        return {
            code : 200,
            data : {
                id_user: req.dataAuth.id_user,
                nama_pengguna: checkUser.nama_pengguna,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }  

    // Verify token
    verify = async (req) => {
        try{
            const user = await this.db.AuthUser.findOne({
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status', 'lastAccess', 'createdAt', 'updatedAt'],
                include: [{
                    model: this.db.Peternakan,
                    as: 'peternakan'
                }],
                where : {
                    id_user: req.dataAuth.id_user
                }
            });
            if (user == null) {
                return {
                    code: 404,
                    error: 'Sorry, user not found'
                }
            }

            user.dataValues.iat = req.dataAuth.iat;
            user.dataValues.exp = req.dataAuth.exp;
            user.dataValues.time = new Date()
            return {
                code: 200,
                data: user
            };
        }catch (error){
            log_error('verify Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // verify Account
    verifyAccount = async (token) => {
        try{
            const decoded = jwt.verify(token, config.jwt.secret)
            
            if(decoded.message == 'verification'){
                const activateAccount = await this.db.AuthUser.update({status: 'active'}, {where: {id_user: decoded.id_user}});
                if (activateAccount <= 0) {
                    return {
                        code: 500,
                        error: `Sorry, activate account failed`
                    }
                }
            }else{
                return {
                    code: 400,
                    error: 'Sorry, token invalid'
                }
            }
            
            return {
                code: 200,
                data: {
                    message: 'Account has been activated'
                }
            };
        }catch(error){
            log_error('verifyAccount Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    forgotPassword = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                email: joi.string().email().required(),
            });
            const {error, value} = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map(detail => detail.message).join(', ');
                log_error('forgotPassword Service', errorDetails);
                return {
                    code: 400,
                    error: errorDetails
                }
            }
            // Check if user exist
            const checkUser = await this.db.AuthUser.findOne({where : {email: value.email}});
            if (checkUser == null) {
                return {
                    code: 400,
                    error: 'Sorry, user not found'
                }
            }

            // updatedTempPassword
            const tempPassword = randomstring.generate(8);
            const tempPasswordHash = await hashPassword(tempPassword);
            const updatedTempPassword = await this.db.AuthUser.update({kata_sandi: tempPasswordHash}, {where: {id_user: checkUser.id_user}});
            if (updatedTempPassword <= 0) {
                return{
                    code: 500,
                    error: 'Sorry, update temp password failed'
                }
            }

            verifyEmailForgotPassword(checkUser, tempPassword);

            return {   
                code: 200,
                data: {
                    message: 'Email has been sent'
                }
            };
        }catch (error){
            log_error('emailVerification Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Register bod
    registerBod = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                email: joi.string().email().required(),
            });
            const {error, value} = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map(detail => detail.message).join(', ');
                log_error('registerBod Service', errorDetails);
                return {
                    code: 400,
                    error: errorDetails
                }
            }

            // Check if user exist
            const checkUser = await this.db.AuthUser.findOne({where : {email: value.email}});
            if (checkUser != null) {
                return {
                    code: 400,
                    error: 'Sorry, user already exist'
                }
            }

            // Generate random nama_pengguna
            let isUnique = false;
            while(!isUnique){
                const randomUsername = randomstring.generate(10);
                const checkUsername = await this.db.AuthUser.findOne({where : {nama_pengguna: randomUsername}});
                if (checkUsername == null) {
                    isUnique = true;
                    value.nama_pengguna = randomUsername;
                }
            }

            // Generate Random password
            const randomPassword = randomstring.generate(8);
            const kata_sandi = await hashPassword(randomPassword);

            // Create user
            const user = await this.db.AuthUser.create({
                nama_pengguna: value.nama_pengguna,
                email: value.email,
                status: 'active',
                role: 'bod',
                id_peternakan: req.dataAuth.id_peternakan,
                kata_sandi
            });
            if (user == null) {
                return{
                    code: 500,
                    error: 'Sorry, create user failed'
                }
            }

            bodEmailRegister(value.email, randomPassword);

            return {
                code: 200,
                data: {
                    message: 'Email has been sent',
                    id_user: user.id_user,
                    email: user.email,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }catch (error){
            log_error('registerBod Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _auth(db);