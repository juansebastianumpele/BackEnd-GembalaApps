const {newError, errorHandler} = require('../utils/errorHandler');
const joi = require('joi');
const {sequelize} = require('../models');

class _lepasSapih{
    constructor(db){
        this.db = db;
    }
    // Create lepas sapih
    createLepasSapih = async (req) => {
        const t = await sequelize.transaction();
        try{
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                tanggal_lepas_sapih: joi.date().allow(null).required(),
                id_kandang: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.message, 'createLepasSapih Service');

            // Get data fase kelahiran
            const faseKelahiran = await this.db.Fase.findOne({where: {id_ternak: value.id_ternak, fase: 'Kelahiran'}});
            if(!faseKelahiran) newError(404, 'Data Fase Kelahiran not found', 'createLepasSapih Service');

            // Get data fase lepas sapih
            const faseLepasSapih = await this.db.Fase.findOne({where: {id_ternak: value.id_ternak, fase: 'Lepas Sapih'}});
            if(!faseLepasSapih) newError(404, 'Data Fase Lepas Sapih not found', 'createLepasSapih Service');

            // Check ternak
            const ternak = await this.db.Ternak.findOne({where: {id_ternak: value.id_ternak}});
            if(!ternak) newError(404, 'Ternak not found', 'createLepasSapih Service');
            if(ternak.dataValues.id_fp !== faseKelahiran.dataValues.id_fp) newError(400, 'Ternak not in fase kelahiran', 'createLepasSapih Service');

            // Check kandang
            const kandang = await this.db.Kandang.findOne({where: {id_kandang: value.id_kandang}});
            if(!kandang) newError(404, 'Kandang not found', 'createLepasSapih Service');

            // Update ternak to lepas sapih fase
            const updateTernak = await this.db.Ternak.update({
                id_fp: faseLepasSapih.dataValues.id_fp,
                id_kandang: value.id_kandang
            }, {
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }, 
                transaction: t
            });
            if(updateTernak[0] <= 0) newError(400, 'Update ternak to lepas sapih fase failed', 'createLepasSapih Service');

            // Create riwayat fase cempe
            const createRiwayatFase = await this.db.RiwayatFase.create({
                id_ternak: value.id_ternak,
                id_fp: faseLepasSapih.dataValues.id_fp,
                tanggal: value.tanggal_lepas_sapih || new Date()
            }, {transaction: t});
            if(!createRiwayatFase) newError(400, 'Create riwayat fase failed', 'createLepasSapih Service');

            // Get data fase laktasi
            const faseLaktasi = await this.db.Fase.findOne({where: {fase: 'Laktasi'}});
            if(!faseLaktasi) newError(404, 'Data Fase Laktasi not found', 'createLepasSapih Service');

            // Get data fase waiting list perkawinan
            const faseWaitingListPerkawinan = await this.db.Fase.findOne({where: {fase: 'Waiting List Perkawinan'}});
            if(!faseWaitingListPerkawinan) newError(404, 'Data Fase Waiting List Perkawinan not found', 'createLepasSapih Service');

            // Check Indukan
            const indukan = await this.db.Ternak.findOne({
                where: {
                    id_ternak: ternak.dataValues.id_dam
                }
            });
            if(!indukan) newError(404, 'Indukan not found', 'createLepasSapih Service');

