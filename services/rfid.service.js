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
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            const [ternak, created] = await this.db.Ternak.findOrCreate({
                where: {
                    rf_id: value.rf_id,
                },
                defaults: {
                    rf_id: value.rf_id,
                },
            });

            if(created){
                log_info('RFID Service', 'Ternak baru ditambahkan')
            }else{
                log_info('RFID Service', 'Ternak sudah ada');
            }

            const getTernak = await this.db.Ternak.findOne({
                attributes : ['id_ternak', 
                'rf_id', 
                'foto', 
                'jenis_kelamin', 
                'id_induk', 
                'id_pejantan', 
                'berat', 
                'suhu', 
                'status_kesehatan', 
                'tanggal_lahir',
                [this.db.sequelize.fn('datediff', this.db.sequelize.fn('NOW'), this.db.sequelize.col('tanggal_lahir')), 'umur'],
                'tanggal_masuk', 
                'tanggal_keluar', 
                'status_keluar', 
                'createdAt', 
                'updatedAt'],
                include: [
                    {
                        model: this.db.Varietas,
                        as: 'varietas',
                        attributes: ['id_varietas', 'varietas']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang', 'jenis_kandang']
                    },
                    {
                        model: this.db.Penyakit,
                        as: 'penyakit',
                        attributes: ['id_penyakit', 'nama_penyakit']
                    },
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    },
                    {
                        model: this.db.Pakan,
                        as: 'pakan',
                        attributes: ['id_pakan', 'nama_pakan']
                    }
                ],
                where : {
                    rf_id: value.rf_id,
                }
            });

            if(getTernak == null){
                return {
                    code: 500,
                    error: 'Internal Server Error'
                }
            }

            return {
                code: 200,
                data: getTernak,
            };


        } catch (error) {
            log_error('RFID Service', error)
            return {
                code: 500,
                error,
            };
        }
    }
}

module.exports = (db) => new _rfid(db);