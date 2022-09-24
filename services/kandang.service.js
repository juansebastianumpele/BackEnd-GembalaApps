// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _kandang{
    // Get Kandang
    getKandang = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }
            
            // Query data
            let query = `SELECT id_kandang, nama_kandang, blok_kandang FROM d_kandang WHERE id_users = ?`
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.body.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data kandang tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('GetKandang Kandang Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new kandang
    createKandang = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_kandang: joi.string().required(),
                blok_kandang: joi.string().required(),
            });

            const {error, value} = schema.validate(data);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const add = await mysql.query('INSERT INTO d_kandang (id_users, nama_kandang, blok_kandang) VALUES (?, ?, ?)', [data.id_users, data.nama_kandang, data.blok_kandang]);

            return {
                status: true,
                massage: 'Data kandang berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createKandang kandang service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update kandang
    updateKandang = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kandang: joi.number().required(),
                nama_kandang: joi.string().required(),
                blok_kandang: joi.string().required()
            });

            const {error, value} = schema.validate(data);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const update = await mysql.query('UPDATE d_kandang SET nama_kandang = ?, blok_kandang = ? WHERE id_kandang = ? AND id_users = ?', [data.nama_kandang, data.blok_kandang, data.id_kandang, data.id_users]);

            return {
                status: true,
                massage: 'Data kandang berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateKandang kandang service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete kandang
    deleteKandang = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kandang: joi.number().required(),
            });

            const {error, value} = schema.validate(data);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const del = await mysql.query('DELETE FROM d_kandang WHERE id_kandang = ? AND id_users = ?', [data.id_kandang, data.id_users]);

            return {
                status: true,
                massage: 'Data kandang berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteKandang kandang service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _kandang();