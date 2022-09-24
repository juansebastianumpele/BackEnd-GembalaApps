const joi = require('joi');
const mysql = require('../utils/database');
const {generateToken, comparePassword, hashPassword} = require('../utils/auth');
const date = require('date-and-time');

class _auth{
    login = async (data) => {
        // Validate data
        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        });
        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUsername = await mysql.query('SELECT * FROM auth_users WHERE username = ?', [data.username]);
        if (checkUsername.length <= 0) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(data.password, checkUsername[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        // Generate token
        const token = generateToken({ username: data.username });
        if (!token) {
            return {
                status: false,
                code: 500,
                data: 'Sorry, something went wrong'
            }
        }

        return {
            status: true,
            message: 'Login successful',
            data: {
                token,
                expiresIn: date.format(date.addSeconds(new Date(), 3600), 'YYYY-MM-DD HH:mm:ss')
            },
        }
    }

    register = async (data) => {

        // Validate data
        const schema = joi.object({
            nama_mitra: joi.string().required(),
            username: joi.string().required(),
            email: joi.string().required(),
            no_hp: joi.string().required(),
            alamat: joi.string().required(),
            password: joi.string().required()
        });
        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);

            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUser = await mysql.query('SELECT * FROM auth_users WHERE username = ?', [data.username]);
        if (checkUser.length > 0) {
            return {
                status: false,
                code: 400,
                data: 'Sorry, username already exist'
            }
        }

        // Hash password
        data.password = await hashPassword(data.password);
        
        // Insert data
        const register = await mysql.query(
            'INSERT INTO auth_users (nama_mitra, username, email, no_hp, alamat, password) VALUES (?, ?, ?, ?, ?, ?)',
            [data.nama_mitra, data.username, data.email, data.no_hp, data.alamat, data.password]);
        if (register.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                data: 'Sorry, something went wrong'
            }
        }

        return {
            status: true,
            message: 'Register successful',
        }
    }

    logout = async (req, res) => {
        const schema = joi.object({
            id_users: joi.number().required(),
            role: joi.string().required()
        });
        const validate = schema.validate(req.body);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);

            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        res.clearCookie('token');
        const update = await mysql.query(`UPDATE auth_users SET userLastAccess = ? WHERE id_users = ?`, [new Date(), res.body.id_users]);
        if (update.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                data: 'Sorry, something went wrong'
            }
        }
        return {
            status: true,
            message: 'Logout successful',
        }
    }

    deleteAccount = async (data) => {

        // Validate data
        const schema = joi.object({
            id_users: joi.number().required(),
            role: joi.string().required(),
            password: joi.string().required()
        });
        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);

            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUser = await mysql.query('SELECT * FROM auth_users WHERE id_users = ?', [id]);
        if (checkUser.length <= 0) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(data.password, checkUser.data[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        // Delete data
        const deletedAccount = await mysql.query('DELETE FROM auth_users WHERE id_users = ?', [data.id_users]);
        if (deletedAccount.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                data: `Sorry, delete account failed, Error: ${deleteAccount.error}`
            }
        }

        return {
            status: true,
            message: 'Delete account successful',
        }
    }
    
    updateAccount = async (data) => {

        // Validate data
        const schema = joi.object({
            id_users: joi.number().required(),
            role: joi.string().required(),
            nama_lengkap: joi.string().required(),
            username: joi.string().required(),
            email: joi.string().required(),
            no_hp: joi.string().required(),
            alamat: joi.string().required()
        });
        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Update data
        const updatedAccount = await mysql.query(
            'UPDATE auth_users SET nama_mitra = ?, username = ?, email = ?, no_hp = ?, alamat = ?  WHERE id_users = ?', 
            [data.nama_mitra, data.username, data.email, data.no_hp, data.alamat, data.id_users]);
        if (updatedAccount.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                data: `Sorry, update account failed, Error: ${updateAccount.error}`
            }
        }

        return {
            status: true,
            message: 'Update account successful',
        }
    }

    updatePassword = async (data) => {

        // Validate Data
        const schema = joi.object({
            id_users: joi.number().required(),
            password: joi.string().required(),
            new_password: joi.string().required()
        });
        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message);
            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUser = await mysql.query('SELECT * FROM auth_users WHERE id_users = ?', [data.id_users]);
        if (checkUser.length <= 0) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(data.password, checkUser[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                data: 'Sorry, password not match'
            }
        }

        // Hash password
        data.new_password = await hashPassword(data.new_password);

        // Update data
        const updatedPassword = await mysql.query('UPDATE auth_users SET password = ? WHERE id_users = ?', [data.new_password, data.id_users]);
        if (updatedPassword.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                data: `Sorry, update password failed, Error: ${updatePassword.error}`
            }
        }

        return {
            status: true,
            message: 'Update password successful',
        }
    }
        
}

module.exports = new _auth();