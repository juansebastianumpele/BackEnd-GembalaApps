// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _kawin{

    // List Ternak by id
    listKawinByIdUsers = async (data) => {
        try{
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
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
            const list = await mysql.query(
                `SELECT id_kawin, id_ternak, tanggal_kawin, id_pemancek WHERE id_users = ?`, [data.id_users]);
            return {
                status: true,
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

            const add = await mysql.query('INSERT INTO d_kawin (id_users, id_ternak, tanggal_kawin, id_pemancek) VALUES (?, ?, ?, ?)', [data.id_users, data.id_ternak, data.tanggal_kawin, data.id_pemancek]);

            return {
                status: true,
                data: add,
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

    updateDataKawin = async (data) => {
        try {
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

            const update = await mysql.query(
                `UPDATE d_kawin SET id_ternak = ?, tanggal_kawin = ?, id_pemancek = ? WHERE id_kawin = ? AND id_users = ?`,
                [data.id_ternak, data.tanggal_kawin, data.id_pemancek, data.id_kawin, data.id_users]);

            return {
                status: true,
                data: update,
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


    deleteDataKawin = async (data) => {
        try {
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

            const del = await mysql.query(`DELETE FROM d_kawin WHERE id_kawin = ? AND id_users = ?`, [data.id_kawin, data.id_users]);

            return {
                status: true,
                data: del,
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