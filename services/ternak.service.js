// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');

class _ternak{
    constructor(db){
        this.db = db;
    }
    // Get Data Ternak
    getTernak = async (req) => {
        try{
            // Query Data
            let query =  `SELECT
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
            ON s_ternak.id_fp=d_fase_pemeliharaan.id_fp
            LEFT JOIN d_kandang
            ON s_ternak.id_kandang=d_kandang.id_kandang
            LEFT JOIN d_penyakit
            ON s_ternak.id_penyakit=d_penyakit.id_penyakit`;
            
            for(let i = 0; i < Object.keys(req.query).length; i++){
                query += (i === 0) ? ` WHERE` : ` AND`;
                query += ` s_ternak.${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }

            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data Ternak not found'
                }
            }

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            console.error('getTernak ternak service Error: ', error);
            return {
                code: 500,
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
                id_fp: joi.number().allow(null),
                id_kandang: joi.number().allow(null)
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Query Data
            const add = await this.db.query(
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
                    id_fp) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
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
                    value.id_fp
                ]
            );
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to create new Ternak`
                }
            }

            return {
                code: 200,
                data: {
                    id: add.insertId,
                    rf_id: value.rf_id,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createTernak ternak service Error: ', error);
            return {
                code: 500,
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
                id_fp: joi.number().allow(null),
                id_kandang: joi.number().allow(null),
                tanggal_keluar: joi.date().allow(null),
                status_keluar: joi.number().allow(null)
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const update = await this.db.query(
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
                id_fp = ?,
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
                    value.id_fp,
                    value.tanggal_keluar,
                    value.status_keluar,
                    value.id_ternak
                ]
            );
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to update Ternak`
                }
            }

            return {
                code: 200,
                data: {
                    id: value.id_ternak,
                    rf_id: value.rf_id,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateTernak ternak service Error: ', error);
            return {
                code: 500,
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
                    code: 400,
                    error: errorDetails
                }
            }

            // Query Data
            const del = await this.db.query('DELETE FROM s_ternak WHERE id_ternak = ?', 
            [
                value.id_ternak
            ]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete Ternak`
                }
            }

            return {
                code: 200,
                data: {
                    id: value.id_ternak,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteTernak ternak service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const ternakService = (db) => new _ternak(db);
module.exports = ternakService;