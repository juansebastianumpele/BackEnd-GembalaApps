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
            ON s_ternak.id_kandang=d_kandang.id_kandang`;
            
            for(let i = 0; i < Object.keys(req.query).length; i++){
                query += (i === 0) ? ` WHERE` : ` AND`;
                query += ` ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
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

    // Get My Ternak
    getMyTernak = async (req) => {
        try{            
            // Query Data
            let query = `SELECT
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
            WHERE s_ternak.id_users=?`;

            for(let i = 0; i < Object.keys(req.query).length; i++){
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }

            const list = await mysql.query(query, [req.dataAuth.id_users]);
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
            console.error('getMyTernak ternak service Error: ', error);
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
                jenis_kelamin: joi.string().required(),
                id_varietas: joi.number().required(),
                berat: joi.number().required(),
                suhu: joi.number().required(),
                tanggal_lahir: joi.date().required(),
                tanggal_masuk: joi.date().required(),
                id_induk: joi.number().required(),
                id_pejantan: joi.number().required(),
                status_sehat: joi.string().required(),
                id_pakan: joi.number().required(),
                id_kandang: joi.number().required(),
                fase_pemeliharaan: joi.number().required(),
                tanggal_keluar: joi.date(),
                status_keluar: joi.string()
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
                `INSERT INTO s_ternak(rf_id, id_users, jenis_kelamin, id_varietas, berat_berkala,
                    suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat,
                     id_pakan, id_kandang, fase_pemeliharaan, tanggal_keluar, status_keluar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    req.body.rf_id, req.dataAuth.id_users, req.body.jenis_kelamin, req.body.id_varietas, req.body.berat, req.body.suhu,
                    req.body.tanggal_lahir, req.body.tanggal_masuk, req.body.id_induk, req.body.id_pejantan, req.body.status_sehat,
                    req.body.id_pakan, req.body.id_kandang, req.body.fase_pemeliharaan, req.body.tanggal_keluar, req.body.status_keluar
                ]
            );

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
                jenis_kelamin: joi.string().required(),
                id_varietas: joi.number().required(),
                berat: joi.number().required(),
                suhu: joi.number().required(),
                tanggal_lahir: joi.date().required(),
                tanggal_masuk: joi.date().required(),
                id_induk: joi.number().required(),
                id_pejantan: joi.number().required(),
                status_sehat: joi.string().required(),
                id_pakan: joi.number().required(),
                id_kandang: joi.number().required(),
                fase_pemeliharaan: joi.number().required(),
                tanggal_keluar: joi.date(),
                status_keluar: joi.string()
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
                `UPDATE s_ternak SET rf_id = ?, jenis_kelamin = ?,
                id_varietas = ?, berat_berkala = ?, suhu_berkala = ?, tanggal_lahir = ?, tanggal_masuk = ?, 
                id_induk = ?, id_pejantan = ?, status_sehat = ?, id_pakan = ?, id_kandang = ?, fase_pemeliharaan = ?,
                tanggal_keluar = ?, status_keluar = ?  WHERE id_ternak = ? AND id_users = ?`,
                [
                    req.body.rf_id, req.body.jenis_kelamin, req.body.id_varietas, req.body.berat, req.body.suhu,
                    req.body.tanggal_lahir, req.body.tanggal_masuk, req.body.id_induk, req.body.id_pejantan, req.body.status_sehat,
                    req.body.id_pakan, req.body.id_kandang, req.body.fase_pemeliharaan, req.body.tanggal_keluar, req.body.status_keluar, req.body.id_ternak, req.dataAuth.id_users
                ]
            );

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
            const del = await mysql.query('DELETE FROM s_ternak WHERE id_ternak = ? AND id_users', [req.body.id_ternak, req.dataAuth.id_users]);

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