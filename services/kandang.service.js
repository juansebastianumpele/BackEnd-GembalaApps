// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');
class _kandang{
    // Get Kandang
    getKandang = async (req) => {
        try{
            // Query data
            const list = await db.Kandang.findAll({
                attributes : ['id_kandang', 'kode_kandang', 'jenis_kandang', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: db.Ternak,
                        as: 'ternak',
                        attributes: [
                            'id_ternak',
                            'rf_id',
                            'berat'
                        ],
                    },
                ],
            });
            for (let i = 0; i < list.length; i++) {
                list[i].dataValues.populasi = list[i].dataValues.ternak.length;
                const berat_total = list[i].dataValues.ternak.reduce((a, b) => a + b.berat, 0);
                const berat_rata = berat_total / list[i].dataValues.ternak.length;
                list[i].dataValues.berat_rata = (!berat_rata) ? 0 : berat_rata;
                list[i].dataValues.berat_total = berat_total;
                list[i].dataValues.kebutuhan_pakan = berat_total * 0.05;
            }
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data kandang not found'
                }
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
                jenis_kandang: joi.string().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const add = await db.Kandang.create({
                kode_kandang: value.kode_kandang,
                jenis_kandang: value.jenis_kandang
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
                    jenis_kandang: add.jenis_kandang,
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
                jenis_kandang: joi.string().required(),
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
            const update = await db.Kandang.update({
                kode_kandang: value.kode_kandang,
                jenis_kandang: value.jenis_kandang
            }, {
                where: {
                    id_kandang: value.id_kandang
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
            const del = await db.Kandang.destroy({
                where: {
                    id_kandang: value.id_kandang
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

module.exports = new _kandang();