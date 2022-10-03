// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');

class _varietas{
    constructor(db){
        this.db = db;
    }
    // Get data varietas
    getVarietas = async (req) => {
        try{
            // Query data
            let query = 'SELECT id_varietas, nama_varietas FROM d_varietas';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_varietas'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await this.db.query(query, [req.dataAuth.id_users]);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data varietas not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            console.error('getVarietas Varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Varietas
    createVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_varietas: joi.string().required()
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
            const add = await this.db.query('INSERT INTO d_varietas (nama_varietas) VALUES (?)', 
            [
                value.nama_varietas
            ]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to create new varietas`
                }
            }

            return {
                code: 200,
                data: {
                    id_varietas: add.insertId,
                    nama_varietas: value.nama_varietas,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createVarietas varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update varietas
    updateVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_varietas: joi.number().required(),
                nama_varietas: joi.string().required()
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
            const update = await this.db.query('UPDATE d_varietas SET nama_varietas = ? WHERE id_varietas = ?', 
            [
                value.nama_varietas, 
                value.id_varietas
            ]);
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to update varietas`
                }
            }

            return {
                code: 200,
                data: {
                    id_varietas: value.id_varietas,
                    nama_varietas: value.nama_varietas,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateVarietas varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete varietas
    deleteVarietas = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_varietas: joi.number().required(),
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
            const del = await this.db.query('DELETE FROM d_varietas WHERE id_varietas = ?', 
            [
                value.id_varietas
            ]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete varietas`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_varietas: value.id_varietas,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteVarietas varietas service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const varietasService = (db) => new _varietas(db);
module.exports = varietasService;