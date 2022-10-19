// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const { sequelize } = require('../models');
const { log_error } = require('../utils/logging');
class _ternak{
    // Get Data Ternak
    getTernak = async (req) => {
        try{
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            // Query data
            const list = await db.Ternak.findAll({
                attributes : ['id_ternak', 
                'rf_id', 
                'foto', 
                'jenis_kelamin', 
                'id_induk', 
                'id_pejantan', 
                'berat', 
                'suhu', 
                'status_kesehatan',
                'tanggal_lahir',
                [db.sequelize.fn('datediff', sequelize.fn('NOW'), db.sequelize.col('tanggal_lahir')), 'umur'],
                'tanggal_masuk', 
                'tanggal_keluar', 
                'status_keluar', 
                'createdAt', 
                'updatedAt'],
                include: [
                    {
                        model: db.Varietas,
                        as: 'varietas',
                        attributes: ['id_varietas', 'varietas']
                    },
                    {
                        model: db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang', 'jenis_kandang']
                    },
                    {
                        model: db.Penyakit,
                        as: 'penyakit',
                        attributes: ['id_penyakit', 'nama_penyakit']
                    },
                    {
                        model: db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    },
                    {
                        model: db.Pakan,
                        as: 'pakan',
                        attributes: ['id_pakan', 'nama_pakan']
                    }
                ],
                where : req.query
            });

            for(let i = 0; i < list.length; i++){
                list[i].dataValues.kebutuhan_pakan = (list[i].dataValues.berat * 0.05).toFixed(2);
            }

            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data Ternak not found'
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
            log_error('getTernak Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Ternak
    createTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                rf_id: joi.string().required(),
                foto: joi.string().allow(null),
                jenis_kelamin: joi.string().allow(null),
                id_varietas: joi.number().allow(null),
                berat: joi.number().allow(null),
                suhu: joi.number().allow(null),
                tanggal_lahir: joi.date().allow(null),
                tanggal_masuk: joi.date().allow(null),
                id_induk: joi.number().allow(null),
                id_pejantan: joi.number().allow(null),
                id_penyakit: joi.number().allow(null),
                id_pakan: joi.number().allow(null),
                id_fp: joi.number().allow(null),
                id_kandang: joi.number().allow(null)
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Check status kesehatan
            value.status_kesehatan = value.id_penyakit ? 'Sakit' : 'Sehat';

            // Check if Ternak already exist
            const ternak = await db.Ternak.findOne({
                where: {
                    rf_id: value.rf_id
                }
            });
            if(ternak){
                return{
                    code: 400,
                    error: 'Ternak already exist'
                }
            }

            // Query Data
            // Add id_peternakan to params
            value.id_peternakan = req.dataAuth.id_peternakan
            const add = await db.Ternak.create(value);
            if(add === null){
                return{
                    code: 400,
                    error: `Failed to create new Ternak`
                }
            }

            // Check if ternak is sick, if yes, add to riwayat_kesehatan_ternak
            if(value.id_penyakit){
                const addRiwayat = await db.RiwayatKesehatan.create({
                    id_ternak: add.id_ternak,
                    id_penyakit: value.id_penyakit,
                    tanggal_sakit: new Date(),
                });
                if(addRiwayat === null){
                    return{
                        code: 400,
                        error: `Failed to create new Riwayat Kesehatan`
                    }
                }
            }

            return {
                code: 200,
                data: {
                    id: add.id_ternak,
                    rf_id: add.rf_id,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createTernak Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Ternak
    updateTernak = async (req) => {
        try {
            const schema = joi.object({
                id_ternak: joi.number().required(),
                rf_id: joi.string().required(),
                foto: joi.string().allow(null),
                jenis_kelamin: joi.string().allow(null),
                id_varietas: joi.number().allow(null),
                berat: joi.number().allow(null),
                suhu: joi.number().allow(null),
                tanggal_lahir: joi.date().allow(null),
                tanggal_masuk: joi.date().allow(null),
                id_induk: joi.number().allow(null),
                id_pejantan: joi.number().allow(null),
                status_kesehatan: joi.string().allow(null),
                id_penyakit: joi.number().allow(null),
                id_pakan: joi.number().allow(null),
                id_fp: joi.number().allow(null),
                id_kandang: joi.number().allow(null),
                tanggal_keluar: joi.date().allow(null),
                status_keluar: joi.number().allow(null)
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Check status kesehatan
            value.status_kesehatan = value.id_penyakit ? 'Sakit' : 'Sehat';

            const update = await db.Ternak.update(value, {
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update Ternak`
                }
            }

            // Check if ternak isnt sick, update from riwayat_kesehatan_ternak
            if(value.id_penyakit === null){
                const updateRiwayat = await db.RiwayatKesehatan.update({
                    tanggal_selesai: new Date(),
                }, {
                    where: {
                        id_ternak: value.id_ternak,
                        tanggal_selesai: null
                    }
                });
                if(updateRiwayat <= 0){
                    return{
                        code: 400,
                        error: `Failed to update Riwayat Kesehatan`
                    }
                }
            }

            return {
                code: 200,
                data: {
                    id: value.id_ternak,
                    rf_id: value.rf_id,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateTernak Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Ternak
    deleteTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_ternak: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Query Data
            const del = await db.Ternak.destroy({
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete Ternak`
                }
            }

            return {
                code: 200,
                data: {
                    id: value.id_ternak,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteTernak Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _ternak();