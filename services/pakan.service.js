// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _pakan{
    // List pakan
    listPakan = async (data) => {
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
        
            const list = await mysql.query('SELECT id_pakan, nama_pakan, deskripsi, komposisi, jumlah FROM d_pakan WHERE id_users = ?', [data.id_users]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('ListPakan Pakan Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Pakan
    createPakan = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_pakan: joi.string().required(),
                deskripsi: joi.string().required(),
                komposisi: joi.string().required(),
                jumlah: joi.number().required(),
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

            const add = await mysql.query('INSERT INTO d_pakan (id_users, nama_pakan, deskripsi, komposisi, jumlah) VALUES (?, ?, ?, ?, ?)', [data.id_users, data.nama_pakan, data.deskripsi, data.komposisi, data.jumlah]);

            return {
                status: true,
                data: add,
            };
        }
        catch (error) {
            console.error('createPakan pakan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updatePakan = async (data) => {
        try {
            const schema = joi.object({
                id_pakan: joi.number().required(),
                role: joi.string().required(),
                nama_pakan: joi.string().required(),
                deskripsi: joi.string().required(),
                komposisi: joi.string().required(),
                jumlah: joi.number().required()
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

            const update = await mysql.query('UPDATE d_pakan SET nama_pakan = ?, deskripsi = ?, komposisi = ?, jumlah = ? WHERE id_pakan = ? AND id_users = ?', [data.nama_pakan, data.deskripsi, data.komposisi, data.jumlah, data.id_pakan, data.id_users]);

            return {
                status: true,
                data: update,
            };
        }
        catch (error) {
            console.error('updatePakan pakan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }


    deletePakan = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_pakan: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_pakan WHERE id_pakan = ? AND id_users = ?', [data.id_pakan, data.id_users]);

            return {
                status: true,
                data: del,
            };
        }
        catch (error) {
            console.error('deletePakan pakan service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _pakan();