// Helper databse yang dibuat
const joi = require('joi');
const {log_error, log_info} = require('../utils/logging')
const createRiwayatFase = require('./riwayat_fase.service');

class _rfid{
    constructor(db){
        this.db = db;
    }
    // Get data rfid
    rfid = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                rf_id: joi.string().required(),
                id_peternakan: joi.number().required(),
                jenis_ternak_baru: joi.string().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Get data jenia ternak cempe
            const jenisTernak = await this.db.JenisTernak.findOne({
                where: {
                    jenis_ternak: "cempe"
                }
            });

            // Check Ternak
            const checkTernak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                where: {
                    rf_id: value.rf_id,
                    id_peternakan: value.id_peternakan
                }
            })
            if(checkTernak.length > 0){
                return{
                    code: 200,
                    data: {
                        message: "Ternak Already Exist",
                        id_ternak: checkTernak[0].id_ternak
                    }
                }
            }

            
            // Get data fase pemasukan
            const idFasePemasukan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: "Pemasukan"
                }
            });
            if(!idFasePemasukan){
                return{
                    code: 500,
                    error: "Something went wrong, data fase not found"
                }
            }

            // Get data fase Kelahiran
            const idFaseKelahiran = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: "Kelahiran"
                }
            });
            if(!idFaseKelahiran){
                return{
                    code: 500,
                    error: "Something went wrong, data fase not found"
                }
            }
            
            // Add New Ternak
            const addTernak = await this.db.Ternak.create({
                rf_id: value.rf_id,
                id_peternakan: value.id_peternakan,
                id_jenis_ternak: value.jenis_ternak_baru.toLowerCase() == "kelahiran" ? (jenisTernak ? jenisTernak.dataValues.id_jenis_ternak : null) : null,
                id_fp: value.jenis_ternak_baru.toLowerCase() == "kelahiran" ? idFaseKelahiran.dataValues.id_fp : idFasePemasukan.dataValues.id_fp,
            })

            // Create riwayat fase
            const riwayatFase = await createRiwayatFase(this.db, req, {
                id_ternak: addTernak.id_ternak,
                id_fp: addTernak.id_fp,
                id_peternakan: value.id_peternakan
            });
            if(!riwayatFase){
                return{
                    code: 500,
                    error: "Something went wrong, data riwayat fase not found"
                }
            }

            return{
                code: 200,
                data: {
                    message: "Ternak Added",
                    id_ternak: addTernak.id_ternak
                }
            }


        } catch (error) {
            log_error('RFID Service', error)
            return {
                code: 500,
                error,
            };
        }
    }

    // RFID Get data ternak
    rfidGetTernak = async (req) =>{
        try{
            const schema = joi.object({
                rf_id: joi.string().required(),
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
            const list = await this.db.Ternak.findOne({
                attributes : ['id_ternak', 
                'rf_id', 
                'image', 
                'jenis_kelamin', 
                'id_dam', 
                'id_sire', 
                'tanggal_lahir',
                'tanggal_masuk', 
                'tanggal_keluar', 
                'status_keluar', 
                'createdAt', 
                'updatedAt'],
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang', 'id_jenis_kandang', 'persentase_kebutuhan_pakan', 'id_jenis_pakan'],
                        include: [
                            {
                                model: this.db.JenisKandang,
                                as: 'jenis_kandang',
                                attributes: ['id_jenis_kandang', 'jenis_kandang']
                            },
                            {
                                model: this.db.JenisPakan,
                                as: 'jenis_pakan',
                                attributes: ['id_jenis_pakan', 'jenis_pakan']
                            }
                        ]
                    },
                    {
                        model: this.db.RiwayatKesehatan,
                        as: 'riwayat_kesehatan',
                        attributes: ['id_riwayat_kesehatan', 'id_penyakit', 'tanggal_sakit', 'tanggal_sembuh'],
                    },
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    },
                    {
                        model: this.db.StatusTernak,
                        as: 'status_ternak',
                        attributes: ['id_status_ternak', 'status_ternak']
                    },
                    {
                        model: this.db.JenisTernak,
                        as: 'jenis_ternak',
                        attributes: ['id_jenis_ternak', 'jenis_ternak']
                    },
                    {
                        model: this.db.Timbangan,
                        as: 'timbangan',
                        attributes: ['id_timbangan', 'berat']
                    },
                ],
                where : {
                    rf_id: value.rf_id
                }
            });
            
            if(!list){
                return{
                    code: 404,
                    error: 'Data Ternak not found'
                }
            }
            
            list.dataValues.penyakit = (list.riwayat_kesehatan.filter(item => item.tanggal_sembuh == null))
            list.dataValues.status_kesehatan = list.dataValues.penyakit.length > 0 ? 'Sakit' : "Sehat";
            list.dataValues.umur = Math.round(list.dataValues.umur / 30);
            list.dataValues.kebutuhan_pakan = ((list.dataValues.timbangan.length > 0 
                ? list.dataValues.timbangan[list.dataValues.timbangan.length - 1].dataValues.berat 
                : 0) * ((list.dataValues.kandang && list.dataValues.kandang.persentase_kebutuhan_pakan 
                    ? list.dataValues.kandang.persentase_kebutuhan_pakan 
                    : 0)/100)).toFixed(2);
            const umurHari =  list.dataValues.tanggal_lahir ? Math.round((new Date() - new Date(list.dataValues.tanggal_lahir))/(1000*60*60*24)) : 0;
            list.dataValues.umur = `${Math.floor(umurHari/30)} bulan ${umurHari%30} hari`;
            delete list.dataValues.riwayat_kesehatan;
            delete list.dataValues.timbangan;

            return {
                code: 200,
                data: list
            };

        }catch(error){
            log_error('RFIDGetDataTernak Service', error)
            return {
                code: 500,
                error,
            };
        }
    }
}

module.exports = (db) => new _rfid(db);