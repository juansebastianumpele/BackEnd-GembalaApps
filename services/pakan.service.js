// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _pakan{
    // get data pakan
    getPakan = async (req) => {
        try{
            // Query data
            let query = 'SELECT * FROM d_pakan';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
               query += (i == 0) ? ` WHERE ` : ` AND `;
               query += Object.keys(req.query)[i] == 'id_pakan'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data pakan tidak ditemukan'
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
            const add = await mysql.query('INSERT INTO d_pakan (nama_pakan, deskripsi, komposisi, jumlah) VALUES (?, ?, ?, ?)', 
            [
                value.nama_pakan, 
                value.deskripsi, 
                value.komposisi, 
                value.jumlah
            ]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan data pakan`
                }
            }

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
                id_pakan: joi.number().required(),
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
            const update = await mysql.query('UPDATE d_pakan SET nama_pakan = ?, deskripsi = ?, komposisi = ?, jumlah = ? WHERE id_pakan = ?', 
            [
                value.nama_pakan, 
                value.deskripsi, 
                value.komposisi, 
                value.jumlah, 
                value.id_pakan, 
            ]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah data pakan`
                }
            }

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
            const del = await mysql.query('DELETE FROM d_pakan WHERE id_pakan = ?', 
            [
                value.id_pakan
            ]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus data pakan`
                }
            }

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