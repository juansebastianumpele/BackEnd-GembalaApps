// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error, log_info} = require('../utils/logging');
class _kandang{
    constructor(db){
        this.db = db;
    }
    // Get Kandang
    getKandang = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Query data
            const list = await this.db.Kandang.findAll({
                attributes : ['id_kandang', 'kode_kandang', 'persentase_kebutuhan_pakan', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: [
                            'id_ternak',
                            'rf_id',
                        ],
                        include: [
                            {
                                model: this.db.Timbangan,
                                as: 'timbangan',
                                attributes: [
                                    'id_timbangan',
                                    'berat',
                                ],
                            }
                        ]
                    },
                    {
                        model: this.db.JenisPakan,
                        as: 'jenis_pakan',
                        attributes: [
                            'id_jenis_pakan',
                            'jenis_pakan'
                        ]
                    },
                    {
                        model: this.db.JenisKandang,
                        as: 'jenis_kandang',
                        attributes: [
                            'id_jenis_kandang',
                            'jenis_kandang'
                        ]
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data kandang not found'
                }
            }
            for (let i = 0; i < list.length; i++) {
                list[i].dataValues.populasi = list[i].dataValues.ternak.length;
                // const berat_total = list[i].dataValues.ternak.reduce((a, b) => a + b.dataValues.timbangan[b.dataValues.timbangan.length - 1].berat, 0);
                const berat_total = list[i].dataValues.ternak.reduce((a, b) => a + (b.dataValues.timbangan.length > 0 ? b.dataValues.timbangan[b.dataValues.timbangan.length - 1].berat : 0), 0);
                const berat_rata = berat_total / list[i].dataValues.ternak.length;
                list[i].dataValues.berat_rata = (!berat_rata) ? 0 : berat_rata;
                list[i].dataValues.berat_total = berat_total;
                list[i].dataValues.kebutuhan_pakan = berat_total * (list[i].dataValues.persentase_kebutuhan_pakan/100);
                delete list[i].dataValues.ternak;
            }
            return {
                code : 200,
                data: {
                    total: list.length,
                    list
                },
            };
        }catch (error){
            log_error('getKandang Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new kandang
    createKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                kode_kandang: joi.string().required(),
                id_jenis_kandang: joi.number().required(),
                id_jenis_pakan: joi.number().required(),
                persentase_kebutuhan_pakan: joi.number().required()
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const add = await this.db.Kandang.create({
                id_peternakan: req.dataAuth.id_peternakan,
                kode_kandang: value.kode_kandang,
                id_jenis_kandang: value.id_jenis_kandang,
                id_jenis_pakan: value.id_jenis_pakan,
                persentase_kebutuhan_pakan: value.persentase_kebutuhan_pakan
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_kandang: add.id_kandang,
                    kode_kandang: add.kode_kandang,
                    id_jenis_kandang: add.id_jenis_kandang,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createKandang Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Update kandang
    updateKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
                kode_kandang: joi.string().required(),
                id_jenis_kandang: joi.number().required(),
                id_jenis_pakan: joi.number().required(),
                persentase_kebutuhan_pakan: joi.number().required()
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const update = await this.db.Kandang.update({
                kode_kandang: value.kode_kandang,
                id_jenis_kandang: value.id_jenis_kandang,
                id_jenis_pakan: value.id_jenis_pakan,
                persentase_kebutuhan_pakan: value.persentase_kebutuhan_pakan
            }, {
                where: {
                    id_kandang: value.id_kandang,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_kandang: value.id_kandang,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateKandang Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Delete kandang
    deleteKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }
            const del = await this.db.Kandang.destroy({
                where: {
                    id_kandang: value.id_kandang,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete kandang`
                }
            }
            
            return {
                code : 200,
                data: {
                    id_kandang: value.id_kandang,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteKandang Service', error);
            return {
                code : 500,
                error
            }
        }
    }
}

module.exports = (db) => new _kandang(db);