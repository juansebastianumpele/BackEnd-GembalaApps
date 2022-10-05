// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const VarietasModel = require('../models/varietas.model')(sequelize, DataTypes)

class _varietas{
    // Get data varietas
    getVarietas = async (req) => {
        try{
            // Query data
            const list = await VarietasModel.findAll({ where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data varietas not found'
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
            console.error('getVarietas Varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Varietas
    createVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                varietas: joi.string().required()
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
            // const add = await this.db.query('INSERT INTO d_varietas (nama_varietas) VALUES (?)', 
            // [
            //     value.nama_varietas
            // ]);
            const add = await VarietasModel.create({
                varietas: value.varietas
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
                    id_varietas: add.id_varietas,
                    nama_varietas: add.varietas,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createVarietas varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update varietas
    updateVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_varietas: joi.number().required(),
                varietas: joi.string().required()
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
            // const update = await this.db.query('UPDATE d_varietas SET nama_varietas = ? WHERE id_varietas = ?', 
            // [
            //     value.nama_varietas, 
            //     value.id_varietas
            // ]);
            const update = await VarietasModel.update({
                varietas: value.varietas
            }, {
                where: {
                    id_varietas: value.id_varietas
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update varietas`
                }
            }

            return {
                code: 200,
                data: {
                    id_varietas: value.id_varietas,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateVarietas varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete varietas
    deleteVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_varietas: joi.number().required(),
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
            // const del = await this.db.query('DELETE FROM d_varietas WHERE id_varietas = ?', 
            // [
            //     value.id_varietas
            // ]);
            const del = await VarietasModel.destroy({
                where: {
                    id_varietas: value.id_varietas
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete varietas`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_varietas: value.id_varietas,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteVarietas varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _varietas();