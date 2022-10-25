// Helper databse yang dibuat
const joi = require('joi');
const {log_error} = require('../utils/logging');

class _lkPemasukan{
    constructor(db){
        this.db = db;
    }
    // Get Data Ternak Masuk
    getTernakMasuk = async (req) => {
        try{
            // Add id_user to query
            req.query.id_user = req.dataAuth.id_peternakan;
            req.query.id_fp = null;
            // Query Data
            const list = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'rf_id', 'image', 'jenis_kelamin', 'id_bangsa', 'id_kandang', 'id_fp', 'id_dam', 'id_sire', 'berat', 'suhu', 'tanggal_lahir', 'tanggal_masuk', 'tanggal_keluar', 'status_keluar', 'createdAt', 'updatedAt'],
                where: req.query,
                order: [
                    ['createdAt', 'DESC']
                ]
            }); 
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data ternak masuk not found'
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
            log_error('getTernakMasuk Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create LK Pemasukan
    createLKPemasukan = async (req) => {
        try{
            const schema = joi.object({
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                id_bangsa: joi.number().required(),
                jenis_kelamin: joi.string().required(),
                cek_poel: joi.number().required(),
                cek_mulut: joi.string().required(),
                cek_telinga: joi.string().required(),
                cek_kuku_kaki: joi.string().required(),
                cek_kondisi_fisik_lain: joi.string().required(),
                cek_bcs: joi.number().required(),
                id_kandang: joi.number().required(),
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map((i) => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // get data fase
            const fase = await this.db.Fase.findOne({
                where: {
                    fase: 'adaptasi'
                }
            });
            if(!fase){
                return{
                    code: 404,
                    error: 'Fase not found'
                }
            }

            // Update Data ternak
            const update = await this.db.Ternak.update({
                id_bangsa: value.id_bangsa,
                jenis_kelamin: value.jenis_kelamin,
                id_kandang: value.id_kandang,
                id_fp: fase.id_fp,
            },{
                where: {
                    id_ternak: value.id_ternak,
                    id_user: req.dataAuth.id_peternakan,
                }
            });
            if(update[0] <= 0){
                return{
                    code: 404,
                    error: 'Data ternak not found'
                }
            }

            // Create LK Pemasukan
            const lkPemasukan = await this.db.LKPemasukan.create({
                id_ternak: value.id_ternak,
                rf_id: value.rf_id,
                id_bangsa: value.id_bangsa,
                jenis_kelamin: value.jenis_kelamin,
                cek_poel: value.cek_poel,
                cek_mulut: value.cek_mulut,
                cek_telinga: value.cek_telinga,
                cek_kuku_kaki: value.cek_kuku_kaki,
                cek_kondisi_fisik_lain: value.cek_kondisi_fisik_lain,
                cek_bcs: value.cek_bcs,
                id_kandang: value.id_kandang,
                id_user: req.dataAuth.id_peternakan,
            });
            if(!lkPemasukan){
                return{
                    code: 500,
                    error: 'Internal Server Error'
                }
            }

            return {
                code: 200,
                data: {
                    id_lk_pemasukan: lkPemasukan.id_lk_pemasukan,
                    id_ternak: lkPemasukan.id_ternak,
                    rf_id: lkPemasukan.rf_id,
                    createdAt: lkPemasukan.createdAt,
                }
            };
        }catch (error){
            log_error('createLKPemasukan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get LK Pemasukan
    getLKPemasukan = async (req) => {
        try{
            // Add id_user to params
            req.query.id_user = req.dataAuth.id_peternakan;
            // Query Data
            const lkPemasukan = await this.db.LKPemasukan.findAll({
                where: req.query,
                order: [
                    ['createdAt', 'DESC']
                ]
            });
            if(lkPemasukan.length <= 0){
                return{
                    code: 404,
                    error: 'Data lk pemasukan not found'
                }
            }

            return {
                code: 200,
                data: {
                    total: lkPemasukan.length,
                    list: lkPemasukan
                }
            };
        }catch (error){
            log_error('getLKPemasukan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _lkPemasukan(db);