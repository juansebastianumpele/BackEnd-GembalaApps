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
            const {error, value} = schema.validate(data);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }
            
            const list = await mysql.query('SELECT id_kandang, nama_kandang, blok_kandang FROM d_kandang WHERE id_users = ?', [data.id_users]);
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('ListKandang Kandang Service Error: ', error);
            return {
                status: false,
                massage: "Data tidak ditemukan",
                error
            }
        }
    }

    // Create new kandang
    createKandang = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                nama_kandang: joi.string().required(),
                blok_kandang: joi.string().required(),
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

            const add = await mysql.query('INSERT INTO d_kandang (id_users, nama_kandang, blok_kandang) VALUES (?, ?, ?)', [data.id_users, data.nama_kandang, data.blok_kandang]);

            return {
                status: true,
                massage: 'Data kandang berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createKandang kandang service Error: ', error);
            return {
                status: false,
                massage: 'Data kandang gagal ditambahkan',
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

            const {error, value} = schema.validate(data);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            const update = await mysql.query('UPDATE d_kandang SET nama_kandang = ?, blok_kandang = ? WHERE id_kandang = ? AND id_users = ?', [data.nama_kandang, data.blok_kandang, data.id_kandang, data.id_users]);

            return {
                status: true,
                massage: 'Data kandang berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateKandang kandang service Error: ', error);
            return {
                status: false,
                massage: 'Data kandang gagal diubah',
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

            const {error, value} = schema.validate(data);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            const del = await mysql.query('DELETE FROM d_kandang WHERE id_kandang = ? AND id_users = ?', [data.id_kandang, data.id_users]);

            return {
                status: true,
                massage: 'Data kandang berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteKandang kandang service Error: ', error);
            return {
                status: false,
                massage: 'Data kandang gagal dihapus',
                error
            }
        }
    }
}

module.exports = new _kandang();