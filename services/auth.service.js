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
                message: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(data.password, checkUsername[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                message: 'Sorry, password not match'
            }
        }

        // Generate token
        const token = generateToken({ name: data.username, id: checkUsername[0].id_users, role: checkUsername[0].level[0] });
        if (!token) {
            return {
                status: false,
                code: 500,
                message: 'Sorry, something went wrong'
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
            username: joi.string().alphanum().min(4).max(30).required(),
            email: joi.string().email().required(),
            no_hp: joi.string().required(),
            alamat: joi.string().required(),
            password: joi.string().min(8).required(),
            repeat_password: joi.ref('password')
        });
        const validate = schema.validate(data);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message).join(', ');
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
                message: 'Sorry, username already exist'
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
                message: 'Sorry, something went wrong'
            }
        }

        return {
            status: true,
            message: 'Register successful',
        }
    }

    logout = async (req, res) => {
        res.clearCookie('token');
        console.log(req.dataAuth);
        const update = await mysql.query(`UPDATE auth_users SET userLastAccess = ? WHERE id_users = ?`, [new Date(), req.dataAuth.id_users]);
        if (update.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                message: 'Sorry, something went wrong'
            }
        }
        return {
            status: true,
            message: 'Logout successful',
        }
    }

    deleteAccount = async (req) => {

        // Validate data
        const schema = joi.object({
            password: joi.string().required()
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

        // Check if user exist
        const checkUser = await mysql.query('SELECT * FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        if (checkUser.length <= 0) {
            return {
                status: false,
                code: 404,
                message: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(req.body.password, checkUser[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                message: 'Sorry, password not match'
            }
        }

        // Delete data
        const deletedAccount = await mysql.query('DELETE FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        if (deletedAccount.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                message: `Sorry, delete account failed, Error: ${deletedAccount.error}`
            }
        }

        return {
            status: true,
            message: 'Delete account successful',
        }
    }
    
    updateAccount = async (req) => {

        // Validate data
        const schema = joi.object({
            nama_mitra: joi.string().required(),
            username: joi.string().required(),
            email: joi.string().required(),
            no_hp: joi.string().required(),
            alamat: joi.string().required()
        });
        const validate = schema.validate(req.body);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message).join(', ');
            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Update data
        const updatedAccount = await mysql.query(
            'UPDATE auth_users SET nama_mitra = ?, username = ?, email = ?, no_hp = ?, alamat = ?  WHERE id_users = ?', 
            [req.body.nama_mitra, req.body.username, req.body.email, req.body.no_hp, req.body.alamat, req.dataAuth.id_users]);
        if (updatedAccount.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                message: `Sorry, update account failed, Error: ${updatedAccount.error}`
            }
        }

        return {
            status: true,
            message: 'Update account successful',
        }
    }

    updatePassword = async (req) => {

        // Validate Data
        const schema = joi.object({
            password: joi.string().required(),
            new_password: joi.string().required()
        });
        const validate = schema.validate(req.body);
        if (validate.error) {
            const errorDetails = validate.error.details.map(detail => detail.message).join(', ');
            return {
                status: false,
                code: 400,
                error: errorDetails
            }
        }

        // Check if user exist
        const checkUser = await mysql.query('SELECT * FROM auth_users WHERE id_users = ?', [req.dataAuth.id_users]);
        if (checkUser.length <= 0) {
            return {
                status: false,
                code: 404,
                message: 'Sorry, user not found'
            }
        }

        // Compare password
        const isMatch = await comparePassword(req.body.password, checkUser[0].password);
        if (!isMatch) {
            return {
                status: false,
                code: 404,
                message: 'Sorry, password not match'
            }
        }

        // Hash password
        const newPassword = await hashPassword(req.body.new_password);

        // Update data
        const updatedPassword = await mysql.query('UPDATE auth_users SET password = ? WHERE id_users = ?', [newPassword, req.dataAuth.id_users]);
        if (updatedPassword.affectedRows <= 0) {
            return {
                status: false,
                code: 500,
                message: `Sorry, update password failed, Error: ${updatedPassword.error}`
            }
        }

        return {
            status: true,
            message: 'Update password successful',
        }
    }
        
}

module.exports = new _auth();