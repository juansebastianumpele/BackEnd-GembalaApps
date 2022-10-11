// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');

class _riwayatKesehatan{
    // Get data RiwayatKesehatan
    getRiwayatKesehatan = async (req) => {
        try{
            // Query data
            const list = await db.RiwayatKesehatan.findAll({ 
                attributes : ['id_riwayat_kesehatan', 'tanggal_sakit', 'tanggal_sembuh', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id']
                    },
                    {
                        model: db.Penyakit,
                        as: 'penyakit',
                        attributes: ['id_penyakit', 'nama_penyakit']
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: `Data riwayat kesehatan not found`
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
            log_error('getRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new RiwayatKesehatan
    createRiwayatKesehatan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                id_penyakit: joi.number().required(),
                tanggal_sakit: joi.date().required(),
                tanggal_sembuh: joi.date().allow(null)
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
            const add = await db.RiwayatKesehatan.create({
                id_ternak: value.id_ternak,
                id_penyakit: value.id_penyakit,
                tanggal_sakit: value.tanggal_sakit,
                tanggal_sembuh: value.tanggal_sembuh
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new Riwayat Kesehatan`
                }
            }

            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: add.id_riwayat_kesehatan,
                    id_ternak: add.id_ternak,
                    id_penyakit: add.id_penyakit,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Riwayat Kesehatan
    updateRiwayatKesehatan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_riwayat_kesehatan: joi.number().required(),
                id_ternak: joi.number().required(),
                id_penyakit: joi.number().required(),
                tanggal_sakit: joi.date().required(),
                tanggal_sembuh: joi.date().allow(null)
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
            const update = await db.RiwayatKesehatan.update({
                id_ternak: value.id_ternak,
                id_penyakit: value.id_penyakit,
                tanggal_sakit: value.tanggal_sakit,
                tanggal_sembuh: value.tanggal_sembuh
            }, {
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update Riwayat Kesehatan`
                }
            }

            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete RiwayatKesehatan
    deleteRiwayatKesehatan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_riwayat_kesehatan: joi.number().required(),
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
            const del = await db.RiwayatKesehatan.destroy({
                where: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete Riwayat Kesehatan`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_riwayat_kesehatan: value.id_riwayat_kesehatan,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteRiwayatKesehatan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _riwayatKesehatan();