            // If Indukan in Laktasi fase, Move to Waiting List perkawinan
            if(indukan.dataValues.id_fp === faseLaktasi.dataValues.id_fp){
                // Update ternak to waiting list perkawinan fase
                const updateIndukan = await this.db.Ternak.update({
                    id_fp: faseWaitingListPerkawinan.dataValues.id_fp
                }, {
                    where: {
                        id_ternak: ternak.dataValues.id_dam,
                        id_peternakan: req.dataAuth.id_peternakan
                    }, 
                    transaction: t
                });
                if(updateIndukan[0] <= 0) newError(400, 'Update ternak to waiting list perkawinan fase failed', 'createLepasSapih Service');

                // Create riwayat fase
                const createRiwayatFase = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: ternak.dataValues.id_dam,
                    id_fp: faseWaitingListPerkawinan.dataValues.id_fp,
                    tanggal: new Date()
                }, {transaction: t});
                if(!createRiwayatFase) newError(400, 'Create riwayat fase failed', 'createLepasSapih Service');
            }
                
            // Commit transaction
            await t.commit();

            return {
                status: 201,
                data: {
                    id_ternak: value.id_ternak,
                    createdAt: createRiwayatFase.dataValues.createdAt
                }
            }
        }catch(error){
            await t.rollback();
            return errorHandler(error);
        }
    }

    // Get lepas sapih
    getLepasSapih = async (req) => {
        try{
            // Get data fase lepas sapih
            const dataLepasSapih = await this.db.Fase.findOne({where: {fase: 'Lepas Sapih'}});
            if(!dataLepasSapih) newError(404, 'Data Fase Lepas Sapih not found', 'getLepasSapih Service');

            // Add params
            req.query.id_peternakan = req.dataAuth.id_peternakan;
            req.query.id_fp = dataLepasSapih.dataValues.id_fp;

            // Get ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                include: [
                    {
                        model: this.db.RiwayatFase,
                        as: 'riwayat_fase',
                        attributes: ['tanggal'],
                        where: {
                            id_fp: req.query.id_fp
                        },
                        required: false
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang'],
                        required: false
                    }
                ],
                where: req.query,
                order: [
                    ['updatedAt', 'DESC']
                ]
            });
            for(let i = 0; i < ternak.length; i++){
                ternak[i].dataValues.tanggal = ternak[i].dataValues.RiwayatFases.length > 0 ? ternak[i].dataValues.RiwayatFases[0].dataValues.tanggal : null;
                delete ternak[i].dataValues.RiwayatFases;
            }

        }catch(error){
            return errorHandler(error);
        }
    }

    // Seleksi ternak lepas sapih
    seleksiLepasSapih = async (req) => {
        const t = await this.db.sequelize.transaction();
        try{
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                status: joi.string().required(),
            })
            const {error, value} = schema.validate(req.body);
            if(error) newError(400, error.details[0].message, 'seleksiLepasSapih Service');

            // Check status
            if(value.status.toLowerCase() !== 'pejantan' || value.status.toLowerCase() !== 'betina' || value.status.toLowerCase() !== 'bakalan') newError(400, 'Status must be pejantan, betina, or bakalan', 'seleksiLepasSapih Service');

            // Get data status
            const dataStatus = await this.db.StatusTernak.findOne({where: {status_ternak: value.status}});
            if(!dataStatus) newError(404, `Data Status ${value.status} not found`, 'seleksiLepasSapih Service');

            // Get fase waiting list perkawinan
            const faseWaitingListPerkawinan = await this.db.Fase.findOne({where: {fase: 'Waiting List Perkawinan'}});
            if(!faseWaitingListPerkawinan) newError(404, 'Data Fase Waiting List Perkawinan not found', 'seleksiLepasSapih Service');

            // Get fase perkawinan
            const fasePerkawinan = await this.db.Fase.findOne({where: {fase: 'Perkawinan'}});
            if(!fasePerkawinan) newError(404, 'Data Fase Perkawinan not found', 'seleksiLepasSapih Service');

            let faseSeleksi;
            if(value.status.toLowerCase() === 'pejantan'){
                faseSeleksi = fasePerkawinan.dataValues.id_fp;
            }else if(value.status.toLowerCase() === 'betina'){
                faseSeleksi = faseWaitingListPerkawinan.dataValues.id_fp;
            }else if(value.status.toLowerCase() === 'bakalan'){
                faseSeleksi = null
            }else{
                newError(400, 'Status must be pejantan, betina, or bakalan', 'seleksiLepasSapih Service');
            }
            // Update status ternak
            const updateStatusTernak = await this.db.Ternak.update({
                id_status_ternak: dataStatus.dataValues.id_status_ternak,
                id_fp: faseSeleksi
            }, {
                where: {
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                },
                transaction: t
            });
            if(updateStatusTernak[0] <= 0) newError(400, 'Update status ternak failed', 'seleksiLepasSapih Service');

            // Create riwayat fase
            if(faseSeleksi){
                const createRiwayatFase = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_ternak,
                    id_fp: faseSeleksi,
                    tanggal: new Date()
                }, {transaction: t});
                if(!createRiwayatFase) newError(400, 'Create riwayat fase failed', 'seleksiLepasSapih Service');
            }

            // Commit
            await t.commit();

        }catch(error){
            await t.rollback();
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _lepasSapih(db);