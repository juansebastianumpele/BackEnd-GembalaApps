// Helper databse yang dibuat
const joi = require('joi');
const {log_error} = require('../utils/logging');
const dateFormat = require('date-and-time');

class _pemeliharaan{
    constructor(db){
        this.db = db;
    }
    // Get data Pemeliharaan per hari
    getPemeliharaan = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Query data
            const list = await this.db.Pemeliharaan.findAll({
                attributes: ['tanggal_pemeliharaan', 'jenis_pakan', 'jumlah_pakan', 'pembersihan_kandang', 'pembersihan_ternak'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: [
                            'id_kandang',
                            'kode_kandang'
                        ]
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: `Data pemeliharaan not found`
                }
            }

            const date = new Date();
            const result = list.filter((item) => {
                return item.dataValues.tanggal_pemeliharaan.getDate() === date.getDate() &&
                item.dataValues.tanggal_pemeliharaan.getMonth() === date.getMonth() &&
                item.dataValues.tanggal_pemeliharaan.getFullYear() === date.getFullYear()
            }); 

            // Format Date
            for(let i = 0; i < result.length; i++){
                result[i].dataValues.tanggal_pemeliharaan = dateFormat.format(result[i].dataValues.tanggal_pemeliharaan, 'DD/MM/YYYY');
            }

            if(result.length <= 0){
                return{
                    code: 404,
                    error: `Data pemeliharaan not found`
                }
            }

            return {
                code: 200,
                data: {
                    total: result.length,
                    list: result
                }
            };
        }catch (error){
            log_error('getPemeliharaan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get all data Pemeliharaan
    getAllPemeliharaan = async (req) => {   
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Query data
            const list = await this.db.Pemeliharaan.findAll({
                attributes: ['tanggal_pemeliharaan', 'jenis_pakan', 'jumlah_pakan', 'pembersihan_kandang', 'pembersihan_ternak'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: [
                            'id_kandang',
                            'kode_kandang'
                        ]
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: `Data pemeliharaan not found`
                }
            }

            // Format Date
            for(let i = 0; i < list.length; i++){
                list[i].dataValues.tanggal_pemeliharaan = dateFormat.format(list[i].dataValues.tanggal_pemeliharaan, 'DD/MM/YYYY');
            }

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            log_error('getAllPemeliharaan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new pemeliharaan
    createPemeliharaan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
                tanggal_pemeliharaan: joi.date().allow(null),
                jenis_pakan: joi.string().required(),
                jumlah_pakan: joi.number().required(),
                pembersihan_kandang: joi.boolean().required(),
                pembersihan_ternak: joi.boolean().required(),
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            
            // Create data
            const pemeliharaan = await this.db.Pemeliharaan.create(
                {
                    id_kandang: value.id_kandang,
                    tanggal_pemeliharaan: value.tanggal_pemeliharaan ? value.tanggal_pemeliharaan : new Date(),
                    jenis_pakan: value.jenis_pakan,
                    jumlah_pakan: value.jumlah_pakan,
                    pembersihan_kandang: value.pembersihan_kandang,
                    pembersihan_ternak: value.pembersihan_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                },
            );
            return {
                code: 200,
                data: {
                    id_pemeliharaan: pemeliharaan.id_pemeliharaan,
                    id_kandang: pemeliharaan.id_kandang,
                    tanggal_pemeliharaan: pemeliharaan.tanggal_pemeliharaan,
                    createdAt: dateFormat.format(pemeliharaan.createdAt, 'DD/MM/YYYY HH:mm:ss'),
                }
            }
        } catch (error) {
            log_error('createPemeliharaan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _pemeliharaan(db);