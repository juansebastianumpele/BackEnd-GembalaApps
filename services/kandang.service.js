// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const KandangModel = require('../models/kandang.model')(sequelize, DataTypes)
class _kandang{
    // Get Kandang
    getKandang = async (req) => {
        try{
            // Query data
            // let query = `
            // SELECT 
            // d_kandang.id_kandang, 
            // d_kandang.nama_kandang, 
            // d_blok_kandang.blok
            // FROM d_kandang 
            // LEFT JOIN d_blok_kandang 
            // ON d_kandang.id_blok = d_blok_kandang.id_blok`;
            // for (let i = 0; i < Object.keys(req.query).length; i++) {
            //     query += (i == 0) ? ` WHERE d_kandang.` : ` AND d_kandang.`;
            //     query += Object.keys(req.query)[i] == 'id_kandang'
            //     ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
            //     : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            // }
            // const list = await this.db.query(query);
            const list = await KandangModel.findAll({where : req.query});
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
                kode_kandang: joi.string().required(),
                jenis_kandang: joi.string().required(),
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
            // const add = await this.db.query(`INSERT INTO d_kandang (nama_kandang, id_blok) VALUES (?, ?)`, 
            // [
            //     value.nama_kandang, 
            //     value.id_blok
            // ]);
            const add = await KandangModel.create({
                kode_kandang: value.kode_kandang,
                jenis_kandang: value.jenis_kandang
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_kandang: add.id_kandang,
                    kode_kandang: add.kode_kandang,
                    jenis_kandang: add.jenis_kandang,
                    createdAt: date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
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
                kode_kandang: joi.string().required(),
                jenis_kandang: joi.string().required(),
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
            // const update = await this.db.query('UPDATE d_kandang SET nama_kandang = ?, id_blok = ? WHERE id_kandang = ?', 
            // [
            //     value.nama_kandang, 
            //     value.id_blok, 
            //     value.id_kandang, 
            // ]);
            const update = await KandangModel.update({
                kode_kandang: value.kode_kandang,
                jenis_kandang: value.jenis_kandang
            }, {
                where: {
                    id_kandang: value.id_kandang
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update kandang`
                }
            }

            return {
                code : 200,
                data: {
                    id_kandang: value.id_kandang,
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
            const del = await KandangModel.destroy({
                where: {
                    id_kandang: value.id_kandang
                }
            });
            if(del <= 0){
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

module.exports = new _kandang();