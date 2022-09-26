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
                    error: 'Data ternak tidak ditemukan'
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
                    error: 'Data ternak tidak ditemukan'
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
                harga_per: joi.number().required(),
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

            if(req.body.harga_per === 'kg'){
                const berat = await mysql.query('SELECT berat_berkala FROM s_ternak WHERE id_ternak = ? AND id_users = ?', [req.body.id_ternak, req.dataAuth.id_users]);
                if(berat.length <= 0){
                    return{
                        status: false,
                        code: 404,
                        error: 'Data ternak tidak ditemukan'
                    }
                }
                req.body.harga_total = req.body.harga * berat;
            } else if(req.body.harga_per === 'ekor'){
                req.body.harga_total = req.body.harga;
            } else {
                return{
                    status: false,
                    code: 400,
                    error: 'Satuan harga tidak valid'
                }
            }

            // Query Data
            const add = await mysql.query(
                `INSERT INTO d_ternak_for_sale (id_ternak, id_users, harga_per, harga, harga_total) VALUES (?, ?, ?, ?, ?)`,
                [req.body.id_ternak, req.dataAuth.id_users, req.body.harga_per, req.body.harga, req.body.harga_total]
            );

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
                harga_per: joi.number().required(),
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

            if(req.body.harga_per === 'kg'){
                const berat = await mysql.query('SELECT berat_berkala FROM s_ternak WHERE id_ternak = ? AND id_users = ?', [req.body.id_ternak, req.dataAuth.id_users]);
                if(berat.length <= 0){
                    return{
                        status: false,
                        code: 404,
                        error: 'Data ternak tidak ditemukan'
                    }
                }
                req.body.harga_total = req.body.harga * berat;
            } else if(req.body.harga_per === 'ekor'){
                req.body.harga_total = req.body.harga;
            } else {
                return{
                    status: false,
                    code: 400,
                    error: 'Satuan harga tidak valid'
                }
            }

            const update = await mysql.query(
                `UPDATE d_ternak_for_sale SET id_ternak=?, harga_per=?, harga=?, harga_total = ? WHERE id_ternak_for_sale=? AND id_users=?`
                [req.body.id_ternak, req.body.harga_per, req.body.harga, req.body.harga_total, req.body.id_ternak_for_sale, req.dataAuth.id_users]
            );

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