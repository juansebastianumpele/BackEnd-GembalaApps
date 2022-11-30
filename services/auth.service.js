const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../utils/auth');
const date = require('date-and-time');
const config = require('../config/app.config');
const jwt = require('jsonwebtoken');
const {verifyNewAccount, verifyEmailForgotPassword, bodEmailRegister} = require('../utils/email_verify');
const randomstring = require("randomstring");
const {newError, errorHandler} = require('../utils/errorHandler');
const upload = require('../utils/upload');
const fs = require('fs');
const axios = require('axios');


class _auth{
    constructor(db){
        this.db = db;
    }
    /// Login Service
    login = async (data) => {
        try{
            // Validate data
            const schema = joi.object({
                email: joi.string().email().required(),
                kata_sandi: joi.string().required()
            });
            const {error, value} = schema.validate(data);
            if (error) newError(400, error.details[0].message, 'Login Service');

            // Check if user exist
            const checkUsername = await this.db.AuthUser.findOne({where : {email: value.email}});
            if (!checkUsername) newError(400, 'Email tidak terdaftar', 'Login Service');

            // Check status users
            if(checkUsername.status == 'inactive'){
                verifyNewAccount(checkUsername);
                newError(400, 'Sorry, your account is not verified, please check your email', 'Login Service');
            }

            // Compare password
            const isMatch = await comparePassword(value.kata_sandi, checkUsername.kata_sandi);
            if (!isMatch) newError(400, 'Password not match', 'Login Service');

            // Generate token
            const token = generateToken({ 
                id_user: checkUsername.id_user, 
                nama_pengguna: checkUsername.nama_pengguna, 
                role: checkUsername.role,
                status: checkUsername.status,
                id_peternakan: checkUsername.id_peternakan
            });
            if (!token) newError(400, 'Failed to generate token', 'Login Service');

            return {
                code : 200,
                data: {
                    token,
                    expiresAt: date.format(date.addSeconds(new Date(), config.jwt.expiresIn), 'YYYY-MM-DD HH:mm:ss')
                },
            }
        }catch(err){
            return errorHandler(err);
        }
    }

    /// Register Service
    register = async (data) => {
        const t = await this.db.sequelize.transaction();
        try{
            // Validate data
            const schema = joi.object({
                nama_pengguna: joi.string().alphanum().min(4).max(30).required(),
                email: joi.string().email().required(),
                nomor_telepon: joi.string().required(),
                alamat: joi.string().required(),
                postcode: joi.string().required(),
                nama_peternakan: joi.string().required(),
                kata_sandi: joi.string().min(8).required(),
                ulangi_kata_sandi: joi.ref('kata_sandi')
            });
            const {error, value} = schema.validate(data);
            if (error) newError(400, error.details[0].message, 'Register Service');

            // Check if user exist
            const checkUsername = await this.db.AuthUser.findOne({where : {nama_pengguna: value.nama_pengguna}});
            if (checkUsername) newError(400, 'Username already exist', 'Register Service');

            // check if email exist
            const checkEmail = await this.db.AuthUser.findOne({where : {email: value.email}});
            if (checkEmail) newError(400, 'Email already exist', 'Register Service');

            // Get longtitude, latitude and alamat_postcode external API
            const geocode = await axios.get(config.geocode.base_url, {
                params: {
                    auth: config.geocode.auth,
                    locate: value.postcode,
                    geoit: config.geocode.geoit,
                    region: config.geocode.region
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'application/json',
                }
            })
            if(!geocode) newError(400, 'Failed to get geocode', 'Register Service');

            // add peternakan
            const addPeternakan = await this.db.Peternakan.create({
                nama_peternakan: value.nama_peternakan,
                alamat: value.alamat,
                postcode: value.postcode,
                longitude: geocode.data.longt,
                latitude: geocode.data.latt,
                alamat_postcode: geocode.data.standard.city + ', ' + geocode.data.standard.statename + ', ' + geocode.data.standard.countryname + ', ' + geocode.data.standard.postal
            }, {transaction: t});
            if(!addPeternakan) newError(400, 'Failed to add peternakan', 'Register Service');

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
            }, {transaction: t});
            if (!register) newError(400, 'Failed to register', 'Register Service');

            // Send email verification
            verifyNewAccount(register);

            // Commit transaction
            await t.commit();

