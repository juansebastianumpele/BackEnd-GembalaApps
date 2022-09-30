// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');
class _fase{
    // Get Fase
    getFase = async (req) => {
        try{            
            // Query Data
            let query = 'SELECT * FROM d_fase_pemeliharaan';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_fase_pemeliharaan'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data fase tidak ditemukan'
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
    createFase = async (req) => {
        try {
            const schema = joi.object({
                fase: joi.string().required()
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

            const add = await mysql.query('INSERT INTO d_fase_pemeliharaan (fase) VALUES (?)', [value.fase]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan fase`
                }
            }

            return {
                status: true,
                message: `Fase ${value.fase} berhasil ditambahkan`,
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
    updateFase = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_fp: joi.number().required(),
                fase: joi.string().required(),
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

            const update = await mysql.query('UPDATE d_fase_pemeliharaan SET fase = ? WHERE id_fp = ?', [value.fase, value.id_fp]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah fase`
                }
            }

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
    deleteFase = async (req) => {
        try {
            const schema = joi.object({
                id_fp: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_fase_pemeliharaan WHERE id_fp = ?', [value.id_fp]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus fase`
                }
            }

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