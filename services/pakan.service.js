// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _pakan{
    // get data pakan
    getPakan = async (req) => {
        try{
            // Query data
            let query = 'SELECT id_pakan, nama_pakan, deskripsi, komposisi, jumlah FROM d_pakan WHERE id_users = ?';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                if(Object.keys(req.query)[i] == 'id_pakan' || Object.keys(req.query)[i] == 'jumlah'){
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
                    error: 'Data pakan tidak ditemukan'
                }
            }
            
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getPakan Pakan Service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Pakan
    createPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_pakan: joi.string().required(),
                deskripsi: joi.string().required(),
                komposisi: joi.string().required(),
                jumlah: joi.number().required(),
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
            const add = await mysql.query('INSERT INTO d_pakan (id_users, nama_pakan, deskripsi, komposisi, jumlah) VALUES (?, ?, ?, ?, ?)', [req.dataAuth.id_users, req.body.nama_pakan, req.body.deskripsi, req.body.komposisi, req.body.jumlah]);

            return {
                status: true,
                message: 'Pakan berhasil ditambahkan',
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

    // Update Pakan
    updatePakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_pakan: joi.string().required(),
                deskripsi: joi.string().required(),
                komposisi: joi.string().required(),
                jumlah: joi.number().required()
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
            const update = await mysql.query('UPDATE d_pakan SET nama_pakan = ?, deskripsi = ?, komposisi = ?, jumlah = ? WHERE id_pakan = ? AND id_users = ?', [req.body.nama_pakan, req.body.deskripsi, req.body.komposisi, req.body.jumlah, req.body.id_pakan, req.dataAuth.id_users]);

            return {
                status: true,
                message: 'Pakan berhasil diupdate',
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

    // Delete Pakan
    deletePakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
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
            const del = await mysql.query('DELETE FROM d_pakan WHERE id_pakan = ? AND id_users = ?', [req.body.id_pakan, req.dataAuth.id_users]);

            return {
                status: true,
                message: 'Pakan berhasil dihapus',
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