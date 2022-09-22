// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _timbangan{

    // List Ternak by id
    getMonitoringById = async (data) => {
        try{
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_ternak: joi.number().required(),
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
            const list = await mysql.query(`SELECT id_timbangan, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal FROM d_timbangan WHERE id_users = ? AND id_ternak = ?`, [data.id_users, data.id_ternak]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('getMonitoringById timbangan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Data Timbangan
    createDataTimbangan = async (data) => {
        try {
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

            const add = await mysql.query(`INSERT INTO d_timbangan (id_users, id_ternak, rf_id, berat_berkala, suhu_berkala, tanggal) VALUES (?, ?, ?, ?, ?, ?)`, [data.id_users, data.id_ternak, data.rf_id, data.berat_berkala, data.suhu_berkala, data.tanggal]);

            return {
                status: true,
                data: add,
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

    updateDataTimbangan = async (data) => {
        try {
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

            const update = await mysql.query(`UPDATE d_timbangan SET id_ternak = ?, rf_id = ?, berat_berkala = ?, suhu_berkala = ?, tanggal = ? WHERE id_timbangan = ? AND id_users = ?`, [data.id_ternak, data.rf_id, data.berat_berkala, data.suhu_berkala, data.tanggal, data.id_timbangan, data.id_users]);

            return {
                status: true,
                data: update,
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


    deleteDataTimbangan = async (data) => {
        try {
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

            const del = await mysql.query(`DELETE FROM d_timbangan WHERE id_timbangan = ? AND id_users = ?`, [data.id_timbangan, data.id_users]);

            return {
                status: true,
                data: del,
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