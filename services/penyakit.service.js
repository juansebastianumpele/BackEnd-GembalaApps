// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');

class _penyakit{
    // Get Data Penyakit
    getPenyakit = async (req) => {
        try{
            // Query data
            const list = await db.Penyakit.findAll({ where : req.query });
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
            log_error('getPenyakit Service', error);
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
                gejala: joi.string().required(),
                penanganan: joi.string().required(),
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
            const add = await db.Penyakit.create({
                nama_penyakit: value.nama_penyakit,
                gejala: value.gejala,
                penanganan: value.penanganan,
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
            log_error('createPenyakit Service', error);
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
                gejala: joi.string().required(),
                penanganan: joi.string().required()
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
            const update = await db.Penyakit.update({
                nama_penyakit: value.nama_penyakit,
                deskripsi: value.deskripsi,
                gejala: value.gejala,
                penanganan: value.penanganan,
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
            log_error('updatePenyakit Service', error);
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
            const del = await db.Penyakit.destroy({
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
            log_error('deletePenyakit Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _penyakit();