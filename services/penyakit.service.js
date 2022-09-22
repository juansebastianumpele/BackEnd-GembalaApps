// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _penyakit{
    // List Penyakit
    listPenyakit = async (data) => {
        try{
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
            });
            const validate = schema.validate(data);
            if (validate.error) {
                const errorDetails = validate.error.details.map(detail => detail.message);

                return {
                    status: false,
                    code: 422,
                    error: errorDetails
                }
            }
            const list = await mysql.query('SELECT id_penyakit, nama_penyakit, deskripsi, ciri_penyakit, pengobatan FROM d_penyakit WHERE id_users = ?', [data.id_users]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('listPenyakit penyakit service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Create new Penyakit
    createPenyakit = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri_penyakit: joi.string().required(),
                pengobatan: joi.string().required(),
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const add = await mysql.query('INSERT INTO d_penyakit (id_users, nama_penyakit, deskripsi, ciri_penyakit, pengobatan) VALUES (?, ?, ?, ?, ?)', [data.id_users, data.nama_penyakit, data.deskripsi, data.ciri_penyakit, data.pengobatan]);

            return {
                status: true,
                data: add,
            };
        }
        catch (error) {
            console.error('createPenyakit penyakit service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updatePenyakit = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_penyakit: joi.number().required(),
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri_penyakit: joi.string().required(),
                pengobatan: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const update = await mysql.query('UPDATE d_penyakit SET nama_penyakit = ?, deskripsi = ?, ciri_penyakit = ?, pengobatan = ? WHERE id_penyakit = ? AND id_users = ?', [data.nama_penyakit, data.deskripsi, data.ciri_penyakit, data.pengobatan, data.id_penyakit, data.id_users]);

            return {
                status: true,
                data: update,
            };
        }
        catch (error) {
            console.error('updatePenyakit penyakit service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }


    deletePenyakit = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_penyakit: joi.number().required(),
            });

            const { error, value } = schema.validate(body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const del = await mysql.query('DELETE FROM d_penyakit WHERE id_penyakit = ? AND id_users = ?', [data.id_penyakit, data.id_users]);

            return {
                status: true,
                data: del,
            };
        }
        catch (error) {
            console.error('deletePenyakit penyakit service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _penyakit();