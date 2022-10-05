// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const PenyakitModel = require('../models/penyakit.model')(sequelize, DataTypes)

class _penyakit{
    // Get Data Penyakit
    getPenyakit = async (req) => {
        try{
            // Query data
            const list = await PenyakitModel.findAll({ where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data penyakit not found'
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
            console.error('getPenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Penyakit
    createPenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri: joi.string().required(),
                pengobatan: joi.string().required(),
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
            const add = await PenyakitModel.create({
                nama_penyakit: value.nama_penyakit,
                deskripsi: value.deskripsi,
                ciri: value.ciri,
                pengobatan: value.pengobatan,
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create penyakit`
                }
            }
            return {
                code: 200,
                data: {
                    id_penyakit: add.id_penyakit,
                    nama_penyakit: add.nama_penyakit,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createPenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Penyakit
    updatePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri: joi.string().required(),
                pengobatan: joi.string().required()
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
            const update = await PenyakitModel.update({
                nama_penyakit: value.nama_penyakit,
                deskripsi: value.deskripsi,
                ciri: value.ciri,
                pengobatan: value.pengobatan,
            }, {
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update penyakit`
                }
            }

            return {
                code: 200,
                data: {
                    id_penyakit: value.id_penyakit,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updatePenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Penyakit
    deletePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
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
            const del = await PenyakitModel.destroy({
                where: {
                    id_penyakit: value.id_penyakit
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete penyakit`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_penyakit: value.id_penyakit,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deletePenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _penyakit();