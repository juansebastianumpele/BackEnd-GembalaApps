// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const FaseModel = require('../models/fase.model')(sequelize, DataTypes)

class _fase{
    // Get Fase
    getFase = async (req) => {
        try{            
            // Query Data
            const list = await FaseModel.findAll({ where : req.query });
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
            console.error('listFase fase Service Error: ', error);
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

            const add = await FaseModel.create({
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
            console.error('createFase fase service Error: ', error);
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

            const update = await FaseModel.update({
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
            console.error('updateFase fase service Error: ', error);
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

            const del = await FaseModel.destroy({
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
            console.error('deleteFase fase service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _fase();