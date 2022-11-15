const {Op} = require('sequelize');
const {newError, errorHandler} = require('../utils/errorHandler');
const joi = require('joi');
const createHistoryFase = require('./riwayat_fase.service');
const {sequelize} = require('../models');

class _kebuntingan{
    constructor(db){
        this.db = db;
    }
    // Get kandang kebuntingan
    getKandangKebuntingan = async (req) => {
        try{
            // Get data fase kebuntingan
            const faseKebuntingan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Kebuntingan'
                }
            });
            if(!faseKebuntingan) newError(404, 'Fase Kebuntingan not found', 'getKandangKebuntingan Service');

            // Get ternak in fase kebuntingan
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'id_kandang'],
                include: [{
                    model: this.db.Kandang,
                    as: 'kandang',
                    attributes: ['id_kandang', 'kode_kandang']
                }],
                where: {
                    id_fp: faseKebuntingan.dataValues.id_fp,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(ternak.length <= 0) newError(404, 'Data Ternak not found', 'getKandangKebuntingan Service');
            
            // Get kandang
            const kandang = await this.db.Kandang.findAll({
                attributes: ['id_kandang', 'kode_kandang'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(kandang.length <= 0) newError(404, 'Data Kandang not found', 'getKandangKebuntingan Service');
            
            // Get data ternak in kandang
            let dataKandang  = [];
            for(let i = 0; i < kandang.length; i++){
                let ternakInKandang  = 0;
                for(let j = 0; j < ternak.length; j++){
                    if(kandang[i].id_kandang == ternak[j].id_kandang){
                        ternakInKandang++;
                    }
                }
                if(ternakInKandang > 0){
                    dataKandang.push({
                        id_kandang: kandang[i].id_kandang,
                        kode_kandang: kandang[i].kode_kandang,
                        total_ternak: ternakInKandang
                    });
                }
            }

            return{
                code: 200,
                data: {
                    total: dataKandang.length,
                    list: dataKandang
                }
            }

        }catch(error){
            return errorHandler(error);
        }
    }

    // Get data ternak in kandang
    getDataTernakInKandang = async (req) => {
        try{
            // Get data fase kebuntingan
            const faseKebuntingan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Kebuntingan'
                }
            });
            if(!faseKebuntingan) newError(404, 'Fase Kebuntingan not found', 'getDataTernakInKandang Service');

            // Add params
            req.query.id_fp = faseKebuntingan.dataValues.id_fp;
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            // Get data ternak in kandang
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang']
                    },
                    {
                        model: this.db.RiwayatFase,
                        as: 'riwayat_fase',
                        attributes: ['tanggal']
                    }
                ],
                where: req.query
            });
            if(ternak.length <= 0) newError(404, 'Data Ternak not found', 'getDataTernakInKandang Service');

            for(let i = 0; i < ternak.length; i++){
                ternak[i].dataValues.tanggal = ternak[i].dataValues.riwayat_fase.length > 0 ? ternak[i].dataValues.riwayat_fase[0].tanggal : null;
                delete ternak[i].dataValues.riwayat_fase;
            }

            return{
                code: 200,
                data: {
                    total: ternak.length,
                    list: ternak
                }
            }

        }catch(error){
            return errorHandler(error);
        }
    }

    // Set ternak abortus
    setTernakAbortus = async (req) => {
        const t = await this.db.sequelize.transaction();
        try{
            
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'setTernakAbortus Service');

            // Get data fase kebuntingan
            const faseKebuntingan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Kebuntingan'
                }
            });
            if(!faseKebuntingan) newError(404, 'Fase Kebuntingan not found', 'setTernakAbortus Service');

            // Get data fase waiting list
            const faseWaitingList = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Waiting List Perkawinan'
                }
            });
            if(!faseWaitingList) newError(404, 'Fase Waiting List not found', 'setTernakAbortus Service');

            // Get data ternak
            const ternak = await this.db.Ternak.findOne({
                attributes: ['id_ternak'],
                where: {
                    id_ternak: value.id_ternak,
                    id_fp: faseKebuntingan.dataValues.id_fp,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!ternak) newError(404, 'Data Ternak not found in fase kebuntingan', 'setTernakAbortus Service');

            // Get riwayat perkawinan
            const latestRiwayatPerkawinan = await this.db.RiwayatPerkawinan.findAll({
                attributes: ['id_riwayat_perkawinan'],
                where: {
                    id_indukan: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 1
            });
            if(latestRiwayatPerkawinan.length <= 0) newError(404, 'Data Riwayat Perkawinan not found', 'setTernakAbortus Service');

            // Update fase ternak
            const updateFaseTernak = await this.db.Ternak.update({
                id_fp: faseWaitingList.dataValues.id_fp
            },{
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan,
                },
                transaction: t
            });
            if(updateFaseTernak <= 0) newError(500, 'Failed to update fase ternak', 'setTernakAbortus Service');

            // Create riwayat fase
            const historyFase = await this.db.RiwayatFase.create({
                id_ternak: value.id_ternak,
                id_fp: faseWaitingList.dataValues.id_fp,
                id_peternakan: req.dataAuth.id_peternakan,
                tanggal: new Date()
            },{transaction: t});
            if(!historyFase) newError(500, 'Failed to create riwayat fase', 'setTernakAbortus Service');

            // Update riwayat perkawinan
            const updateRiwayatPerkawinan = await this.db.RiwayatPerkawinan.update({
                status: 'Abortus'
            },{
                where: {
                    id_riwayat_perkawinan: latestRiwayatPerkawinan[0].dataValues.id_riwayat_perkawinan,
                    id_peternakan: req.dataAuth.id_peternakan
                },
                transaction: t
            });
            if(updateRiwayatPerkawinan <= 0) newError(500, 'Failed to update riwayat perkawinan', 'setTernakAbortus Service');

            await t.commit();
            return{
                code: 200,
                data: {
                    id_ternak: value.id_ternak,
                    updatedAt: new Date()
                }
            }
        }catch(error){
            await t.rollback();
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _kebuntingan(db);