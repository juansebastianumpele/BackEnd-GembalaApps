// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _bahanPakan{
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
                jenis_bahan_pakan: joi.string().required(),
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
                id_user: req.dataAuth.id_user,
                jenis_bahan_pakan: value.jenis_bahan_pakan,
                satuan: value.satuan,
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new jenis bahan pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_bahan_pakan: add.id_jenis_bahan_pakan,
                    jenis_bahan_pakan: add.jenis_bahan_pakan,
                    createdAt : date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createJenisBahanPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Jenis Bahan Pakan
    updateJenisBahanPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_jenis_bahan_pakan: joi.string().required(),
                jenis_bahan_pakan: joi.string().required(),
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

            // Query data
            const update = await this.db.JenisBahanPakan.update({
                jenis_bahan_pakan: value.jenis_bahan_pakan,
                satuan: value.satuan,
            }, {
                where: {
                    id_jenis_bahan_pakan: value.id_jenis_bahan_pakan,
                    id_user: req.dataAuth.id_user
                }
            });

            if(update[0] <= 0){
                return{
                    code: 400,
                    error: `Failed to update jenis bahan pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_bahan_pakan: value.id_jenis_bahan_pakan,
                    jenis_bahan_pakan: value.jenis_bahan_pakan,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateJenisBahanPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Jenis Bahan Pakan
    deleteJenisBahanPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_jenis_bahan_pakan: joi.string().required()
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
            const del = await this.db.JenisBahanPakan.destroy({
                where: {
                    id_jenis_bahan_pakan: value.id_jenis_bahan_pakan,
                    id_user: req.dataAuth.id_user
                }
            });

            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete jenis bahan pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_bahan_pakan: value.id_jenis_bahan_pakan,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteJenisBahanPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get data bahan pakan
    getBahanPakan = async (req) => {
        try{
            // Add id_user to params
            req.query.id_user = req.dataAuth.id_user
            // Query data
            const list = await this.db.BahanPakan.findAll({
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data bahan pakan not found'
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
            log_error('getBahanPakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }
    
    // Add new bahan pakan/ Mutasi bahan pakan
    createBahanPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_jenis_bahan_pakan: joi.string().required(),
                tanggal: joi.date().allow(null),
                jumlah: joi.number().required(),
                keterangan: joi.string().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // create mutasi bahan pakan
            const add = await this.db.BahanPakan.create({
                id_user: req.dataAuth.id_user,
                id_jenis_bahan_pakan: value.id_jenis_bahan_pakan,
                tanggal: value.tanggal == '' || value.tanggal == null ? new Date() : value.tanggal,
                jumlah: value.jumlah == '' || value.jumlah == null ? 0 : value.jumlah,
                keterangan: value.keterangan,
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new bahan pakan`
                }
            }

            // update stok bahan pakan
            const update = await this.db.JenisBahanPakan.update({
                stok: value.keterangan == 'masuk' ? this.db.sequelize.literal(`stok + ${value.jumlah}`) : this.db.sequelize.literal(`stok - ${value.jumlah}`),
            }, {
                where: {
                    id_jenis_bahan_pakan: value.id_jenis_bahan_pakan,
                    id_user: req.dataAuth.id_user
                }
            });

            if(update[0] <= 0){
                return{
                    code: 400,
                    error: `Failed to update stok bahan pakan ${value.id_jenis_bahan_pakan}`
                }
            }

            return {
                code: 200,
                data: {
                    id_bahan_pakan: add.id_bahan_pakan,
                    id_jenis_bahan_pakan: add.id_jenis_bahan_pakan,
                    createdAt : date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('createBahanPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _pakan(db);