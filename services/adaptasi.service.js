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
            const schema = joi.object({
                id_ternak: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }

            // Query Data
            const list = await this.db.Adaptasi.findAll({
                attributes: ['id_ternak', "status", "tanggal_treatment"],
                include: [
                    {
                        model: this.db.Treatment,
                        as: 'treatment',
                        attributes: ['id_treatment', 'treatment', 'day']
                    }
                ],
                where : {
                    id_ternak: value.id_ternak
                },
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data adaptasi not found'
                }
            }

            // for(let i = 0; i < list.length; i++){
            //     list[i].dataValues.day = i + 1;
            //     if(list[i].dataValues.treatment.day == i + 1){
            //         list[i].dataValues.treatments.
            //     }
            // }

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
}

module.exports = (db) => new _adaptasi(db);