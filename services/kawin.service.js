// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');

class _kawin{
    // List Ternak by id
    getKawin = async (req) => {
        try{
            // Query data
            const list = await db.Kawin.findAll({
                attributes : ['id_kawin', 'tanggal_kawin', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id', 'foto', 'jenis_kelamin', 'id_induk', 'id_pejantan', 'berat', 'suhu', 'status_kesehatan', 'tanggal_lahir', 'tanggal_masuk', 'tanggal_keluar', 'status_keluar', 'createdAt', 'updatedAt']
                    },
                    {
                        model: db.Ternak,
                        as: 'pemacek',
                        attributes: ['id_ternak', 'rf_id', 'foto', 'jenis_kelamin', 'id_induk', 'id_pejantan', 'berat', 'suhu', 'status_kesehatan', 'tanggal_lahir', 'tanggal_masuk', 'tanggal_keluar', 'status_keluar', 'createdAt', 'updatedAt']
                    }
                ],
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data kawin not found'
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
            console.error('listKawinByIdUsers kawin service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Kawin
    createDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                id_pemacek: joi.number().required(),
                tanggal_kawin: joi.date().required()
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
            const add = await db.Kawin.create({
                id_ternak: value.id_ternak,
                id_pemacek: value.id_pemacek,
                tanggal_kawin: value.tanggal_kawin
            });
            if(add == null){
                return{
                    code: 400,
                    error: 'Failed to create new kawin'
                }
            }

            return {
                code: 200,
                data: {
                    id_kawin: add.id_kawin,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createTernak ternak service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update ternak
    updateDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kawin: joi.number().required(),
                id_ternak: joi.number().required(),
                id_pemacek: joi.number().required(),
                tanggal_kawin: joi.date().required()
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
            const update = await db.Kawin.update({
                id_ternak: value.id_ternak,
                id_pemacek: value.id_pemacek,
                tanggal_kawin: value.tanggal_kawin
            }, {
                where: {
                    id_kawin: value.id_kawin
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: 'Failed to update data kawin'
                }
            }

            return {
                code: 200,
                data: {
                    id_kawin: value.id_kawin,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateKawin kawin service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Kawin
    deleteDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kawin: joi.number().required(),
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
            const del = await db.Kawin.destroy({
                where: {
                    id_kawin: value.id_kawin
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: 'Failed to delete data kawin'
                }
            }
            
            return {
                code: 200,
                data: {
                    id_kawin: value.id_kawin,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteKawin kawin service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _kawin();