// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _fase{
    // List Kandang
    listFase = async (data) => {
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
            
            const list = await mysql.query('SELECT id_fp, fase FROM d_fase_pemeliharaan WHERE id_users = ?', [data.id_users]);
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listFase fase Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new fase
    createFase = async (body) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                fase: joi.string().required()
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

            const add = await mysql.query('INSERT INTO d_fase_pemeliharaan (id_users, fase) VALUES (?, ?)', [body.id_users, body.fase]);

            return {
                status: true,
                message: 'Fase berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createFase fase service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    updateFase = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_fp: joi.number().required(),
                fase: joi.number().required(),
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

            const update = await mysql.query('UPDATE d_fase_pemeliharaan SET fase = ? WHERE id_fp = ? AND id_users = ?', [data.fase, data.id_fp, data.id_users]);

            return {
                status: true,
                message: 'Fase berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateFase fase service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }


    deleteFase = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_fp: joi.number().required(),
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

            const del = await mysql.query('DELETE FROM d_fase_pemeliharaan WHERE id_fase = ? AND id_users = ?', [data.id_fp, data.id_users]);

            return {
                status: true,
                message: 'Fase berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteFase fase service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _fase();