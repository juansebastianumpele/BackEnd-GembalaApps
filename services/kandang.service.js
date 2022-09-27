// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _kandang{
    // Get Kandang
    getKandang = async (req) => {
        try{
            // Query data
            let query = `
            SELECT 
            d_kandang.id_kandang, 
            d_kandang.nama_kandang, 
            d_blok_kandang.blok
            FROM d_kandang 
            LEFT JOIN d_blok_kandang 
            ON d_kandang.id_blok = d_blok_kandang.id_blok
            WHERE d_kandang.id_users = ?`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                if(Object.keys(req.query)[i] == 'nama_kandang'){
                    query += ` AND ${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`
                }else{
                    query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
                }
            }
            const list = await mysql.query(query, [req.dataAuth.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data kandang tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('GetKandang Kandang Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new kandang
    createKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_kandang: joi.string().required(),
                id_blok: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const add = await mysql.query('INSERT INTO d_kandang (id_users, nama_kandang, id_blok) VALUES (?, ?, ?)', [req.dataAuth.id_users, req.body.nama_kandang, req.body.id_blok]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan data kandang`
                }
            }

            return {
                status: true,
                massage: 'Data kandang berhasil ditambahkan',
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

    // Update kandang
    updateKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
                nama_kandang: joi.string().required(),
                id_blok: joi.number().required()
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const update = await mysql.query('UPDATE d_kandang SET nama_kandang = ?, id_blok = ? WHERE id_kandang = ? AND id_users = ?', [req.body.nama_kandang, req.body.id_blok, req.body.id_kandang, req.dataAuth.id_users]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah data kandang`
                }
            }

            return {
                status: true,
                massage: 'Data kandang berhasil diubah',
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

    // Delete kandang
    deleteKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const del = await mysql.query('DELETE FROM d_kandang WHERE id_kandang = ? AND id_users = ?', [req.body.id_kandang, req.dataAuth.id_users]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus data kandang`
                }
            }
            
            return {
                status: true,
                massage: 'Data kandang berhasil dihapus',
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