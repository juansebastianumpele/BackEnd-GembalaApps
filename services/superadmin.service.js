// Helper databse yang dibuat
const {log_error} = require('../utils/logging');
const joi = require('joi');
const {generateToken} = require('../utils/auth');
const config = require('../config/app.config')
const date = require('date-and-time');

class _superAdmin{
    constructor(db){
        this.db = db;
    }
    // Get Data users
    getUsers = async (req) => {
        try{
            // Add query params
            req.query.role = 'admin';
            // Query Data
            const list = await this.db.AuthUser.findAll({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'role', 'status'],
                include: [
                    {
                        model: this.db.Peternakan,
                        as: 'peternakan',
                        attributes: ['id_peternakan', 'nama_peternakan', 'alamat'],
                    }
                ],
                where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data users not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            log_error('getUsers Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Generate new toke for superadmin and bod 
    generateNewToken = async (req) => {
        try{
            const schema = joi.object({
                id_peternakan: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            
            const token = generateToken({ 
                id_user: req.dataAuth.id_user, 
                nama_pengguna: req.dataAuth.nama_pengguna, 
                role: req.dataAuth.role,
                status: req.dataAuth.status,
                id_peternakan: value.id_peternakan
            });

            return {
                code: 200,
                data: {
                    token,
                    expiresAt: date.format(date.addSeconds(new Date(), config.jwt.expiresIn), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        }
        catch (error){
            log_error('generateNewToken Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _superAdmin(db);