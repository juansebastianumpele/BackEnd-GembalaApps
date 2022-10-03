const joi = require('joi');
const {generateToken, comparePassword, hashPassword} = require('../utils/auth');
const date = require('date-and-time');

class _auth{
    constructor(db){
        this.db = db;
    }
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
        const checkUsername = await this.db.query('SELECT * FROM auth_users WHERE username = ?', [value.username]);
        if (checkUsername.length <= 0) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.password, checkUsername[0].password);
        if (!isMatch) {
            return {
                code: 400,
                error: 'Sorry, password not match'
            }
        }

        // Generate token
        const token = generateToken({ 
            id: checkUsername[0].id_users, 
            username: value.username, 
            role: checkUsername[0].role
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
        const checkUser = await this.db.query('SELECT * FROM auth_users WHERE username = ?', [value.username]);
        if (checkUser.length > 0) {
            return {
                code: 400,
                error: 'Sorry, username already exist'
            }
        }

        // Hash password
        value.password = await hashPassword(value.password);
        
        // Insert data
        const register = await this.db.query(`
        INSERT INTO auth_users (nama_lengkap, username, email, no_hp, alamat, password) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            value.nama_lengkap, 
            value.username, 
            value.email, 
            value.no_hp, 
            value.alamat, 
            value.password
        ]);
        if (register.affectedRows <= 0) {
            return {
                code: 500,
                error: 'Sorry, something went wrong'
            }
        }

        const registerDetail = await this.db.query(`SELECT * FROM auth_users WHERE id_users = ?`, [register.insertId]);
        if (registerDetail.length <= 0) {
            return {
                code: 500,
                error: 'Sorry, something went wrong'
            }
        }

        return {
            code: 200,
            data : {
                id_users: registerDetail[0].id_users,
                username: registerDetail[0].username,
                registeredAt: date.format(registerDetail[0].createdAt, 'YYYY-MM-DD HH:mm:ss')
            },
        }
    }

    logout = async (req, res) => {
        // res.clearCookie('token');
        const update = await this.db.query(`UPDATE auth_users SET userLastAccess = ? WHERE id_users = ?`, [new Date(), req.dataAuth.id_users]);
        if (update.affectedRows <= 0) {
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
        const checkUser = await this.db.query('SELECT * FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        if (checkUser.length <= 0) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.password, checkUser[0].password);
        if (!isMatch) {
            return {
                code: 404,
                error: 'Sorry, password not match'
            }
        }

        // Delete data
        const deletedAccount = await this.db.query('DELETE FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        if (deletedAccount.affectedRows <= 0) {
            return {
                code: 500,
                error: `Sorry, delete account failed, Error: ${deletedAccount.error}`
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
        const updatedAccount = await this.db.query(
            `UPDATE auth_users 
            SET nama_lengkap = ?,
            username = ?,
            email = ?,
            no_hp = ?,
            alamat = ?  
            WHERE id_users = ?`,
            [
                value.nama_lengkap,
                value.username,
                value.email,
                value.no_hp,
                value.alamat,
                req.dataAuth.id_users
            ]);
        if (updatedAccount.affectedRows <= 0) {
            return {
                code: 500,
                error: `Sorry, update account failed, Error: ${updatedAccount.error}`
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
        const checkUser = await this.db.query('SELECT * FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        if (checkUser.length <= 0) {
            return {
                code: 404,
                error: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(value.password, checkUser[0].password);
        if (!isMatch) {
            return {
                code: 400,
                error: 'Sorry, password not match'
            }
        }

        // Hash password
        const newPassword = await hashPassword(value.new_password);

        // Update data
        const updatedPassword = await this.db.query('UPDATE auth_users SET password = ? WHERE id_users = ?', [newPassword, req.dataAuth.id_users]);
        if (updatedPassword.affectedRows <= 0) {
            return {
                code: 500,
                error: `Sorry, update password failed, Error: ${updatedPassword.error}`
            }
        }

        return {
            code : 200,
            data : {
                id_users: req.dataAuth.id_users,
                username: checkUser[0].username,
                updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            }
        }
    }  
}

const authService = (db) => {
    return new _auth(db);
}

module.exports = authService;