// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
class _kandang{
    constructor(db){
        this.db = db;
    }
    // Get Kandang
    getKandang = async (req) => {
        try{
            // Query data
            let query = `
            SELECT 
            d_kandang.id_kandang, 
            d_kandang.nama_kandang, 
            d_blok_kandang.blok
            FROM d_kandang 
            LEFT JOIN d_blok_kandang 
            ON d_kandang.id_blok = d_blok_kandang.id_blok`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE d_kandang.` : ` AND d_kandang.`;
                query += Object.keys(req.query)[i] == 'id_kandang'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data kandang not found'
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
            console.error('GetKandang Kandang Service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new kandang
    createKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_kandang: joi.string().required(),
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
            const add = await this.db.query(`INSERT INTO d_kandang (nama_kandang, id_blok) VALUES (?, ?)`, 
            [
                value.nama_kandang, 
                value.id_blok
            ]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to create kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_kandang: add.insertId,
                    nama_kandang: value.nama_kandang,
                    id_blok: value.id_blok,
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

    // Update kandang
    updateKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
                nama_kandang: joi.string().required(),
                id_blok: joi.number().required()
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
            const update = await this.db.query('UPDATE d_kandang SET nama_kandang = ?, id_blok = ? WHERE id_kandang = ?', 
            [
                value.nama_kandang, 
                value.id_blok, 
                value.id_kandang, 
            ]);
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to update kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_kandang: value.id_kandang,
                    nama_kandang: value.nama_kandang,
                    id_blok: value.id_blok,
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

    // Delete kandang
    deleteKandang = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kandang: joi.number().required(),
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
            const del = await this.db.query('DELETE FROM d_kandang WHERE id_kandang = ?', 
            [
                value.id_kandang
            ]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete kandang`
                }
            }
            
            return {
                code : 200,
                data: {
                    id_kandang: value.id_kandang,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteKandang kandang service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }
}

const kandangService = (db) => new _kandang(db);
module.exports = kandangService;