// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { Op } = require('sequelize');
const { log_error } = require('../utils/logging');
const createHistoryFase = require('./riwayat_fase.service');

class _perkawinan {
    constructor(db) {
        this.db = db;
    }
    // Get Ternak in waiting list perkawinan
    getTernakWaitingList = async (req) => {
        try {
            // Get data fase
            const dataFase = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: "Waiting List Perkawinan"
                }
            });
            if (!dataFase) {
                return {
                    code: 500,
                    error: 'Something went wrong, data fase not found'
                }
            }

            console.log(dataFase.dataValues.id_fp);

            // Get ternak in waiting list perkawinan
            const ternakWaitingList = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang','kode_kandang']
                    },
                    {
                        model: this.db.RiwayatFase,
                        as: 'riwayat_fase',
                        attributes: ['tanggal'],
                        where: {
                            id_fp: dataFase.dataValues.id_fp
                        },
                    }
                ],
                where: {
                    id_fp: dataFase.dataValues.id_fp,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if (ternakWaitingList.length <= 0) {
                return {
                    code: 404,
                    error: 'Data ternak waiting list not found'
                }
            }

            for(let i = 0; i < ternakWaitingList.length; i++){
                ternakWaitingList[i].dataValues.tanggal = ternakWaitingList[i].dataValues.riwayat_fase ? ternakWaitingList[i].dataValues.riwayat_fase[0].tanggal : null;
                delete ternakWaitingList[i].dataValues.riwayat_fase;
            }

            return {
                code: 200,
                data: ternakWaitingList
            }
        } catch (error) {
            log_error(req, error);
            return {
                code: 500,
                error: 'Internal server error'
            }
        }
    }

    // Create Process Perkawinan
    createPerkawinan = async (req) => {
        try{
            const schema = joi.object({
                id_indukan: joi.number().required(),
                id_pejantan: joi.number().required(),
                id_kandang: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                const detailMessage = error.details.map((i) => i.message).join(',');
                return {
                    code: 400,
                    error: detailMessage
                }
            }

            // Get data fase
            const dataFase = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: "Perkawinan"
                }
            });
            if(!dataFase){
                return {
                    code: 500,
                    error: 'Something went wrong, data fase not found'
                }
            }

            // Get data ternak indukan
            const dataIndukan = await this.db.Ternak.findOne({
                attributes: ['id_ternak','id_fp'],
                where: {
                    id_ternak: value.id_indukan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!dataIndukan){
                return {
                    code: 404,
                    error: 'Data ternak indukan not found'
                }
            }

            // Get data ternak pejantan
            const dataPejantan = await this.db.Ternak.findOne({
                attributes: ['id_ternak','id_fp', 'id_kandang'],
                where: {
                    id_ternak: value.id_pejantan,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!dataPejantan){
                return {
                    code: 404,
                    error: 'Data ternak pejantan not found'
                }
            }

            // Check ternak indukan and pejantan
            if(dataIndukan.dataValues.id_ternak == dataPejantan.dataValues.id_dam){
                return {
                    code: 400,
                    error: `Perkawinan tidak bisa dilakukan, ternak ${dataIndukan.dataValues.id_ternak} adalah 'Dam' ternak ${dataPejantan.dataValues.id_ternak}`
                }
            }else if(dataIndukan.dataValues.id_sire == dataPejantan.dataValues.id_ternak){
                return {
                    code: 400,
                    error: `Perkawinan tidak bisa dilakukan, ternak ${dataPejantan.dataValues.id_ternak} adalah 'Sire' ternak ${dataIndukan.dataValues.id_ternak}`
                }
            }

            // Create Perkawinan
            const createPerkawinan = await this.db.Perkawinan.create({
                id_indukan: dataIndukan.dataValues.id_ternak,
                id_pejantan: dataPejantan.dataValues.id_ternak,
                id_peternakan: req.dataAuth.id_peternakan,
                id_kandang: value.id_kandang,
                tanggal_perkawinan: new Date()
            });
            if(!createPerkawinan){
                return {
                    code: 500,
                    error: 'Something went wrong, create perkawinan failed'
                }
            }

            // Update ternak indukan
            const updateIndukan = await this.db.Ternak.update({
                id_fp: dataFase.dataValues.id_fp,
                id_kandang: dataPejantan.dataValues.id_kandang
            },{
                where: {
                    id_ternak: dataIndukan.dataValues.id_ternak
                }
            });
            if(!updateIndukan){
                return {
                    code: 500,
                    error: 'Something went wrong, update ternak indukan failed'
                }
            }

            // Create riwayat fase ternak indukan
            const historyFaseIndukan = await createHistoryFase(this.db, req, {
                id_ternak: dataIndukan.dataValues.id_ternak,
                id_fp: dataFase.dataValues.id_fp
            });
            if(!historyFaseIndukan){
                return {
                    code: 500,
                    error: 'Something went wrong, create history fase ternak indukan failed'
                }
            }

            return {
                code: 200,
                data: {
                    id_perkawinan: createPerkawinan.dataValues.id_perkawinan,
                    id_indukan: createPerkawinan.dataValues.id_indukan,
                    id_pejantan: createPerkawinan.dataValues.id_pejantan,
                    createdAt: createPerkawinan.dataValues.createdAt,
                }
            }

        }catch(error){
            log_error(req, error);
            return {
                code: 500,
                error: 'Internal server error'
            }
        }
    }
}

module.exports = (db) => new _perkawinan(db);