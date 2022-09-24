// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _ternak{
    // List all Ternak
    listTernak = async () => {
        try{
            // Query Data
            const list = await mysql.query(
                `SELECT
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
                ON s_ternak.id_kandang=d_kandang.id_kandang`);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data ternak kosong'
                }
            }

            return {
                status: true,
                total: list.length,
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

    // List Ternak My Ternak
    listMyTernak = async (data) => {
        try{
            // Validate Data
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
            
            // Query Data
            const list = await mysql.query(
                `SELECT
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
                WHERE s_ternak.id_users=?`, [data.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data ternak kosong'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listMyTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // List Ternak by id User
    listTernakByIdUser = async (id) => {
        try{
            // Query Data
            const list = await mysql.query(
                `SELECT
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
                WHERE s_ternak.id_users=?`, [id]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: `Data ternak dengan id user = ${id} kosong.`
                }
            }

            return {
                status: true,
                total: list.length,
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

    // Get Ternak by id ternak
    getTernakById = async (id) => {
        try{
            // Query Data
            const list = await mysql.query(
                `SELECT
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
                WHERE s_ternak.id_ternak=?`, [id]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data ternak tidak ditemukan.'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getTernakById ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Get Ternak Sakit
    getTernakSakit = async (data) => {
        try{
            // Validate Data
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
            
            // Query Data
            const list = await mysql.query(
                `SELECT
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
                WHERE s_ternak.id_users=? AND s_ternak.status_sehat = ?`, [data.id_users, "Sakit"]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data ternak sakit kosong'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listTernakSakit ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Get Ternak Sehat
    getTernakSehat = async (data) => {
        try{
            // Validate Data
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
            
            // Query Data
            const list = await mysql.query(
                `SELECT
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
                WHERE s_ternak.id_users=? AND s_ternak.status_sehat = ?`, [data.id_users, "Sehat"]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: 'Data ternak sehat kosong'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('listTernakSehat ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Get Ternak By Kandang
    getTernakByKandang = async (data) => {
        try{
            // Validate data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_kandang: joi.number().required(),
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

            // Query Data
            const list = await mysql.query(
                `SELECT
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
                WHERE s_ternak.id_users=? AND s_ternak.id_kandang = ?`, [data.id_users, data.id_kandang]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    error: `Data ternak dengan ID kandang = ${data.id_kandang} kosong.`
                }
            }
            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getTernakByKandang ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Ternak
    createTernak = async (data) => {
        try {
            // Validate Data
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
                id_kandang: joi.number().required(),
                fase_pemeliharaan: joi.number().required(),
                tanggal_keluar: joi.date(),
                status_keluar: joi.string()
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

            // Query Data
            const add = await mysql.query(
                `INSERT INTO s_ternak(rf_id, id_users, jenis_kelamin, id_varietas, berat_berkala,
                    suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat,
                     id_pakan, id_kandang, fase_pemeliharaan, tanggal_keluar, status_keluar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [
                    data.rf_id, data.id_users, data.jenis_kelamin, data.id_varietas, data.berat, data.suhu,
                    data.tanggal_lahir, data.tanggal_masuk, data.id_induk, data.id_pejantan, data.status_sehat,
                    data.id_pakan, data.id_kandang, data.fase_pemeliharaan, data.tanggal_keluar, data.status_keluar
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
                id_kandang: joi.number().required(),
                fase_pemeliharaan: joi.number().required(),
                tanggal_keluar: joi.date(),
                status_keluar: joi.string()
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

            const update = await mysql.query(
                `UPDATE s_ternak SET rf_id = ?, jenis_kelamin = ?,
                id_varietas = ?, berat_berkala = ?, suhu_berkala = ?, tanggal_lahir = ?, tanggal_masuk = ?, 
                id_induk = ?, id_pejantan = ?, status_sehat = ?, id_pakan = ?, id_kandang = ?, fase_pemeliharaan = ?,
                tanggal_keluar = ?, status_keluar = ?  WHERE id_ternak = ? AND id_users = ?`,
                [
                    data.rf_id, data.jenis_kelamin, data.id_varietas, data.berat, data.suhu,
                    data.tanggal_lahir, data.tanggal_masuk, data.id_induk, data.id_pejantan, data.status_sehat,
                    data.id_pakan, data.id_kandang, data.fase_pemeliharaan, data.tanggal_keluar, data.status_keluar, data.id_ternak, data.id_users
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
    deleteTernak = async (data) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_users: joi.number().required(),
                role: joi.string().required(),
                id_ternak: joi.number().required(),
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

            // Query Data
            const del = await mysql.query('DELETE FROM s_ternak WHERE id_ternak = ? AND id_users', [data.id_ternak, data.id_users]);

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