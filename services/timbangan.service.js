// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');

class _timbangan{
    // get Data Timbangan
    getDataTimbangan = async (req) => {
        try{
            // Query data
            const list = await db.Timbangan.findAll({
                attributes : ['id_timbangan', 'berat', 'suhu', 'tanggal_timbang', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id']
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: `Data timbangan not found`
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
            console.error('getTimbangan timbangan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Data Timbangan
    createDataTimbangan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                rf_id: joi.string().required(),
                berat: joi.number().required(),
                suhu: joi.number().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data ternak
            const ternak = await db.Ternak.findOne({
                where: {
                    rf_id: value.rf_id
                }
            });
            if(ternak == null){
                return{
                    code: 404,
                    error: `Data ternak not found`
                }
            }

            // Query data
            const add = await db.Timbangan.create({
                id_ternak: ternak.id_ternak,
                rf_id : value.rf_id,
                berat: value.berat,
                suhu: value.suhu
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to add data timbangan`
                }
            }

            return {
                code: 200,
                data: {
                    id_timbangan: add.id_timbangan,
                    id_ternak: add.id_ternak,
                    rf_id: add.rf_id,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createDataTimbangan timbangan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Data Timbangan
    updateDataTimbangan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_timbangan: joi.number().required(),
                berat: joi.number().required(),
                suhu: joi.number().required()
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
            const update = await db.Timbangan.update({
                berat: value.berat,
                suhu: value.suhu,
            }, {
                where: {
                    id_timbangan: value.id_timbangan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update data timbangan`
                }
            }

            return {
                code: 200,
                data: {
                    id_timbangan: value.id_timbangan,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateDataTimbangan timbangan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Data Timbangan
    deleteDataTimbangan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_timbangan: joi.number().required()
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
            const del = await db.Timbangan.destroy({
                where: {
                    id_timbangan: value.id_timbangan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete data timbangan`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_timbangan: value.id_timbangan,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteDataTimbangan timbangan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _timbangan();