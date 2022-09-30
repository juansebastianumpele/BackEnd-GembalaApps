// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _kawin{
    // List Ternak by id
    getKawin = async (req) => {
        try{
            // Query data
            let query = `SELECT * FROM d_kawin`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`;
            }
            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data kawin tidak ditemukan'
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listKawinByIdUsers kawin service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Kawin
    createDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                tanggal_kawin: joi.date().required(),
                id_pemancek: joi.number().required()
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
            const add = await mysql.query('INSERT INTO d_kawin (id_ternak, tanggal_kawin, id_pemancek) VALUES (?, ?, ?)', 
            [
                value.id_ternak, 
                value.tanggal_kawin, 
                value.id_pemancek
            ]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: 'Data kawin gagal ditambahkan'
                }
            }

            return {
                status: true,
                message: 'Data kawin berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update ternak
    updateDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kawin: joi.number().required(),
                id_ternak: joi.number().required(),
                tanggal_kawin: joi.date().required(),
                id_pemancek: joi.number().required()
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
            const update = await mysql.query(
                `UPDATE d_kawin SET id_ternak = ?, tanggal_kawin = ?, id_pemancek = ? WHERE id_kawin = ?`,
                [
                    value.id_ternak, 
                    value.tanggal_kawin, 
                    value.id_pemancek, 
                    value.id_kawin
                ]);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: 'Data kawin gagal diubah'
                }
            }

            return {
                status: true,
                message: 'Data kawin berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateKawin kawin service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete Kawin
    deleteDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kawin: joi.number().required(),
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
            const del = await mysql.query(`DELETE FROM d_kawin WHERE id_kawin = ?`, 
            [
                value.id_kawin, 
            ]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: 'Data kawin gagal dihapus'
                }
            }
            
            return {
                status: true,
                message: 'Data kawin berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteKawin kawin service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _kawin();