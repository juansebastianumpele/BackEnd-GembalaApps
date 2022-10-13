// Helper databse yang dibuat
const joi = require('joi');
const db = require('../models');
const {log_error, log_info} = require('../utils/logging')

class _rfid{
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

            const [ternak, created] = await db.Ternak.findOrCreate({
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

            const getTernak = await db.Ternak.findOne({
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
                [db.sequelize.fn('datediff', db.sequelize.fn('NOW'), db.sequelize.col('tanggal_lahir')), 'umur'],
                'tanggal_masuk', 
                'tanggal_keluar', 
                'status_keluar', 
                'createdAt', 
                'updatedAt'],
                include: [
                    {
                        model: db.Varietas,
                        as: 'varietas',
                        attributes: ['id_varietas', 'varietas']
                    },
                    {
                        model: db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang', 'jenis_kandang']
                    },
                    {
                        model: db.Penyakit,
                        as: 'penyakit',
                        attributes: ['id_penyakit', 'nama_penyakit']
                    },
                    {
                        model: db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    },
                    {
                        model: db.Pakan,
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

module.exports = new _rfid();