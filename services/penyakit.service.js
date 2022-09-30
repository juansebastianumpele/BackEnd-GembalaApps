// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _penyakit{
    // Get Data Penyakit
    getPenyakit = async (req) => {
        try{
            // Query data
            let query = 'SELECT * FROM d_penyakit';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_penyakit'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data penyakit tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getPenyakit penyakit service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Penyakit
    createPenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri_penyakit: joi.string().required(),
                pengobatan: joi.string().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const add = await mysql.query('INSERT INTO d_penyakit (nama_penyakit, deskripsi, ciri_penyakit, pengobatan) VALUES (?, ?, ?, ?)', 
            [
                value.nama_penyakit, 
                value.deskripsi, 
                value.ciri_penyakit, 
                value.pengobatan
            ]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan data penyakit`
                }
            }
            return {
                status: true,
                message: 'Data penyakit berhasil ditambahkan',
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

    // Update Penyakit
    updatePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri_penyakit: joi.string().required(),
                pengobatan: joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const update = await mysql.query('UPDATE d_penyakit SET nama_penyakit = ?, deskripsi = ?, ciri_penyakit = ?, pengobatan = ? WHERE id_penyakit = ?', 
            [
                value.nama_penyakit, 
                value.deskripsi, 
                value.ciri_penyakit, 
                value.pengobatan, 
                value.id_penyakit, 
            ]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah data penyakit`
                }
            }

            return {
                status: true,
                message: 'Data penyakit berhasil diupdate',
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

    // Delete Penyakit
    deletePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const del = await mysql.query('DELETE FROM d_penyakit WHERE id_penyakit = ?', 
            [
                value.id_penyakit
            ]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus data penyakit`
                }
            }
            
            return {
                status: true,
                message: 'Data penyakit berhasil dihapus',
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