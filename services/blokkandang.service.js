// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _blokKandang{
    // Get Blok Kandang
    getBlokKandang = async (req) => {
        try{
            // Query data
            let query = `SELECT * FROM d_blok_kandang`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_blok_kandang' 
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}` 
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data blok kandang tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('GetKandang Blok Kandang Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new blok kandang
    createBlokKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                blok: joi.string().required(),
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
            const add = await mysql.query('INSERT INTO d_blok_kandang (blok) VALUES (?)', [value.blok]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan data blok kandang`
                }
            }

            return {
                status: true,
                massage: 'Data blok kandang berhasil ditambahkan',
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

    // Update blok kandang
    updateBlokKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_blok: joi.number().required(),
                blok: joi.string().required()
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
            const update = await mysql.query('UPDATE d_blok_kandang SET blok = ? WHERE id_blok = ?', [value.blok, value.id_blok]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah data blok kandang`
                }
            }

            return {
                status: true,
                massage: 'Data blok kandang berhasil diubah',
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

    // Delete blok kandang
    deleteBlokKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
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
            const del = await mysql.query('DELETE FROM d_blok_kandang WHERE id_blok = ?', [value.id_blok]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus data blok kandang`
                }
            }
            
            return {
                status: true,
                massage: 'Data blok kandang berhasil dihapus',
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

module.exports = new _blokKandang();