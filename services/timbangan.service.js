const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _timbangan{
    constructor(db){
        this.db = db;
    }
    // get Data Timbangan
    getDataTimbangan = async (req) => {
        try{
            // Query data
            const list = await this.db.Timbangan.findAll({
                attributes : ['id_timbangan', 'berat', 'suhu', 'tanggal_timbang', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: this.db.Ternak,
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
            log_error('getDataTimbangan Service', error);
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
            const ternak = await this.db.Ternak.findOne({
                attributes: ['id_ternak', 'rf_id'],
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
            const add = await this.db.Timbangan.create({
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

            // Update data ternak
            const update = await this.db.Ternak.update({
                berat: value.berat,
                suhu: value.suhu
            },{
                where: {
                    rf_id: value.rf_id,
                    id_ternak: ternak.id_ternak
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update data ternak`
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
            log_error('createDataTimbangan Service', error);
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
            const update = await this.db.Timbangan.update({
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
            log_error('updateDataTimbangan Service', error);
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
            const del = await this.db.Timbangan.destroy({
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
            log_error('deleteDataTimbangan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _timbangan(db);