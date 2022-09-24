// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');
class _fase{
    // Get Fase
    getFase = async (req) => {
        try{
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
            
            // Query Data
            let query = 'SELECT id_fp, fase FROM d_fase_pemeliharaan WHERE id_users = ?';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.body.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data fase tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listFase fase Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new fase
    createFase = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                fase: joi.string().required()
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

            const add = await mysql.query('INSERT INTO d_fase_pemeliharaan (id_users, fase) VALUES (?, ?)', [data.id_users, data.fase]);

            return {
                status: true,
                message: `Fase ${data.fase} berhasil ditambahkan`,
            };
        }
        catch (error) {
            console.error('createFase fase service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update fase
    updateFase = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_fp: joi.number().required(),
                fase: joi.number().required(),
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

            const update = await mysql.query('UPDATE d_fase_pemeliharaan SET fase = ? WHERE id_fp = ? AND id_users = ?', [data.fase, data.id_fp, data.id_users]);

            return {
                status: true,
                message: 'Fase berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateFase fase service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete fase
    deleteFase = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_fp: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_fase_pemeliharaan WHERE id_fase = ? AND id_users = ?', [data.id_fp, data.id_users]);

            return {
                status: true,
                message: 'Fase berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteFase fase service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _fase();