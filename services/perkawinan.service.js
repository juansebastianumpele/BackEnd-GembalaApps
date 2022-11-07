// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { Op } = require('sequelize');
const { log_error } = require('../utils/logging');

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