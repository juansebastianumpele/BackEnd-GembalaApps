// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _varietas{
    // List variietas
    listVarietas = async (data) => {
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

            const list = await mysql.query('SELECT id_varietas, nama_varietas FROM d_varietas WHERE id_users = ?', [data.id_users]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('listVarietas Varietas service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Varietas
    createVarietas = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_varietas: joi.string().required()
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

            const add = await mysql.query('INSERT INTO d_varietas (id_users, nama_varietas) VALUES (?, ?)', [data.id_users, data.nama_varietas]);

            return {
                status: true,
                data: add,
            };
        }
        catch (error) {
            console.error('createVarietas varietas service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateVarietas = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_varietas: joi.number().required(),
                nama_varietas: joi.string().required()
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

            const update = await mysql.query('UPDATE d_varietas SET nama_varietas = ? WHERE id_varietas = ? AND id_users = ?', [data.nama_varietas, data.id_varietas, data.id_users]);

            return {
                status: true,
                data: update,
            };
        }
        catch (error) {
            console.error('updateVarietas varietas service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }


    deleteVarietas = async (data) => {
        try {
            const body = { data };
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_varietas: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_varietas WHERE id_varietas = ? AND id_users', [data.id_varietas, data.id_users]);

            return {
                status: true,
                data: del,
            };
        }
        catch (error) {
            console.error('deleteVarietas varietas service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _varietas();