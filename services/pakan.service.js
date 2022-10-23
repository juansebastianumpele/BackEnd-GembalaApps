// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _pakan{
    constructor(db){
        this.db = db;
    }
    // get data pakan
    getJenisBahanPakan = async (req) => {
        try{
            // Add id_user to params
            req.query.id_user = req.dataAuth.id_user
            // Query data
            const list = await this.db.JenisBahanPakan.findAll({
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data jenis bahan pakan not found'
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
            log_error('getJenisBahanPakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new Pakan
    createJenisBahanPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_bahan_pakan: joi.string().required(),
                komposisi: joi.string().required(),
                stok: joi.number().required(),
                satuan: joi.string().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            const add = await this.db.Pakan.create({
                id_peternakan: req.dataAuth.id_peternakan,
                nama_pakan: value.nama_pakan, 
                jenis_pakan: value.jenis_pakan,
                komposisi: value.komposisi,
                stok: value.stok,
                satuan: value.satuan,
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: add.id_pakan,
                    nama_pakan: add.nama_pakan,
                    createdAt : date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Pakan
    updatePakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
                nama_pakan: joi.string().required(),
                jenis_pakan: joi.string().required(),
                komposisi: joi.string().required(),
                stok: joi.number().required(),
                satuan: joi.string().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }
            const update = await this.db.Pakan.update({
                nama_pakan: value.nama_pakan,
                jenis_pakan: value.deskripsi,
                komposisi: value.komposisi,
                stok: value.jumlah,
                satuan: value.satuan,
            }, {
                where: {
                    id_pakan: value.id_pakan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: value.id_pakan,
                    nama_pakan: value.nama_pakan,
                    updatedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updatePakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Pakan
    deletePakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
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
            const del = await this.db.Pakan.destroy({
                where: {
                    id_pakan: value.id_pakan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: value.id_pakan,
                    deletedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deletePakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _pakan(db);