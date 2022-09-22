// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _kandang{
    // List Kandang
    listKandang = async (data) => {
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
            
            const list = await mysql.query('SELECT id_kandang, nama_kandang, blok_kandang FROM d_kandang WHERE id_users = ?', [data.id_users]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('ListKandang Kandang Service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // Create new kandang
    createKandang = async (body) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_kandang: joi.string().required(),
                blok_kandang: joi.string().required(),
            });

            const { error, value } = schema.validate(body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                console.log(errorDetails)
                return {
                    status: false,
                    code: 4222,
                    error: errorDetails.join(', '),
                }
            }

            const add = await mysql.query('INSERT INTO d_kandang (id_users, nama_kandang, blok_kandang) VALUES (?, ?, ?)', [body.id_users, body.nama_kandang, body.blok_kandang]);

            return {
                status: true,
                data: add,
            };
        }
        catch (error) {
            console.error('createKandang kandang service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    updateKandang = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kandang: joi.number().required(),
                nama_kandang: joi.string().required(),
                blok_kandang: joi.string().required()
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

            const update = await mysql.query('UPDATE d_kandang SET nama_kandang = ?, blok_kandang = ? WHERE id_kandang = ? AND id_users = ?', [data.nama_kandang, data.blok_kandang, data.id_kandang, data.id_users]);

            return {
                status: true,
                data: update,
            };
        }
        catch (error) {
            console.error('updateKandang kandang service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }


    deleteKandang = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kandang: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_kandang WHERE id_kandang = ? AND id_users = ?', [data.id_kandang, data.id_users]);

            return {
                status: true,
                data: del,
            };
        }
        catch (error) {
            console.error('deleteKandang kandang service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _kandang();