// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');

class _timbangan{
    constructor(db){
        this.db = db;
    }
    // get Data Timbangan
    getDataTimbangan = async (req) => {
        try{
            // Query data
            let query = `SELECT * FROM d_timbangan`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`;
            }
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: `Data timbangan not found`
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
            console.error('getTimbangan timbangan service Error: ', error);
            return {
                code: 500,
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
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data ternak
            const ternak = await this.db.query('SELECT id_ternak FROM d_ternak WHERE rf_id = ?', [value.rf_id]);
            if(ternak.length <= 0){
                return{
                    code: 404,
                    error: `Data ternak not found`
                }
            }

            // Query data
            const add = await this.db.query(`
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
                    code: 400,
                    error: `Failed to add data timbangan`
                }
            }

            return {
                code: 200,
                data: {
                    id_timbangan: add.insertId,
                    rf_id: value.rf_id,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createDataTimbangan timbangan service Error: ', error);
            return {
                code: 500,
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
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const update = await this.db.query(`
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
                    code: 400,
                    error: `Failed to update data timbangan`
                }
            }

            return {
                code: 200,
                data: {
                    id_timbangan: value.id_timbangan,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateDataTimbangan timbangan service Error: ', error);
            return {
                code: 500,
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
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const del = await this.db.query(`DELETE FROM d_timbangan WHERE id_timbangan = ?`, 
            [
                value.id_timbangan
            ]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete data timbangan`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_timbangan: value.id_timbangan,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteDataTimbangan timbangan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const timbanganService = (db) => new _timbangan(db);
module.exports = timbanganService;