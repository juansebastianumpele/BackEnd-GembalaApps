// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _riwayatKesehatan{
    constructor(db){
        this.db = db;
    }
    // Get data RiwayatKesehatan
    getRiwayatKesehatan = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Query data
            const list = await this.db.RiwayatKesehatan.findAll({ 
                attributes : ['id_riwayat_kesehatan', 'tanggal_sakit', 'tanggal_sembuh', 'gejala', 'penanganan'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id'],
                        include: [
                            {
                                model: this.db.Kandang,
                                as: 'kandang',
                                attributes: ['id_kandang', 'kode_kandang']
                            }
                        ]
                    },
                    {
                        model: this.db.Penyakit,
                        as: 'penyakit',
                        attributes: ['id_penyakit', 'nama_penyakit']
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: `Data riwayat kesehatan not found`
                }
            }

            for(let i = 0; i < list.length; i++){
                list[i].dataValues.kandang = list[i].dataValues.ternak.kandang;
                delete list[i].dataValues.ternak.dataValues.kandang
            }

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            log_error('getRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new RiwayatKesehatan
    createRiwayatKesehatan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                id_penyakit: joi.number().required(),
                tanggal_sakit: joi.date().allow(null),
                id_kandang: joi.number().allow(null)
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Get data penyakit
            const penyakit = await this.db.Penyakit.findOne({  
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if(!penyakit){
                return{
                    code: 404,
                    error: `Data penyakit not found`
                }
            }

            // Create RiwayatKesehatan
            const add = await this.db.RiwayatKesehatan.create({
                id_ternak: value.id_ternak,
                id_penyakit: value.id_penyakit,
                tanggal_sakit: value.tanggal_sakit ? value.tanggal_sakit : new Date(),
                gejala: penyakit.dataValues.gejala,
                penanganan: penyakit.dataValues.penanganan,
                id_peternakan: req.dataAuth.id_peternakan
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new Riwayat Kesehatan`
                }
            }

            // Update kandang ternak
            if(value.id_kandang != null){
                const update = await this.db.Ternak.update({
                    id_kandang: value.id_kandang
                }, {
                    where: {
                        id_ternak: value.id_ternak,
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                if(update <= 0){
                    return{
                        code: 400,
                        error: `Failed to update kandang ternak`
                    }
                }
            }

            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: add.id_riwayat_kesehatan,
                    id_ternak: add.id_ternak,
                    id_penyakit: add.id_penyakit,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Riwayat Kesehatan
    updateRiwayatKesehatan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_riwayat_kesehatan: joi.number().required(),
                tanggal_sakit: joi.date().allow(null),
                tanggal_sembuh: joi.date().allow(null),
                id_kandang: joi.number().allow(null),
                gejala: joi.string().allow(null),
                penanganan: joi.string().allow(null)
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Check data RiwayatKesehatan
            const check = await this.db.RiwayatKesehatan.findOne({
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!check){
                return{
                    code: 404,
                    error: `Data riwayat kesehatan not found`
                }
            }

            // Query data
            const update = await this.db.RiwayatKesehatan.update({
                tanggal_sakit: value.tanggal_sakit ? value.tanggal_sakit : check.dataValues.tanggal_sakit,
                tanggal_sembuh: value.tanggal_sembuh ? value.tanggal_sembuh : check.dataValues.tanggal_sembuh,
                gejala: value.gejala ? value.gejala : check.dataValues.gejala,
                penanganan: value.penanganan ? value.penanganan : check.dataValues.penanganan
            }, {
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update Riwayat Kesehatan`
                }
            }

            // Update kandang ternak
            if(value.id_kandang != null){
                const update = await this.db.Ternak.update({
                    id_kandang: value.id_kandang
                }, {
                    where: {
                        id_ternak: check.dataValues.id_ternak,
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                if(update <= 0){
                    return{
                        code: 400,
                        error: `Failed to update kandang ternak`
                    }
                }
            }

            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete RiwayatKesehatan
    deleteRiwayatKesehatan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_riwayat_kesehatan: joi.number().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const del = await this.db.RiwayatKesehatan.destroy({
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete Riwayat Kesehatan`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get total ternak sakit by penyakit
    getTotalTernakSakitByPenyakit = async (req) => {
        try{
            // Get data penyakit
            const penyakit = await this.db.Penyakit.findAll({
                attributes: ['id_penyakit', 'nama_penyakit'],
                include: [{
                    model: this.db.RiwayatKesehatan,
                    as: 'riwayat_kesehatan',
                    attributes: ['id_riwayat_kesehatan', 'id_ternak', 'id_penyakit', 'tanggal_sakit', 'tanggal_sembuh'],
                    where: {
                        id_peternakan: req.dataAuth.id_peternakan,
                        tanggal_sembuh: null
                    }
                }]
            });
            if(penyakit == null){
                return{
                    code: 400,
                    error: `Failed to get data penyakit`
                }
            }

            for(let i = 0; i < penyakit.length; i++){
                penyakit[i].dataValues.total = penyakit[i].dataValues.riwayat_kesehatan.length;
                delete penyakit[i].dataValues.riwayat_kesehatan;
            }

            return {
                code: 200,
                data: penyakit
            };
        }
        catch (error) {
            log_error('getTotalTernakSakitByPenyakit Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _riwayatKesehatan(db);