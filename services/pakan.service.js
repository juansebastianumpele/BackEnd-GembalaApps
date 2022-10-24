// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _pakan{
    constructor(db){
        this.db = db;
    }
    // get data pakan
    getJenisPakan = async (req) => {
        try{
            // Add id_user to params
            req.query.id_user = req.dataAuth.id_user
            // Query data
            const list = await this.db.JenisPakan.findAll({
                where : req.query
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data jenis pakan not found'
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
            log_error('getJenisPakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new Pakan
    createJenisPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                jenis_pakan: joi.string().required(),
                interval_pakan: joi.number().required(),
                satuan: joi.string().required(),
                komposisi: joi.string().allow(null),
                nutrien: joi.string().allow(null),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            const add = await this.db.JenisPakan.create({
                id_user: req.dataAuth.id_user,
                jenis_pakan: value.jenis_pakan,
                interval_pakan: value.interval_pakan,
                satuan: value.satuan,
                komposisi: value.komposisi,
                nutrien: value.nutrien,
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
                    id_jenis_pakan: add.id_jenis_pakan,
                    jenis_pakan: add.jenis_pakan,
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

    // Update Jenis Pakan
    updateJenisPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_jenis_pakan: joi.number().required(),
                jenis_pakan: joi.string().required(),
                interval_pakan: joi.number().required(),
                satuan: joi.string().required(),
                komposisi: joi.string().allow(null),
                nutrien: joi.string().allow(null),
            });
            
            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            const update = await this.db.JenisPakan.update({
                jenis_pakan: value.jenis_pakan,
                interval_pakan: value.interval_pakan,
                satuan: value.satuan,
                komposisi: value.komposisi,
                nutrien: value.nutrien,
            }, {
                where: {
                    id_jenis_pakan: value.id_jenis_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(update[0] == 0){
                return{
                    code: 400,
                    error: `Failed to update jenis pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_pakan: value.id_jenis_pakan,
                    jenis_pakan: value.jenis_pakan,
                    updatedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateJenisPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Jenis Pakan
    deleteJenisPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_jenis_pakan: joi.number().required(),
            });
            
            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }
            
            const del = await this.db.JenisPakan.destroy({
                where: {
                    id_jenis_pakan: value.id_jenis_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(del == 0){
                return{
                    code: 400,
                    error: `Failed to delete jenis pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_jenis_pakan: value.id_jenis_pakan,
                    deletedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('deleteJenisPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get pakan
    getPakan = async (req) => {
        try{
            // Add id_user to params
            req.query.id_user = req.dataAuth.id_user
            // Query data
            const list = await this.db.Pakan.findAll({
                attributes: ['id_pakan', 'id', 'tanggal_pembuatan', 'tanggal_konsumsi', 'createdAt', 'updatedAt'],
                include: [{
                    model: this.db.JenisPakan,
                    as: 'jenis_pakan',
                    attributes: ['id_jenis_pakan', 'jenis_pakan', 'interval_pakan', 'satuan', 'komposisi', 'nutrien', 'createdAt', 'updatedAt'],
                }],
                where: req.query,
            });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data pakan not found'
                }
            }

            for(let i = 0; i < list.length; i++){
                if(list[i].dataValues.tanggal_konsumsi != null){
                    list[i].dataValues.status = list[i].dataValues.tanggal_konsumsi < new Date() ? 'siap' : 'belum siap';
                    console.log(list[i].dataValues.tanggal_konsumsi < new Date());  
                }else{
                    list[i].dataValues.status = 'kosong';
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
            log_error('getPakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new Pakan
    createPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_jenis_pakan: joi.number().required(),
                id: joi.number().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // check id jenis_pakan
            const jenis_pakan = await this.db.Pakan.findOne({
                where: {
                    id: value.id,
                    id_user: req.dataAuth.id_user
                }
            });
            if(jenis_pakan != null){
                return{
                    code: 400,
                    error: `ID already exist`
                }
            }

            // add data pakan
            const add = await this.db.Pakan.create({
                id_user: req.dataAuth.id_user,
                id_jenis_pakan: value.id_jenis_pakan,
                id: value.id,
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
                    id_jenis_pakan: add.id_jenis_pakan,
                    id: add.id,
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
                id_jenis_pakan: joi.number().required(),
                id: joi.number().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // check id jenis_pakan
            const jenis_pakan = await this.db.Pakan.findOne({
                where: {
                    id: value.id,
                    id_user: req.dataAuth.id_user
                }
            });
            if(jenis_pakan != null){
                return{
                    code: 400,
                    error: `ID already exist`
                }
            }

            // update data pakan
            const update = await this.db.Pakan.update({
                id_jenis_pakan: value.id_jenis_pakan,
                id: value.id,
            }, {
                where: {
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
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
                    id_jenis_pakan: value.id_jenis_pakan,
                    id: value.id,
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
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
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

    // Fill Pakan
    fillPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
                tanggal_pembuatan: joi.date().allow(null),
                tanggal_konsumsi: joi.date().allow(null),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Get data pakan
            const pakan = await this.db.Pakan.findOne({
                where: {
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(pakan == null){
                return{
                    code: 400,
                    error: `Pakan not found`
                }
            }

            // Get data jenis pakan
            const jenisPakan = await this.db.JenisPakan.findOne({
                where: {
                    id_jenis_pakan: pakan.id_jenis_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(jenisPakan == null){
                return{
                    code: 400,
                    error: `Jenis pakan not found`
                }
            }

            // Query data
            const update = await this.db.Pakan.update({
                tanggal_pembuatan: value.tanggal_pembuatan != null ? value.tanggal_pembuatan : new Date(),
                tanggal_konsumsi: value.tanggal_konsumsi != null ? value.tanggal_konsumsi : date.addDays(value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(), jenisPakan.interval_pakan),
            }, {
                where: {
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to fill pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: update.id_pakan,
                    tanggal_pembuatan: value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(),
                    tanggal_konsumsi: value.tanggal_konsumsi ? value.tanggal_konsumsi : date.addDays(value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(), jenisPakan.interval_pakan),
                    updatedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('fillPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
    
    // Update fill Pakan
    updateFillPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
                tanggal_pembuatan: joi.date().allow(null),
                tanggal_konsumsi: joi.date().allow(null),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Get data pakan
            const pakan = await this.db.Pakan.findOne({
                where: {
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(pakan == null){
                return{
                    code: 400,
                    error: `Pakan not found`
                }
            }

            // Get data jenis pakan
            const jenisPakan = await this.db.JenisPakan.findOne({
                where: {
                    id_jenis_pakan: pakan.id_jenis_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(jenisPakan == null){
                return{
                    code: 400,
                    error: `Jenis pakan not found`
                }
            }

            // Query data
            const update = await this.db.Pakan.update({
                tanggal_pembuatan: value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(),
                tanggal_konsumsi: value.tanggal_konsumsi ? value.tanggal_konsumsi : date.addDays(value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(), jenisPakan.interval_pakan),
            }, {
                where: {
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to fill pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: value.id_pakan,
                    tanggal_pembuatan: value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(),
                    tanggal_konsumsi: value.tanggal_konsumsi ? value.tanggal_konsumsi : date.addDays(value.tanggal_pembuatan ? value.tanggal_pembuatan : new Date(), jenisPakan.interval_pakan),
                    updatedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('updateFillPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Empty Pakan
    emptyPakan = async (req) => {
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
            const update = await this.db.Pakan.update({
                tanggal_pembuatan: null,
                tanggal_konsumsi: null,
            }, {
                where: {
                    id_pakan: value.id_pakan,
                    id_user: req.dataAuth.id_user
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to empty pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: value.id_pakan,
                    tanggal_pembuatan: null,
                    tanggal_konsumsi: null,
                    updatedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            log_error('emptyPakan Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _pakan(db);