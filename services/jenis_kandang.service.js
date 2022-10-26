// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _jenisKandang{
    constructor(db){
        this.db = db;
    }
    // Get Jenis Kandang
    getJenisKandang = async (req) => {
        try{
            // Query Data
            const list = await this.db.JenisKandang.findAll({
                where: req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data jenis kandang not found'
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
            log_error('getJenisKandang Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new jenis kandang
    createJenisKandang = async (req) => {
        try {
            const schema = joi.object({
                jenis_kandang: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            const jenisKandang = await this.db.JenisKandang.create(value);
            if(!jenisKandang){
                return {
                    code: 400,
                    error: 'Failed to create jenis kandang'
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_kandang: jenisKandang.id_jenis_kandang,
                    jenis_kandang: jenisKandang.jenis_kandang,
                    createdAt: jenisKandang.createdAt
                }
            }
        } catch (error) {
            log_error('createJenisKandang Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update jenis kandang
    updateJenisKandang = async (req) => {
        try {
            const schema = joi.object({
                id_jenis_kandang: joi.number().required(),
                jenis_kandang: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }

            // Update jenis kandang
            const jenisKandang = await this.db.JenisKandang.update({
                jenis_kandang: value.jenis_kandang
            }, {
                where: {
                    id_jenis_kandang: value.id_jenis_kandang
                }
            });
            if(jenisKandang <= 0){
                return {
                    code: 400,
                    error: 'Failed to update jenis kandang'
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_kandang: value.id_jenis_kandang,
                    jenis_kandang: value.jenis_kandang,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        } catch (error) {
            log_error('updateJenisKandang Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete jenis kandang
    deleteJenisKandang = async (req) => {
        try {
            const schema = joi.object({
                id_jenis_kandang: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }

            // Delete jenis kandang
            const jenisKandang = await this.db.JenisKandang.destroy({
                where: {
                    id_jenis_kandang: value.id_jenis_kandang
                }
            });
            if(jenisKandang <= 0){
                return {
                    code: 400,
                    error: 'Failed to delete jenis kandang'
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_kandang: value.id_jenis_kandang,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        } catch (error) {
            log_error('deleteJenisKandang Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _jenisKandang(db);