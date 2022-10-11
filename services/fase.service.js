// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');
class _fase{
    // Get Fase
    getFase = async (req) => {
        try{            
            // Query Data
            const list = await db.Fase.findAll({
                include: [
                    {
                        model: db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id','berat']
                    }
                ]
            });

            for(let i=0; i<list.length; i++){
                list[i].dataValues.populasi = list[i].dataValues.ternak.length;
                const berat_total = list[i].dataValues.ternak.reduce((a, b) => a + b.berat, 0);
                const berat_rata = berat_total / list[i].dataValues.ternak.length;
                list[i].dataValues.berat_rata = (!berat_rata) ? 0 : berat_rata;
                list[i].dataValues.berat_total = berat_total;
            }

            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data fase not found'
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
            log_error('getFase Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new fase
    createFase = async (req) => {
        try {
            const schema = joi.object({
                fase: joi.string().required()
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const add = await db.Fase.create({
                fase: value.fase
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create fase`
                }
            }

            return {
                code : 200,
                data: {
                    id_fase_pemeliharaan: add.id_fp,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                },
            };
        }
        catch (error) {
            log_error('createFase Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update fase
    updateFase = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_fp: joi.number().required(),
                fase: joi.string().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const update = await db.Fase.update({
                fase: value.fase
            }, {
                where: {
                    id_fp: value.id_fp
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update fase`
                }
            }

            return {
                code: 200,
                data: {
                    id_fp: value.id_fp,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                },
            };
        }
        catch (error) {
            log_error('updateFase Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete fase
    deleteFase = async (req) => {
        try {
            const schema = joi.object({
                id_fp: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const del = await db.Fase.destroy({
                where: {
                    id_fp: value.id_fp
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete fase`
                }
            }

            return {
                code: 200,
                data: {
                    id_fp: value.id_fp,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                },
            };
        }
        catch (error) {
            log_error('deleteFase Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _fase();