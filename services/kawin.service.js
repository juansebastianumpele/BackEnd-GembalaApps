// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _kawin{
    // List Ternak by id
    getKawin = async (req) => {
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
            let query = `SELECT id_kawin, id_ternak, tanggal_kawin, id_pemancek FROM d_kawin WHERE id_users = ?`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.body.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data kawin tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listKawinByIdUsers kawin service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Kawin
    createDataKawin = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_ternak: joi.number().required(),
                tanggal_kawin: joi.date().required(),
                id_pemancek: joi.number().required()
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
            const add = await mysql.query('INSERT INTO d_kawin (id_users, id_ternak, tanggal_kawin, id_pemancek) VALUES (?, ?, ?, ?)', [data.id_users, data.id_ternak, data.tanggal_kawin, data.id_pemancek]);

            return {
                status: true,
                message: 'Data kawin berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update ternak
    updateDataKawin = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kawin: joi.number().required(),
                id_ternak: joi.number().required(),
                tanggal_kawin: joi.date().required(),
                id_pemancek: joi.number().required()
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
            const update = await mysql.query(
                `UPDATE d_kawin SET id_ternak = ?, tanggal_kawin = ?, id_pemancek = ? WHERE id_kawin = ? AND id_users = ?`,
                [data.id_ternak, data.tanggal_kawin, data.id_pemancek, data.id_kawin, data.id_users]);

            return {
                status: true,
                message: 'Data kawin berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateKawin kawin service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete Kawin
    deleteDataKawin = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kawin: joi.number().required(),
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
            const del = await mysql.query(`DELETE FROM d_kawin WHERE id_kawin = ? AND id_users = ?`, [data.id_kawin, data.id_users]);

            return {
                status: true,
                message: 'Data kawin berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteKawin kawin service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _kawin();