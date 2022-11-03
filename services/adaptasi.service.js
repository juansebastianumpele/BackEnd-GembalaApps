// Helper databse yang dibuat
const {log_error} = require('../utils/logging');
const joi = require('joi');
const {generateToken} = require('../utils/auth');
const config = require('../config/app.config')

class _adaptasi{
    constructor(db){
        this.db = db;
    }
    /// Get Data adaptasi 
    getAdaptasi = async (req) => {
        try{
            // add id_peternakan, id_ternak to query
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const list = await this.db.Adaptasi.findAll({ 
                attributes: ['id_adaptasi', 'tanggal_adaptasi'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id']
                    },
                    {
                        model: this.db.Treatment,
                        as: 'treatment',
                        attributes: ['id_treatment', 'step', 'treatment']
                    }
                ],
                where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data adaptasi not found'
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
            log_error('getAdaptasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    /// Get Data adaptasi by step
    getAdaptasiByStep = async (req) => {
        try{
            // add id_peternakan, id_ternak to query
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Query Data
            const list = await this.db.Adaptasi.findAll({ 
                attributes: ['id_adaptasi', 'tanggal_adaptasi'],
                include: [
                    {
                        model: this.db.Ternak,
                        as: 'ternak',
                        attributes: ['id_ternak', 'rf_id']
                    },
                    {
                        model: this.db.Treatment,
                        as: 'treatment',
                        attributes: ['id_treatment', 'step', 'treatment']
                    }
                ],
                where : req.query });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data adaptasi not found'
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
            log_error('getAdaptasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    /// Create Data adaptasi
    createAdaptasi = async (req) => {
        try{
            // Validate Data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                treatments: joi.array().items(joi.object({
                id_treatment: joi.number().required()
                })).required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            if(value.treatments.length <= 0){
                return {
                    code: 400,
                    error: 'Treatments must be filled'
                }
            }

            // Check data ternak
            const ternak = await this.db.Ternak.findOne({
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang']
                    },
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    }
                ],
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!ternak){
                return {
                    code: 404,
                    error: 'Data ternak not found'
                }
            }

            // Create treatment apllied
            for(let i = 0; i < value.treatments.length; i++){
                const createAdaptasi = await this.db.Adaptasi.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_ternak,
                    id_treatment: value.treatments[i].id_treatment,
                    kode_kandang: ternak.dataValues.kandang.kode_kandang,
                    tanggal_adaptasi: new Date()
                });
                if(!createAdaptasi){
                    return {
                        code: 400,
                        error: 'Failed to create adaptasi'
                    }
                }
            }

            // update fase ternak
            if(ternak.dataValues.fase && ternak.dataValues.fase.fase.split(' ')[1] < 5){
                let stepAdaptasi = `adaptasi ${parseInt(ternak.dataValues.fase.fase.split(' ')[1]) + 1}`;
                const getIdFase = await this.db.Fase.findOne({
                    attributes: ['id_fp'],
                    where: {
                        fase: stepAdaptasi
                    }
                });
                if(!getIdFase){
                    return {
                        code: 404,
                        error: 'Fase not found'
                    }
                }
                const updateFase = await this.db.Ternak.update({
                    id_fp: getIdFase.dataValues.id_fp
                },{
                    where: {
                        id_ternak: value.id_ternak,
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                if(!updateFase){
                    return {
                        code: 400,
                        error: 'Failed to update fase'
                    }
                }

                // Create History Fase
                const createHistoryFase = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_ternak,
                    id_fp: getIdFase.dataValues.id_fp,
                    tanggal: new Date()
                });
                if(!createHistoryFase){
                    return {
                        code: 400,
                        error: 'Failed to create history fase'
                    }
                }
            }else if(ternak.dataValues.fase && ternak.dataValues.fase.fase.split(' ')[1] == 5){
                const getIdFase = await this.db.Fase.findOne({
                    attributes: ['id_fp'],
                    where: {
                        fase: 'waiting list perkawinan'
                    }
                });
                if(!getIdFase){
                    return {
                        code: 404,
                        error: 'Fase not found'
                    }
                }
                const updateFase = await this.db.Ternak.update({
                    id_fp: getIdFase.dataValues.id_fp
                },{
                    where: {
                        id_ternak: value.id_ternak,
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                if(!updateFase){
                    return {
                        code: 400,
                        error: 'Failed to update fase'
                    }
                }

                // Create History Fase
                const createHistoryFase = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_ternak,
                    id_fp: getIdFase.dataValues.id_fp,
                    tanggal: new Date()
                });
                if(!createHistoryFase){
                    return {
                        code: 400,
                        error: 'Failed to create history fase'
                    }
                }
            }else{
                return {
                    code: 400,
                    error: 'Ternak not in adaptasi fase'
                }
            }

            return {
                code: 200,
                data: {
                    message: 'Success to create adaptasi'
                }
            }
        }catch (error){
            log_error('createAdaptasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    /// Get ternak by fase adaptasi
    getTernakByStep = async (req) => {
        try{
            if(!req.query.step){
                return {
                    code: 400,
                    error: 'Step must be filled'
                }
            }
            if(req.query.step < 1 || req.query.step > 5){
                return {
                    code: 400,
                    error: 'Step must be between 1 and 5'
                }
            }
            // get data fase
            const fase = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: `adaptasi ${req.query.step}`
                }
            });
            if(!fase){
                return {
                    code: 404,
                    error: 'Fase not found'
                }
            }
            // Query Data
            const list = await this.db.Ternak.findAll({ 
                attributes: ['id_ternak', 'rf_id'],
                include: [
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    },
                    {
                        model: this.db.RiwayatFase,
                        as: 'riwayat_fase',
                        attributes: ['tanggal'],
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                    }
                ],
                where : {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: fase.dataValues.id_fp
                } });
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data ternak not found'
                }
            }

            for(let i = 0; i < list.length; i++){
                list[i].dataValues.tanggal = list[i].dataValues.riwayat_fase.length > 0 ? list[i].dataValues.riwayat_fase[list[i].dataValues.riwayat_fase.length - 1].tanggal : null;
                delete list[i].dataValues.riwayat_fase;
            }

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            log_error('getTernakByFaseAdaptasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _adaptasi(db);