// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _timbangan{

    // get Data Timbangan
    getDataTimbangan = async (req) => {
        try{
            // Query data
            let query = `SELECT * FROM d_timbangan`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`;
            }
            const list = await mysql.query(query);
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
                rf_id: joi.string().required(),
                berat_berkala: joi.number().required(),
                suhu_berkala: joi.number().required()
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

            // Query data ternak
            const ternak = await mysql.query('SELECT id_ternak FROM d_ternak WHERE rf_id = ?', [value.rf_id]);
            if(ternak.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: `Data ternak belum terdaftar`
                }
            }

            // Query data
            const add = await mysql.query(`
                INSERT INTO d_timbangan (
                    id_ternak,
                    rf_id,
                    berat_berkala,
                    suhu_berkala,
                    tanggal) 
                    VALUES (?, ?, ?, ?, ?)`, 
                    [
                        ternak[0].id_ternak, 
                        value.rf_id, 
                        value.berat_berkala, 
                        value.suhu_berkala, 
                        new Date()
                    ]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Data timbangan gagal ditambahkan`
                }
            }

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
            const update = await mysql.query(`
            UPDATE d_timbangan SET 
            berat_berkala = ?,
            suhu_berkala = ?,
            tanggal = ? 
            WHERE id_timbangan = ?`, 
            [
                value.berat_berkala, 
                value.suhu_berkala, 
                value.tanggal, 
                value.id_timbangan, 
            ]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Data timbangan gagal diubah`
                }
            }

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
            const del = await mysql.query(`DELETE FROM d_timbangan WHERE id_timbangan = ?`, 
            [
                value.id_timbangan
            ]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Data timbangan gagal dihapus`
                }
            }
            
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