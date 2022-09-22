// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _ternak{
    // List all Ternak
    listTernak = async (data) => {
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
            const list = await mysql.query(
                `SELECT
                s_ternak.id_users,
                s_ternak.id_ternak,
                s_ternak.rf_id,
                s_ternak.jenis_kelamin,
                d_varietas.nama_varietas , 
                s_ternak.berat_berkala, 
                s_ternak.suhu_berkala, 
                s_ternak.tanggal_lahir, 
                timestampdiff(month, s_ternak.tanggal_lahir, curdate()) AS umur , 
                s_ternak.tanggal_masuk, s_ternak.id_induk, s_ternak.id_pejantan, 
                s_ternak.status_sehat, 
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
                ON s_ternak.fase_pemeliharaan=d_fase_pemeliharaan.id_fase_pemeliharaan`);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('listTernak ternak service Error: ', error);

            return {
                status: false,
                error
            }
        }
    }

    // List Ternak by id
    listTernakByIdUser = async (data) => {
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
            const list = await mysql.query(
                `SELECT
                s_ternak.id_users,
                s_ternak.id_ternak,
                s_ternak.rf_id,
                s_ternak.jenis_kelamin,
                d_varietas.nama_varietas , 
                s_ternak.berat_berkala, 
                s_ternak.suhu_berkala, 
                s_ternak.tanggal_lahir, 
                timestampdiff(month, s_ternak.tanggal_lahir, curdate()) AS umur , 
                s_ternak.tanggal_masuk, s_ternak.id_induk, s_ternak.id_pejantan, 
                s_ternak.status_sehat, 
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
                ON s_ternak.fase_pemeliharaan=d_fase_pemeliharaan.id_fase_pemeliharaan
                WHERE s_ternak.id_users=?`, [data.id_users]);
            return {
                status: true,
                data: list,
            };
        }catch (error){
            console.error('listTernakByIdUser ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Ternak
    createTernak = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
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
                fase_pemeliharaan: joi.number().required(),
                tanggal_keluar: joi.date().required(),
                status_keluar: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const add = await mysql.query(
                `INSERT INTO s_ternak(rf_id, id_users, jenis_kelamin, id_varietas, berat_berkala,
                    suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat,
                     id_pakan, fase_pemeliharaan, tanggal_keluar, status_keluar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    data.rf_id, data.id_users, data.jenis_kelamin, data.id_varietas, data.berat, data.suhu,
                    data.tanggal_lahir, data.tanggal_masuk, data.id_induk, data.id_pejantan, data.status_sehat,
                    data.id_pakan, data.fase_pemeliharaan, data.tanggal_keluar, data.status_keluar
                ]
            );

            return {
                status: true,
                data: add,
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

    updateTernak = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
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
                fase_pemeliharaan: joi.number().required(),
                tanggal_keluar: joi.date().required(),
                status_keluar: joi.string().required()
            });

            const { error, value } = schema.validate(data);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const update = await mysql.query(
                `UPDATE s_ternak SET rf_id = ?, jenis_kelamin = ?,
                id_varietas = ?, berat_berkala = ?, suhu_berkala = ?, tanggal_lahir = ?, tanggal_masuk = ?, 
                id_induk = ?, id_pejantan = ?, status_sehat = ?, id_pakan = ?, fase_pemeliharaan = ?,
                tanggal_keluar = ?, status_keluar = ?  WHERE id_ternak = ? AND id_users = ?`,
                [
                    data.rf_id, data.jenis_kelamin, data.id_varietas, data.berat, data.suhu,
                    data.tanggal_lahir, data.tanggal_masuk, data.id_induk, data.id_pejantan, data.status_sehat,
                    data.id_pakan, data.fase_pemeliharaan, data.tanggal_keluar, data.status_keluar, data.id_ternak, data.id_users
                ]
            );

            return {
                status: true,
                data: update,
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


    deleteVarietas = async (data) => {
        try {
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_ternak: joi.number().required(),
            });

            const { error, value } = schema.validate(body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message);
                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', '),
                }
            }

            const del = await mysql.query('DELETE FROM s_ternak WHERE id_ternak = ? AND id_users', [data.id_ternak, data.id_users]);

            return {
                status: true,
                data: del,
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