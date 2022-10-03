// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');

class _penyakit{
    constructor(db){
        this.db = db;
    }
    // Get Data Penyakit
    getPenyakit = async (req) => {
        try{
            // Query data
            let query = 'SELECT * FROM d_penyakit';
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += Object.keys(req.query)[i] == 'id_penyakit'
                ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
                : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            }
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data penyakit not found'
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
            console.error('getPenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Penyakit
    createPenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri_penyakit: joi.string().required(),
                pengobatan: joi.string().required(),
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
            const add = await this.db.query('INSERT INTO d_penyakit (nama_penyakit, deskripsi, ciri_penyakit, pengobatan) VALUES (?, ?, ?, ?)', 
            [
                value.nama_penyakit, 
                value.deskripsi, 
                value.ciri_penyakit, 
                value.pengobatan
            ]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to create penyakit`
                }
            }
            return {
                code: 200,
                data: {
                    id_penyakit: add.insertId,
                    nama_penyakit: value.nama_penyakit,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createPenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Penyakit
    updatePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
                nama_penyakit: joi.string().required(),
                deskripsi: joi.string().required(),
                ciri_penyakit: joi.string().required(),
                pengobatan: joi.string().required()
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
            const update = await this.db.query('UPDATE d_penyakit SET nama_penyakit = ?, deskripsi = ?, ciri_penyakit = ?, pengobatan = ? WHERE id_penyakit = ?', 
            [
                value.nama_penyakit, 
                value.deskripsi, 
                value.ciri_penyakit, 
                value.pengobatan, 
                value.id_penyakit, 
            ]);
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to update penyakit`
                }
            }

            return {
                code: 200,
                data: {
                    id_penyakit: value.id_penyakit,
                    nama_penyakit: value.nama_penyakit,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updatePenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Penyakit
    deletePenyakit = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_penyakit: joi.number().required(),
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    error: errorDetails,
                }
            }

            // Query data
            const del = await this.db.query('DELETE FROM d_penyakit WHERE id_penyakit = ?', 
            [
                value.id_penyakit
            ]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: `Failed to delete penyakit`
                }
            }
            
            return {
                code: 200,
                data: {
                    id_penyakit: value.id_penyakit,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deletePenyakit penyakit service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const penyakitService = (db) => new _penyakit(db);
module.exports = penyakitService;