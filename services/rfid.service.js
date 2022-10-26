// Helper databse yang dibuat
const joi = require('joi');
const {log_error, log_info} = require('../utils/logging')

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

            // Get data status ternak cempe
            const status = await this.db.Status.findOne({
                where: {
                    status_ternak: "cempe"
                }
            });

            // Check Ternak
            const checkTernak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                where: {
                    rf_id: value.rf_id,
                    id_user: value.id_peternakan
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

            // Add New Ternak
            const addTernak = await this.db.Ternak.create({
                rf_id: value.rf_id,
                id_user: value.id_peternakan,
                id_status_ternak: value.jenis_ternak_baru.toLowerCase() == "kelahiran" ? (status ? status.id_status_ternak : null) : null
            })

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

            const getTernak = await this.db.Ternak.findAll({
                attributes : ['id_ternak', 
                'rf_id', 
                'image', 
                'jenis_kelamin', 
                'id_dam', 
                'id_sire', 
                'berat', 
                'suhu', 
                'tanggal_lahir',
                [this.db.sequelize.fn('datediff', this.db.sequelize.fn('NOW'), this.db.sequelize.col('tanggal_lahir')), 'umur'],
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
                        attributes: ['id_kandang', 'kode_kandang', 'id_jenis_kandang', 'persentase_kebutuhan_pakan', 'id_jenis_pakan']
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
                        model: this.db.Status,
                        as: 'status',
                        attributes: ['id_status_ternak', 'status_ternak']
                    }
                ],
                where : {
                    rf_id: value.rf_id,
                }
            });

            if(getTernak == null){
                return {
                    code: 404,
                    error: 'Data Ternak not found'
                }
            }

            return {
                code: 200,
                data: {
                    total: getTernak.length,
                    getTernak
                }
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