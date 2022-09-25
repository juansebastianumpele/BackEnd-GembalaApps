// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _varietas{
    // Get data varietas
    getVarietas = async (req) => {
        try{
            // Query data
            let query = 'SELECT id_varietas, nama_varietas FROM d_varietas WHERE id_users = ?';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.dataAuth.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data varietas tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getVarietas Varietas service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Varietas
    createVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_varietas: joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const add = await mysql.query('INSERT INTO d_varietas (id_users, nama_varietas) VALUES (?, ?)', [req.dataAuth.id_users, req.body.nama_varietas]);

            return {
                status: true,
                message: 'Data varietas berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createVarietas varietas service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update varietas
    updateVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_varietas: joi.number().required(),
                nama_varietas: joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const update = await mysql.query('UPDATE d_varietas SET nama_varietas = ? WHERE id_varietas = ? AND id_users = ?', [req.body.nama_varietas, req.body.id_varietas, req.dataAuth.id_users]);

            return {
                status: true,
                message: 'Data varietas berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateVarietas varietas service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete varietas
    deleteVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_varietas: joi.number().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const del = await mysql.query('DELETE FROM d_varietas WHERE id_varietas = ? AND id_users', [req.body.id_varietas, req.dataAuth.id_users]);

            return {
                status: true,
                message: 'Data varietas berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteVarietas varietas service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _varietas();