// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _penyakit{
    // Get Data Penyakit
    getPenyakit = async (req) => {
        try{
            // Query data
            let query = 'SELECT id_penyakit, nama_penyakit, deskripsi, ciri_penyakit, pengobatan FROM d_penyakit WHERE id_users = ?';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                if(Object.keys(req.query)[i] == 'id_penyakit'){
                    query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`
                }else{
                    query += ` AND ${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`
                }   
            }
            const list = await mysql.query(query, [req.dataAuth.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data penyakit tidak ditemukan'
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
            const add = await mysql.query('INSERT INTO d_penyakit (id_users, nama_penyakit, deskripsi, ciri_penyakit, pengobatan) VALUES (?, ?, ?, ?, ?)', [req.dataAuth.id_users, req.body.nama_penyakit, req.body.deskripsi, req.body.ciri_penyakit, req.body.pengobatan]);

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
            const update = await mysql.query('UPDATE d_penyakit SET nama_penyakit = ?, deskripsi = ?, ciri_penyakit = ?, pengobatan = ? WHERE id_penyakit = ? AND id_users = ?', [req.body.nama_penyakit, req.body.deskripsi, req.body.ciri_penyakit, req.body.pengobatan, req.body.id_penyakit, req.dataAuth.id_users]);

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
            const del = await mysql.query('DELETE FROM d_penyakit WHERE id_penyakit = ? AND id_users = ?', [req.body.id_penyakit, req.dataAuth.id_users]);

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