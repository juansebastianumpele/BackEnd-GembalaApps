// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
class _blokKandang{
    constructor(db){
        this.db = db;
    }
    // Get Blok Kandang
    getBlokKandang = async (req) => {
        try{
            // Query data
            let query = `SELECT * FROM d_blok_kandang`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_blok_kandang' 
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}` 
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data blok kandang not found'
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
            console.error('GetKandang Blok Kandang Service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new blok kandang
    createBlokKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                blok: joi.string().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const add = await this.db.query('INSERT INTO d_blok_kandang (blok) VALUES (?)', [value.blok]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to create blok kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_blok_kandang: add.insertId,
                    blok: value.blok,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createKandang kandang service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Update blok kandang
    updateBlokKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_blok: joi.number().required(),
                blok: joi.string().required()
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const update = await this.db.query('UPDATE d_blok_kandang SET blok = ? WHERE id_blok = ?', [value.blok, value.id_blok]);
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to update blok kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_blok: value.id_blok,
                    blok: value.blok,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateKandang kandang service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Delete blok kandang
    deleteBlokKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_blok: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    code: 400,
                    error: errorDetails
                }
            }

            // Query data
            const del = await this.db.query('DELETE FROM d_blok_kandang WHERE id_blok = ?', [value.id_blok]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete blok kandang`
                }
            }
            
            return {
                code : 200,
                data: {
                    id_blok: value.id_blok,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteKandang kandang service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const blokKandangService = (db) => new _blokKandang(db);

module.exports = blokKandangService;