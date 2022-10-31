// Helper databse yang dibuat
const {log_error} = require('../utils/logging');
const joi = require('joi');
const {generateToken} = require('../utils/auth');
const config = require('../config/app.config')

class _adaptasi{
    constructor(db){
        this.db = db;
    }
    // Get Data adaptasi 
    getAdaptasi = async (req) => {
        try{
            // add id_peternakan, id_ternak to query
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const list = await this.db.Adaptasi.findAll({ 
                attributes: ['id_adaptasi', 'id_peternakan', 'id_ternak', 'id_treatment', 'tanggal_adaptasi', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id']
                    }
                ],
                where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data adaptasi not found'
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
            log_error('getAdaptasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create Data adaptasi
    createAdaptasi = async (req) => {
        try{
            // Validate Data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                id_treatment: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            // Create Data
            const data = await this.db.Adaptasi.create({
                id_peternakan: req.dataAuth.id_peternakan,
                id_ternak: value.id_ternak,
                id_treatment: value.id_treatment,
                tanggal_adaptasi: new Date()
            });
            return {
                code: 200,
                data
            };
        }catch (error){
            log_error('createAdaptasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _adaptasi(db);