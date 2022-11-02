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
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            req.query.id_fp = null;
            // Query Data
            const list = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'rf_id', 'image', 'jenis_kelamin', 'berat', 'suhu', 'tanggal_lahir', 'tanggal_masuk', 'tanggal_keluar', 'status_keluar', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        include: [
                            {
                                model: this.db.JenisKandang,
                                as: 'jenis_kandang',
                                attributes: ['id_jenis_kandang', 'jenis_kandang']
                            }
                        ]
                    },
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    },
                    {
                        model: this.db.Ternak,
                        as: 'dam',
                        attributes: ['id_ternak', 'rf_id']
                    },
                    {
                        model: this.db.Ternak,
                        as: 'sire',
                        attributes: ['id_ternak', 'rf_id']
                    }
                ],

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
                id_status_ternak: joi.number().required(),
                status_kesehatan: joi.string().required(),
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

            // Check Ternak in LK Pemasukan
            const ternak = await this.db.LKPemasukan.findOne({
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(ternak){
                return{
                    code: 400,
                    error: 'Ternak already in LK Pemasukan'
                }
            }

            // get data fase
            const fase = await this.db.Fase.findOne({
                where: {
                    fase: 'adaptasi 1'
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
                id_fp: fase.dataValues.id_fp,
                id_status_ternak: value.id_status_ternak,
            },{
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan,
                }
            });
            if(update[0] <= 0){
                return{
                    code: 404,
                    error: 'Data ternak not found'
                }
            }

            // Create riwayat fase
            const riwayatFase = await this.db.RiwayatFase.create({
                id_ternak: value.id_ternak,
                id_fp: fase.dataValues.id_fp,
                id_peternakan: req.dataAuth.id_peternakan,
                tanggal: new Date()
            });
            if(!riwayatFase){
                return{
                    code: 500,
                    error: 'Failed to create riwayat fase'
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
                id_status_ternak: value.id_status_ternak,
                status_kesehatan: value.status_kesehatan,
                id_kandang: value.id_kandang,
                id_peternakan: req.dataAuth.id_peternakan,
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
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const lkPemasukan = await this.db.LKPemasukan.findAll({
                where: req.query,
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {   model: this.db.Status,
                        as: 'status_ternak',
                        attributes: ['id_status_ternak', 'status_ternak']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        include: [
                            {
                                model: this.db.JenisKandang,
                                as: 'jenis_kandang',
                                attributes: ['id_jenis_kandang', 'jenis_kandang']
                            }
                        ]
                    }
                ],
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

    // Get LK Pemasukan by this Month
    getLKPemasukanThisMonth = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const lkPemasukan = await this.db.LKPemasukan.findAll({
                where: req.query,
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {   model: this.db.Status,
                        as: 'status_ternak',
                        attributes: ['id_status_ternak', 'status_ternak']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        include: [
                            {
                                model: this.db.JenisKandang,
                                as: 'jenis_kandang',
                                attributes: ['id_jenis_kandang', 'jenis_kandang']
                            }
                        ]
                    }
                ],
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

            // Filter by this month
            const thisDate = new Date();
            const monthYear = thisDate.getMonth() + '-' + thisDate.getFullYear();
            const filtered = lkPemasukan.filter((item) => {
                return item.dataValues.createdAt.getMonth() + '-' + item.dataValues.createdAt.getFullYear() === monthYear;
            });

            let totalBetina = 0;
            let totalJantan = 0;
            let totalJenisKelaminUnknown = 0;
            for(let i=0; i < filtered.length; i++){
                if(filtered[i].dataValues.jenis_kelamin.toLowerCase() === 'betina'){
                    totalBetina++;
                }else if(filtered[i].dataValues.jenis_kelamin.toLowerCase() === 'jantan'){
                    totalJantan++;
                }else{
                    totalJenisKelaminUnknown++;
                }
            }

            // Get total ternak by kode kandang
            const kandang = await this.db.Kandang.findAll({
                attributes: ['id_kandang', 'kode_kandang'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(kandang.length <= 0){
                return{
                    code: 404,
                    error: 'Data kandang not found'
                }
            }

            for(let i=0; i < kandang.length; i++){
                kandang[i].dataValues.total = 0;
                for(let j=0; j < filtered.length; j++){
                    if(filtered[j].dataValues.id_kandang === kandang[i].dataValues.id_kandang){
                        kandang[i].dataValues.total++;
                    }
                }
            }

            return {
                code: 200,
                data: {
                    total: filtered.length,
                    total_betina: totalBetina,
                    total_jantan: totalJantan,
                    totalJenisKelaminUnknown,
                    total_by_kandang: kandang,
                    list: filtered
                }
            };
        }catch (error){
            log_error('getLKPemasukanThisMonth Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _lkPemasukan(db);