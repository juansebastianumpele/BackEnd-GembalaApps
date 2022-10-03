// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
class _fase{
    constructor(db){
        this.db = db;
    }
    // Get Fase
    getFase = async (req) => {
        try{            
            // Query Data
            let query = 'SELECT * FROM d_fase_pemeliharaan';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_fase_pemeliharaan'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data fase not found'
                }
            }
            return {
                code : 200,
                data: {
                    total: list.length,
                    list
                },
            };
        }catch (error){
            console.error('listFase fase Service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new fase
    createFase = async (req) => {
        try {
            const schema = joi.object({
                fase: joi.string().required()
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const add = await this.db.query('INSERT INTO d_fase_pemeliharaan (fase) VALUES (?)', [value.fase]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to create fase`
                }
            }

            return {
                code : 200,
                data: {
                    id_fase_pemeliharaan: add.insertId,
                    fase: value.fase,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                },
            };
        }
        catch (error) {
            console.error('createFase fase service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update fase
    updateFase = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_fp: joi.number().required(),
                fase: joi.string().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const update = await this.db.query('UPDATE d_fase_pemeliharaan SET fase = ? WHERE id_fp = ?', [value.fase, value.id_fp]);
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to update fase`
                }
            }

            return {
                code: 200,
                data: {
                    id_fp: value.id_fp,
                    fase: value.fase,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                },
            };
        }
        catch (error) {
            console.error('updateFase fase service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete fase
    deleteFase = async (req) => {
        try {
            const schema = joi.object({
                id_fp: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            const del = await this.db.query('DELETE FROM d_fase_pemeliharaan WHERE id_fp = ?', [value.id_fp]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete fase`
                }
            }

            return {
                code: 200,
                data: {
                    id_fp: value.id_fp,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                },
            };
        }
        catch (error) {
            console.error('deleteFase fase service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const faseService = (db) => new _fase(db);
module.exports = faseService;