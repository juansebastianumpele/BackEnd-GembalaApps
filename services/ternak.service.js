// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _ternak{
    // Get Data Ternak
    getTernak = async (req) => {
        try{
            // Query Data
            let query =  `SELECT
            s_ternak.id_users,
            s_ternak.id_ternak,
            s_ternak.rf_id,
            s_ternak.jenis_kelamin,
            s_ternak.foto,
            d_varietas.nama_varietas , 
            s_ternak.berat_berkala, 
            s_ternak.suhu_berkala, 
            s_ternak.tanggal_lahir,
            s_ternak.tanggal_masuk, 
            s_ternak.id_induk, 
            s_ternak.id_pejantan, 
            s_ternak.status_sehat,
            d_penyakit.nama_penyakit, 
            d_kandang.nama_kandang,
            d_fase_pemeliharaan.fase,
            d_pakan.nama_pakan,
            s_ternak.tanggal_keluar, 
            s_ternak.status_keluar 
            FROM s_ternak
            LEFT JOIN d_varietas
            ON s_ternak.id_varietas=d_varietas.id_varietas
            LEFT JOIN d_pakan
            ON s_ternak.id_pakan=d_pakan.id_pakan
            LEFT JOIN d_fase_pemeliharaan
            ON s_ternak.fase_pemeliharaan=d_fase_pemeliharaan.id_fp
            LEFT JOIN d_kandang
            ON s_ternak.id_kandang=d_kandang.id_kandang
            LEFT JOIN d_penyakit
            ON s_ternak.id_penyakit=d_penyakit.id_penyakit`;
            
            for(let i = 0; i < Object.keys(req.query).length; i++){
                query += (i === 0) ? ` WHERE` : ` AND`;
                query += ` s_ternak.${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }

            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data ternak tidak ditemukan'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Ternak
    createTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                rf_id: joi.string().required(),
                foto: joi.string().allow(null),
                jenis_kelamin: joi.string().allow(null),
                id_varietas: joi.number().allow(null),
                berat_berkala: joi.number().allow(null),
                suhu_berkala: joi.number().allow(null),
                tanggal_lahir: joi.date().allow(null),
                tanggal_masuk: joi.date().allow(null),
                id_induk: joi.number().allow(null),
                id_pejantan: joi.number().allow(null),
                status_sehat: joi.string().allow(null),
                id_penyakit: joi.number().allow(null),
                id_pakan: joi.number().allow(null),
                fase_pemeliharaan: joi.number().allow(null),
                id_kandang: joi.number().allow(null)
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

            // Query Data
            const add = await mysql.query(
                `INSERT INTO s_ternak(
                    rf_id,
                    foto,
                    jenis_kelamin,
                    id_varietas,
                    berat_berkala,
                    suhu_berkala,
                    tanggal_lahir,
                    tanggal_masuk,
                    id_induk,
                    id_pejantan,
                    status_sehat,
                    id_penyakit,
                    id_pakan,
                    id_kandang,
                    fase_pemeliharaan) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    value.rf_id,
                    value.foto,
                    value.jenis_kelamin,
                    value.id_varietas,
                    value.berat_berkala,
                    value.suhu_berkala,
                    value.tanggal_lahir,
                    value.tanggal_masuk,
                    value.id_induk,
                    value.id_pejantan,
                    value.status_sehat,
                    value.id_penyakit,
                    value.id_pakan,
                    value.id_kandang,
                    value.fase_pemeliharaan
                ]
            );
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan data ternak`
                }
            }

            return {
                status: true,
                message: 'Data ternak berhasil ditambahkan',
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

    // Update Ternak
    updateTernak = async (req) => {
        try {
            const schema = joi.object({
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                foto: joi.string().allow(null),
                jenis_kelamin: joi.string().allow(null),
                id_varietas: joi.number().allow(null),
                berat_berkala: joi.number().allow(null),
                suhu_berkala: joi.number().allow(null),
                tanggal_lahir: joi.date().allow(null),
                tanggal_masuk: joi.date().allow(null),
                id_induk: joi.number().allow(null),
                id_pejantan: joi.number().allow(null),
                status_sehat: joi.string().allow(null),
                id_penyakit: joi.number().allow(null),
                id_pakan: joi.number().allow(null),
                fase_pemeliharaan: joi.number().allow(null),
                id_kandang: joi.number().allow(null),
                tanggal_keluar: joi.date().allow(null),
                status_keluar: joi.number().allow(null)
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

            const update = await mysql.query(
                `UPDATE s_ternak SET rf_id = ?,
                foto = ?,
                jenis_kelamin = ?,
                id_varietas = ?,
                berat_berkala = ?,
                suhu_berkala = ?,
                tanggal_lahir = ?,
                tanggal_masuk = ?,
                id_induk = ?,
                id_pejantan = ?,
                status_sehat = ?,
                id_penyakit = ?,
                id_pakan = ?,
                id_kandang = ?,
                fase_pemeliharaan = ?,
                tanggal_keluar = ?,
                status_keluar = ?  
                WHERE id_ternak = ?`,
                [
                    value.rf_id,
                    value.foto,
                    value.jenis_kelamin,
                    value.id_varietas,
                    value.berat_berkala,
                    value.suhu_berkala,
                    value.tanggal_lahir,
                    value.tanggal_masuk,
                    value.id_induk,
                    value.id_pejantan,
                    value.status_sehat,
                    value.id_penyakit,
                    value.id_pakan,
                    value.id_kandang,
                    value.fase_pemeliharaan,
                    value.tanggal_keluar,
                    value.status_keluar,
                    value.id_ternak
                ]
            );
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah data ternak`
                }
            }

            return {
                status: true,
                message: 'Data ternak berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete Ternak
    deleteTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_ternak: joi.number().required(),
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

            // Query Data
            const del = await mysql.query('DELETE FROM s_ternak WHERE id_ternak = ?', 
            [
                value.id_ternak
            ]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus data ternak`
                }
            }

            return {
                status: true,
                message: 'Data ternak berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _ternak();