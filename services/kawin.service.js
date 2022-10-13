// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const { Op } = require('sequelize');
const { log_error } = require('../utils/logging');

class _kawin {
    // List Ternak by id
    getKawin = async (req) => {
        try {
            // Query data
            const list = await db.Kawin.findAll({
                attributes: ['id_kawin', 'tanggal_kawin', 'id_ternak', 'id_pemacek', 'createdAt', 'updatedAt'],
                where: req.query,
                include: [
                    { 
                        model: db.Fase, 
                        as: 'fase', 
                        attributes: ['id_fp', 'fase'] 
                    },
                ],
            });

            for (let i = 0; i < list.length; i++) {
                const cempe = await db.Ternak.findAll({
                    where: {
                        id_induk: list[i].dataValues.id_ternak,
                        id_pejantan: list[i].dataValues.id_pemacek
                    }
                });
                list[i].dataValues.id_cempe = cempe.map((cempe) => cempe.id_ternak);
            }
            if (list.length <= 0) {
                return {
                    code: 404,
                    error: 'Data kawin not found'
                }
            }

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                },
            };
        } catch (error) {
            log_error('getKawin Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get data Indukan
    getDataIndukan = async (req) => {
        try {
            // Query Data
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
                [db.sequelize.fn('datediff', db.sequelize.fn('NOW'), db.sequelize.col('tanggal_lahir')), 'umur'],
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
                where: {
                    jenis_kelamin: 'betina',
                    id_fp: {
                        [Op.not]: 1
                    }
                }
            });
            if (list.length <= 0) {
                return {
                    code: 404,
                    error: 'Data indukan not found'
                }
            }

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                },
            };
        } catch (error) {
            log_error('getDataIndukan Service', error);
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
                tanggal_kawin: joi.date().required(),
                id_fp: joi.number(),
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
                tanggal_kawin: value.tanggal_kawin,
                id_fp: value.id_fp
            });
            if (add == null) {
                return {
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
            log_error('createDataKawin Service', error);
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
                tanggal_kawin: joi.date().required(),
                id_fp: joi.number(),
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
                tanggal_kawin: value.tanggal_kawin,
                id_fp: value.id_fp
            }, {
                where: {
                    id_kawin: value.id_kawin
                }
            });
            if (update <= 0) {
                return {
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
            log_error('updateDataKawin Service', error);
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
            if (del <= 0) {
                return {
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
            log_error('deleteDataKawin Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _kawin();