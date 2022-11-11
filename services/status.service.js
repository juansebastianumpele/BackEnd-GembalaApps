// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');
class _status{
    constructor(db){
        this.db = db;
    }
    // Get Status
    getStatus = async (req) => {
        try{
            // Query Data
            const list = await this.db.StatusTernak.findAll({
                attrbutes: ['id_status_ternak','status_ternak'],
                where: req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data status not found'
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
            log_error('getStatus Service', error);
            return {
                code: 500,
                error
            }
        }
    }
    
    // Create new status
    createStatus = async (req) => {
        try {
            const schema = joi.object({
                status_ternak: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            const status = await this.db.StatusTernak.create(value);
            return {
                code: 200,
                data: status
            }
        } catch (error) {
            log_error('createStatus Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update status
    updateStatus = async (req) => {
        try {
            const schema = joi.object({
                id_status_ternak: joi.number().required(),
                status_ternak: joi.string().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }

            // Update Status Ternak
            const status = await this.db.StatusTernak.update({
                status_ternak: value.status_ternak
            }, {
                where: {
                    id_status_ternak: value.id_status_ternak
                }
            });
            if(status <= 0){
                return {
                    code: 500,
                    error: 'Failed to update status'
                }
            }

            return {
                code: 200,
                data: {
                    id_status_ternak: value.id_status_ternak,
                    status: value.status,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        } catch (error) {
            log_error('updateStatus Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete status
    deleteStatus = async (req) => {
        try {
            const schema = joi.object({
                id_status_ternak: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }

            // Delete Status Ternak
            const status = await this.db.StatusTernak.destroy({
                where: {
                    id_status_ternak: value.id_status_ternak
                }
            });
            if(status <= 0){
                return {
                    code: 404,
                    error: 'Data status not found'
                }
            }

            return {
                code: 200,
                data: {
                    id_status_ternak: value.id_status_ternak,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }
        } catch (error) {
            log_error('deleteStatus Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _status(db);