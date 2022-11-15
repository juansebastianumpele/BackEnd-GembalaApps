// Helper databse yang dibuat
const joi = require('joi');
const {newError, errorHandler} = require('../utils/errorHandler');

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
            if(list.length <= 0) newError(404, 'Data riwayat kesehatan not found', 'getRiwayatKesehatan Service');

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
            return errorHandler(error);
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
            if (error) newError(400, error.details[0].message, 'createRiwayatKesehatan Service');

            // Get data penyakit
            const penyakit = await this.db.Penyakit.findOne({  
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if(!penyakit) newError(404, 'Data penyakit not found', 'createRiwayatKesehatan Service');

            // Create RiwayatKesehatan
            const add = await this.db.RiwayatKesehatan.create({
                id_ternak: value.id_ternak,
                id_penyakit: value.id_penyakit,
                tanggal_sakit: value.tanggal_sakit ? value.tanggal_sakit : new Date(),
                gejala: penyakit.dataValues.gejala,
                penanganan: penyakit.dataValues.penanganan,
                id_peternakan: req.dataAuth.id_peternakan
            });
            if(!add) newError(500, 'Failed to create data riwayat penyakit', 'createRiwayatKesehatan Service');

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
                if(update <= 0) newError(500, 'Failed to update data ternak', 'createRiwayatKesehatan Service');
            }

            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: add.id_riwayat_kesehatan,
                    id_ternak: add.id_ternak,
                    id_penyakit: add.id_penyakit,
                    createdAt: add.createdAt,
                }
            };
        }
        catch (error) {
            return errorHandler(error);
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
            if (error) newError(400, error.details[0].message, 'updateRiwayatKesehatan Service');

            // Check data RiwayatKesehatan
            const check = await this.db.RiwayatKesehatan.findOne({
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!check) newError(404, 'Data riwayat kesehatan not found', 'updateRiwayatKesehatan Service');

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
            if(update <= 0) newError(500, 'Failed to update data riwayat kesehatan', 'updateRiwayatKesehatan Service');

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
                if(update <= 0) newError(500, 'Failed to update data ternak', 'updateRiwayatKesehatan Service');
            }

            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    updatedAt: new Date()
                }
            };
        }
        catch (error) {
            return errorHandler(error);
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
            if (error) newError(400, error.details[0].message, 'deleteRiwayatKesehatan Service');

            // Query data
            const del = await this.db.RiwayatKesehatan.destroy({
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(del <= 0) newError(500, 'Failed to delete data riwayat kesehatan', 'deleteRiwayatKesehatan Service');
            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    deletedAt: new Date()
                }
            };
        }
        catch (error) {
            return errorHandler(error);
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
            if(penyakit.length <= 0) newError(404, 'Data penyakit not found', 'getTotalTernakSakitByPenyakit Service');

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
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _riwayatKesehatan(db);