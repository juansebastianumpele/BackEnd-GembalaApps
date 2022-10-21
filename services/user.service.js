// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');
class _user{
    // Get Data users
    getUsers = async (req) => {
        try{
            // Query Data
            const list = await db.AuthUser.findAll({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'alamat', 'nama_peternakan', 'role', 'status',  'createdAt', 'updatedAt'],
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

    getProfile = async (req) => {
        try{
            // Query Data
            const list = await db.AuthUser.findOne({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'alamat', 'nama_peternakan', 'role', 'status',  'createdAt', 'updatedAt'],
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
}

module.exports = new _user();