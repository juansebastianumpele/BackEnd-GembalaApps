// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _timbangan{

    // get Data Timbangan
    getDataTimbangan = async (req) => {
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
            let query = `SELECT id_timbangan, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal FROM d_timbangan WHERE id_users = ?`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.body.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: `Data timbangan tidak ditemukan`
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getTimbangan timbangan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Data Timbangan
    createDataTimbangan = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                berat_berkala: joi.number().required(),
                suhu_berkala: joi.number().required(),
                tanggal: joi.date().required()
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
            const add = await mysql.query(`INSERT INTO d_timbangan (id_users, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal) VALUES (?, ?, ?, ?, ?, ?)`, [data.id_users, data.id_ternak, data.rf_id, data.berat_berkala, data.suhu_berkala, data.tanggal]);

            return {
                status: true,
                message: 'Data Timbangan berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createDataTimbangan timbangan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update Data Timbangan
    updateDataTimbangan = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_timbangan: joi.number().required(),
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                berat_berkala: joi.number().required(),
                suhu_berkala: joi.number().required(),
                tanggal: joi.date().required()
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
            const update = await mysql.query(`UPDATE d_timbangan SET id_ternak = ?, rf_id = ?, berat_berkala = ?, suhu_berkala = ?, tanggal = ? WHERE id_timbangan = ? AND id_users = ?`, [data.id_ternak, data.rf_id, data.berat_berkala, data.suhu_berkala, data.tanggal, data.id_timbangan, data.id_users]);

            return {
                status: true,
                message: 'Data Timbangan berhasil diupdate',
            };
        }
        catch (error) {
            console.error('updateDataTimbangan timbangan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete Data Timbangan
    deleteDataTimbangan = async (data) => {
        try {
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_timbangan: joi.number().required()
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
            const del = await mysql.query(`DELETE FROM d_timbangan WHERE id_timbangan = ? AND id_users = ?`, [data.id_timbangan, data.id_users]);

            return {
                status: true,
                message: 'Data Timbangan berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteDataTimbangan timbangan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _timbangan();