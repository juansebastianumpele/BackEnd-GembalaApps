// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _varietas{
    // Get data varietas
    getVarietas = async (req) => {
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
            let query = 'SELECT id_varietas, nama_varietas FROM d_varietas WHERE id_users = ?';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.body.id_users]);
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
    createVarietas = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_varietas: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', '),
                }
            }

            // Query data
            const add = await mysql.query('INSERT INTO d_varietas (id_users, nama_varietas) VALUES (?, ?)', [data.id_users, data.nama_varietas]);

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
    updateVarietas = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_varietas: joi.number().required(),
                nama_varietas: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', '),
                }
            }

            // Query data
            const update = await mysql.query('UPDATE d_varietas SET nama_varietas = ? WHERE id_varietas = ? AND id_users = ?', [data.nama_varietas, data.id_varietas, data.id_users]);

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
    deleteVarietas = async (data) => {
        try {
            // Validate data
            const body = { data };
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_varietas: joi.number().required(),
            });

            const { error, value } = schema.validate(body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', '),
                }
            }

            // Query data
            const del = await mysql.query('DELETE FROM d_varietas WHERE id_varietas = ? AND id_users', [data.id_varietas, data.id_users]);

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