// Helper databse yang dibuat
const joi = require('joi');
const {generateToken} = require('../utils/auth');
const config = require('../config/app.config')
const date = require('date-and-time');
const {newError, errorHandler} = require('../utils/errorHandler');

class _superAdmin{
    constructor(db){
        this.db = db;
    }
    // Get Data users
    getUsers = async (req) => {
        try{
            // Add query params
            req.query.role = 'admin';
            // Get data users
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
            if(list.length <= 0) newError(404, 'Data Users not found', 'getUsers Service');

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            return errorHandler(error);
        }
    }

    // Generate new toke for superadmin and bod 
    generateNewToken = async (req) => {
        try{
            // Validate request
            const schema = joi.object({
                id_peternakan: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'generateNewToken Service');
            
            // Generate new token
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
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _superAdmin(db);