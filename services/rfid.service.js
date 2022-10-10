// Helper databse yang dibuat
const joi = require('joi');
const db = require('../models');

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

            console.log(value.rf_id);

            const checkTernak = await db.Ternak.findOne({
                where: {
                    rf_id: value.rf_id,
                },
            });
            if (!checkTernak) {
                const add = await db.Ternak.create({
                    rf_id: value.rf_id,
                });
                if(!add){
                    return {
                        code: 500,
                        error: 'Internal Server Error'
                    }
                }
                return {
                    code: 200,
                    data: {
                        add,
                    },
                };
            }
            return {
                code: 200,
                data: add,
            };

        } catch (error) {
            console.error('rfid Rfid Service Error: ', error);
            return {
                code: 500,
                error,
            };
        }
    }
}

module.exports = new _rfid();