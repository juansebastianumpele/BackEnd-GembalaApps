// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _ternakForSale{
    // Get Data Ternak
    getTernak = async (req) => {
        try{
            // Query Data
            let query =  `
            SELECT * FROM d_ternak_for_sale
            `;
            
            for(let i = 0; i < Object.keys(req.query).length; i++){
                query += (i === 0) ? ` WHERE` : ` AND`;
                query += ` ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }

            const list = await mysql.query(query);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data ternak tidak ditemukan'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Get My Ternak
    getMyTernak = async (req) => {
        try{            
            // Query Data
            let query = `SELECT * WHERE d_ternak_for_sale.id_users=?`;

            for(let i = 0; i < Object.keys(req.query).length; i++){
                query += ` AND ${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }

            const list = await mysql.query(query, [req.dataAuth.id_users]);
            if(list.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data ternak tidak ditemukan'
                }
            }

            return {
                status: true,
                total: list.length,
                data: list,
            };
        }catch (error){
            console.error('getMyTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Create new Ternak
    createTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                harga_per: joi.string().required(),
                harga: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query Data
            const add = await mysql.query(
                `INSERT INTO d_ternak_for_sale (id_ternak, id_users, harga_per, harga) VALUES (?, ?, ?, ?)`,
                [req.body.id_ternak, req.dataAuth.id_users, req.body.harga_per, req.body.harga]
            );
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menambahkan data ternak`
                }
            }

            return {
                status: true,
                message: 'Data ternak berhasil ditambahkan',
            };
        }
        catch (error) {
            console.error('createTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Update Ternak
    updateTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_ternak_for_sale: joi.number().required(),
                id_ternak: joi.number().required(),
                harga_per: joi.string().required(),
                harga: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }
            const update = await mysql.query(`UPDATE d_ternak_for_sale SET id_ternak=?, harga_per=?, harga=? WHERE id_ternak_for_sale=? AND id_users=?`,
                [req.body.id_ternak, req.body.harga_per, req.body.harga, req.body.id_ternak_for_sale, req.dataAuth.id_users]
            );
            console.log(`update`, update);
            if(update.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal mengubah data ternak`
                }
            }

            return {
                status: true,
                message: 'Data ternak berhasil diubah',
            };
        }
        catch (error) {
            console.error('updateTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Delete Ternak
    deleteTernak = async (req) => {
        try {
            // Validate Data
            const schema = joi.object({
                id_ternak_for_sale: joi.number().required(),
            });

            const {error, value} = schema.validate(req.body);
            if(error){
                const errorDetails = error.details.map(i => i.message).join(',');
                return{
                    status: false,
                    code: 400,
                    error: errorDetails
                }
            }

            // Query Data
            const del = await mysql.query('DELETE FROM d_ternak_for_sale WHERE id_ternak_for_sale = ? AND id_users', [req.body.id_ternak_for_sale, req.dataAuth.id_users]);
            if(del.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: `Gagal menghapus data ternak`
                }
            }
            
            return {
                status: true,
                message: 'Data ternak berhasil dihapus',
            };
        }
        catch (error) {
            console.error('deleteTernak ternak service Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _ternakForSale();