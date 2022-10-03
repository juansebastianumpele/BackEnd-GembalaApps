// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');

class _kawin{
    constructor(db){
        this.db = db;
    }
    // List Ternak by id
    getKawin = async (req) => {
        try{
            // Query data
            let query = `
            SELECT
            d_kawin.id_ternak, 
            d_kawin.id_pemancek,  
            s_ternak.id_ternak AS id_cempe,
            d_kawin.tanggal_kawin
            FROM d_kawin
            LEFT JOIN s_ternak 
            ON d_kawin.id_ternak = s_ternak.id_induk 
            AND d_kawin.id_pemancek = s_ternak.id_pejantan`;
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                query += (i == 0) ? ` WHERE ` : ` AND `;
                query += `d_kawin.${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`;
            }
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data kawin not found'
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
            console.error('listKawinByIdUsers kawin service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Kawin
    createDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                tanggal_kawin: joi.date().required(),
                id_pemancek: joi.number().required()
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
            const add = await this.db.query('INSERT INTO d_kawin (id_ternak, tanggal_kawin, id_pemancek) VALUES (?, ?, ?)', 
            [
                value.id_ternak, 
                value.tanggal_kawin, 
                value.id_pemancek
            ]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: 'Failed to create new kawin'
                }
            }

            return {
                code: 200,
                data: {
                    id_kawin: add.insertId,
                    ...value,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createTernak ternak service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update ternak
    updateDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kawin: joi.number().required(),
                id_ternak: joi.number().required(),
                tanggal_kawin: joi.date().required(),
                id_pemancek: joi.number().required()
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
            const update = await this.db.query(
                `UPDATE d_kawin SET id_ternak = ?, tanggal_kawin = ?, id_pemancek = ? WHERE id_kawin = ?`,
                [
                    value.id_ternak, 
                    value.tanggal_kawin, 
                    value.id_pemancek, 
                    value.id_kawin
                ]);
            if(update.affectedRows <= 0){
                return{
                    code: 400,
                    error: 'Failed to update data kawin'
                }
            }

            return {
                code: 200,
                data: {
                    id_kawin: value.id_kawin,
                    ...value,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updateKawin kawin service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Kawin
    deleteDataKawin = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_kawin: joi.number().required(),
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
            const del = await this.db.query(`DELETE FROM d_kawin WHERE id_kawin = ?`, 
            [
                value.id_kawin, 
            ]);
            if(del.affectedRows <= 0){
                return{
                    code: 400,
                    error: 'Failed to delete data kawin'
                }
            }
            
            return {
                code: 200,
                data: {
                    id_kawin: value.id_kawin,
                    ...value,
                    deletedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deleteKawin kawin service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const kawinService = (db) => new _kawin(db);
module.exports = kawinService;