            return {
                code: 200,
                data: {
                    message: 'Email has been sent'
                }
            };
        }catch (error){
            await t.rollback();
            return errorHandler(error);
        }
    }

    /// Logout Service
    logout = async (req, res) => {
        try{
            const update = await this.db.AuthUser.update({lastAccess: new Date()}, {where: {id_user: req.dataAuth.id_user}});
            if (update <= 0) newError(400, 'Failed to logout', 'Logout Service');
            return {
                code: 200,
                data: {
                    id_user: req.dataAuth.id_user,
                    nama_pengguna: req.dataAuth.nama_pengguna,
                    logoutAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        }catch(err){
            return errorHandler(err);
        }
    }

    /// Get Profile Service
    getProfile = async (req) => {
        try{
            // Query Data
            const list = await this.db.AuthUser.findOne({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status'],
                include: [
                    {
                        model: this.db.Peternakan,
                        as: 'peternakan',
                        attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'postcode', 'alamat_postcode']
                    }
                ],
                where : {
                    id_user: req.dataAuth.id_user
                }
             });
            if(!list) newError(400, 'Failed to get profile', 'Get Profile Service');

            list.dataValues.image = list.dataValues.image ? `${req.protocol}://${req.get('host')}/avatar/${list.image}` : null;
            return {
                code: 200,
                data: list
            };
        }catch (error){
            return errorHandler(error);
        }
    }
    
    /// Delete Account Service
    deleteAccount = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                kata_sandi: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'DeleteAccount Service');

            // Check if user exist
            const checkUser = await this.db.AuthUser.findOne({where : {id_user: req.dataAuth.id_user}});
            if (!checkUser) newError(400, 'User not found', 'DeleteAccount Service');

            // Compare password
            const isMatch = await comparePassword(value.kata_sandi, checkUser.kata_sandi);
            if (!isMatch) newError(400, 'Password not match', 'DeleteAccount Service');

            // Delete data
            const deletedAccount = await this.db.AuthUser.destroy({where: {id_user: req.dataAuth.id_user}});
            if (deletedAccount <= 0) newError(400, 'Failed to delete account', 'DeleteAccount Service');

            return {
                code: 200,
                data: {
                    id_user: req.dataAuth.id_user,
                    nama_pengguna: req.dataAuth.nama_pengguna,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        }catch(err){
            return errorHandler(err);
        }
    }
    
    /// Update Account Service
    updateAccount = async (req) => {
        // Validate data
        const schema = joi.object({
            nama_pengguna: joi.string().required(),
            nomor_telepon: joi.string().required(),
            alamat: joi.string().required(),
            postcode: joi.string().required(),
            nama_peternakan: joi.string().required(),
        });
        const {error, value} = schema.validate(req.body);
        if (error) newError(400, error.details[0].message, 'UpdateAccount Service');
        
        // Check user account
        const checkUser = await this.db.AuthUser.findOne({where : {id_user: req.dataAuth.id_user}});
        if (!checkUser) newError(400, 'User not found', 'UpdateAccount Service');

        // Check peternakan
        const checkPeternakan = await this.db.Peternakan.findOne({where : {id_peternakan: checkUser.id_peternakan}});
        if (!checkPeternakan) newError(400, 'Peternakan not found', 'UpdateAccount Service');

        // if postcode is changed
        let geocode;
        if(value.postcode && value.postcode !== checkPeternakan.dataValues.postcode){
            // Get longtitude, latitude and alamat_postcode external API
            geocode = await axios.get(config.geocode.base_url, {
                params: {
                    auth: config.geocode.auth,
                    locate: value.postcode,
                    geoit: config.geocode.geoit,
                    region: config.geocode.region
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'application/json',
                }
            })
            if(!geocode) newError(400, 'Failed to get geocode', 'Register Service');
        }

        // Update data
        const updatedAccount = await this.db.AuthUser.update({
            nama_pengguna: value.nama_pengguna || checkUser.dataValues.nama_pengguna,
            nomor_telepon: value.nomor_telepon || checkUser.dataValues.nomor_telepon,
        }, {
            where: {id_user: req.dataAuth.id_user}
        });
        if (updatedAccount <= 0) newError(500, 'Failed to update account', 'UpdateAccount Service');
        
        // Update peternakan
        const updatedPeternakan = await this.db.Peternakan.update({
            nama_peternakan: value.nama_peternakan || checkPeternakan.dataValues.nama_peternakan,
            alamat: value.alamat || checkPeternakan.dataValues.alamat,
            postcode: value.postcode || checkPeternakan.dataValues.postcode,
            latitude: (value.postcode && value.postcode !== checkPeternakan.dataValues.postcode) ? geocode.data.latt : checkPeternakan.dataValues.latitude,
            longitude: (value.postcode && value.postcode !== checkPeternakan.dataValues.postcode) ? geocode.data.longt : checkPeternakan.dataValues.longitude,
            alamat_postcode: (value.postcode && value.postcode !== checkPeternakan.dataValues.postcode) ? geocode.data.standard.city + ', ' + geocode.data.standard.statename + ', ' + geocode.data.standard.countryname + ', ' + geocode.data.standard.postal : checkPeternakan.dataValues.alamat_postcode,
        }, {
            where: {id_peternakan: req.dataAuth.id_peternakan}
        });
        if (updatedPeternakan <= 0) newError(500, 'Failed to update peternakan', 'UpdateAccount Service');

        return {
            code : 200,
            data : {
                id_user: req.dataAuth.id_user,
                nama_pengguna: value.nama_pengguna,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }

    /// Update PAssword Service 
    updatePassword = async (req) => {
        // Validate Data
        const schema = joi.object({
            kata_sandi: joi.string().required(),
            kata_sandi_baru: joi.string().required(),
            ulangi_kata_sandi_baru: joi.ref('kata_sandi_baru')
        });
        const {error, value} = schema.validate(req.body);
        if (error) newError(400, error.details[0].message, 'UpdatePassword Service');

        // Check if user exist
        const checkUser = await this.db.AuthUser.findOne({where : {id_user: req.dataAuth.id_user}});
        if (!checkUser) newError(400, 'User not found', 'UpdatePassword Service');

        // Compare password
        const isMatch = await comparePassword(value.kata_sandi, checkUser.kata_sandi);
        if (!isMatch) newError(400, 'Password not match', 'UpdatePassword Service');

        // Hash password
        const newPassword = await hashPassword(value.kata_sandi_baru);

        // Update data
        const updatedPassword = await this.db.AuthUser.update({kata_sandi: newPassword}, {where: {id_user: req.dataAuth.id_user}});
        if (updatedPassword <= 0) newError(500, 'Failed to update password', 'UpdatePassword Service');

        return {
            code : 200,
            data : {
                id_user: req.dataAuth.id_user,
                nama_pengguna: checkUser.nama_pengguna,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }  

    /// Verify token
    verify = async (req) => {
        try{
            const user = await this.db.AuthUser.findOne({
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status', 'lastAccess'],
                include: [{
                    model: this.db.Peternakan,
                    as: 'peternakan',
                    attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'postcode', 'alamat_postcode']
                }],
                where : {
                    id_user: req.dataAuth.id_user
                }
            });
            if (!user) newError(400, 'User not found', 'Verify Service');

            user.dataValues.image = user.dataValues.image ? `${req.protocol}://${req.get('host')}/avatar/${user.image}` : null;
            user.dataValues.iat = req.dataAuth.iat;
            user.dataValues.exp = req.dataAuth.exp;
            user.dataValues.time = new Date()
            return {
                code: 200,
                data: user
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    /// verify Account
    verifyAccount = async (token) => {
        try{
            const decoded = jwt.verify(token, config.jwt.secret)
            
            if(decoded.message == 'verification'){
                const activateAccount = await this.db.AuthUser.update({status: 'active'}, {where: {id_user: decoded.id_user}});
                if (activateAccount <= 0) newError(500, 'Failed to activate account', 'VerifyAccount Service');
            }else{
                newError(400, 'Invalid token', 'VerifyAccount Service');
            }
            
            return {
                code: 200,
                data: {
                    message: 'Account has been activated'
                }
            };
        }catch(error){
            return errorHandler(error);
        }
    }

    /// Forgot Password
    forgotPassword = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                email: joi.string().email().required(),
            });
            const {error, value} = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'ForgotPassword Service');
            // Check if user exist
            const checkUser = await this.db.AuthUser.findOne({where : {email: value.email}});
            if (!checkUser) newError(400, 'User not found', 'ForgotPassword Service');

            // updatedTempPassword
            const tempPassword = randomstring.generate(8);
            const tempPasswordHash = await hashPassword(tempPassword);
            const updatedTempPassword = await this.db.AuthUser.update({kata_sandi: tempPasswordHash}, {where: {id_user: checkUser.id_user}});
            if (updatedTempPassword <= 0) newError(500, 'Failed to update temp password', 'ForgotPassword Service');

            verifyEmailForgotPassword(checkUser, tempPassword);

            return {   
                code: 200,
                data: {
                    message: 'Email has been sent'
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    /// Register bod
    registerBod = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                email: joi.string().email().required(),
            });
            const {error, value} = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'RegisterBod Service');

            // Check if user exist
            const checkUser = await this.db.AuthUser.findOne({where : {email: value.email}});
            if (checkUser) newError(400, 'User already exist', 'RegisterBod Service');

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
            if (!user) newError(500, 'Failed to create user', 'RegisterBod Service');

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
            return errorHandler(error);
        }
    }

    // Update photo profile
    uploadImage = async (req, res, next) => {
        try {
            // Remove old image
            const checkUser = await this.db.AuthUser.findOne({where : {id_user: req.dataAuth.id_user}});
            if (!checkUser) newError(400, 'User not found', 'UploadImage Service');

            upload.single('avatar')(req, res, async (err) => {
                if (err) newError(400, err.message, 'UploadImage Service');
                const image = req.file.filename;
                console.log(__basedir + '/public/static/images/' + image)

                if(fs.existsSync(__basedir + '/public/static/images/' + image)){
                    const updatedImage = await this.db.AuthUser.update({image}, {where: {id_user: req.dataAuth.id_user}});
                    if (updatedImage <= 0) newError(500, 'Failed to update image', 'UploadImage Service');
                }else{
                    newError(500, 'Failed to upload image', 'UploadImage Service');
                }
            })

            if (checkUser.dataValues.image != null) {
                const path = __basedir + '/public/static/images/' + checkUser.dataValues.image;
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
            }
            return {
                code: 200,
                data: {
                    id_user: req.dataAuth.id_user,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        } catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _auth(db);