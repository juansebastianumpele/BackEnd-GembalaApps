// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _timbangan{

    // get Data Timbangan
    getDataTimbangan = async (req) => {
        try{
            // Query data
            let query = `SELECT id_timbangan, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal FROM d_timbangan WHERE id_users = ?`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
            }
            const list = await mysql.query(query, [req.dataAuth.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: `Data timbangan tidak ditemukan`
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
    createDataTimbangan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                berat_berkala: joi.number().required(),
                suhu_berkala: joi.number().required(),
                tanggal: joi.date().required()
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
            const add = await mysql.query(`INSERT INTO d_timbangan (id_users, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal) VALUES (?, ?, ?, ?, ?, ?)`, [req.dataAuth.id_users, req.body.id_ternak, req.body.rf_id, req.body.berat_berkala, req.body.suhu_berkala, req.body.tanggal]);

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
    updateDataTimbangan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_timbangan: joi.number().required(),
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                berat_berkala: joi.number().required(),
                suhu_berkala: joi.number().required(),
                tanggal: joi.date().required()
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
            const update = await mysql.query(`UPDATE d_timbangan SET id_ternak = ?, rf_id = ?, berat_berkala = ?, suhu_berkala = ?, tanggal = ? WHERE id_timbangan = ? AND id_users = ?`, [req.bosy.id_ternak, req.bosy.rf_id, req.bosy.berat_berkala, req.bosy.suhu_berkala, req.bosy.tanggal, req.bosy.id_timbangan, req.dataAuth.id_users]);

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
    deleteDataTimbangan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_timbangan: joi.number().required()
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
            const del = await mysql.query(`DELETE FROM d_timbangan WHERE id_timbangan = ? AND id_users = ?`, [req.body.id_timbangan, req.dataAuth.id_users]);

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