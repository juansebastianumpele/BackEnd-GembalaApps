// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');

class _bangsa{
    // Get data varietas
    getBangsa = async (req) => {
        try{
            // Query data
            const list = await db.Bangsa.findAll({ where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data bangsa not found'
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
            log_error('getVarietas Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Bangsa
    createBangsa = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                bangsa: joi.string().required()
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
            const add = await db.Bangsa.create({
                bangsa: value.bangsa
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new varietas`
                }
            }

            return {
                code: 200,
                data: {
                    id_bangsa: add.id_bangsa,
                    bangsa: add.bangsa,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createVarietas Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Bangsa
    updateBangsa = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_bangsa: joi.number().required(),
                bangsa: joi.string().required()
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
            const update = await db.Bangsa.update({
                bangsa: value.bangsa
            }, {
                where: {
                    id_bangsa: value.id_bangsa
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update bangsa`
                }
            }

            return {
                code: 200,
                data: {
                    is_bangsa: value.is_bangsa,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateBangsa Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Bangsa
    deleteBangsa = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_bangsa: joi.number().required(),
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
            const del = await db.Bangsa.destroy({
                where: {
                    id_bangsa: value.id_bangsa
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete bangsa`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_bangsa: value.id_bangsa,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteBangsa Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _bangsa();