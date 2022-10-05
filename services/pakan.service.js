// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const PakanModel = require('../models/pakan.model')(sequelize, DataTypes)

class _pakan{
    // get data pakan
    getPakan = async (req) => {
        try{
            // Query data
            // let query = 'SELECT * FROM d_pakan';
            // for (let i = 0; i < Object.keys(req.query).length; i++) {
            //    query += (i == 0) ? ` WHERE ` : ` AND `;
            //    query += Object.keys(req.query)[i] == 'id_pakan'
            //     ? `${Object.keys(req.query)[i]} = ${Object.values(req.query)[i]}`
            //     : `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'`;
            // }
            // const list = await this.db.query(query);
            const list = await PakanModel.findAll({where : req.query});
            if(list == null){
                return{
                    code: 404,
                    error: 'Data pakan not found'
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
            console.error('getPakan Pakan Service Error: ', error);
            return {
                code : 500,
                error
            }
        }
    }

    // Create new Pakan
    createPakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_pakan: joi.string().required(),
                jenis_pakan: joi.string().required(),
                komposisi: joi.string().required(),
                stok: joi.number().required(),
                satuan: joi.string().required(),
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
            // const add = await this.db.query('INSERT INTO d_pakan (nama_pakan, deskripsi, komposisi, jumlah) VALUES (?, ?, ?, ?)', 
            // [
            //     value.nama_pakan, 
            //     value.deskripsi, 
            //     value.komposisi, 
            //     value.jumlah
            // ]);
            const add = await PakanModel.create({
                nama_pakan: value.nama_pakan, 
                jenis_pakan: value.jenis_pakan,
                komposisi: value.komposisi,
                stok: value.stok,
                satuan: value.satuan,
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Failed to create new pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: add.id_pakan,
                    nama_pakan: add.nama_pakan,
                    createdAt : date.format(add.createdAt, 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('createPakan pakan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Update Pakan
    updatePakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
                nama_pakan: joi.string().required(),
                jenis_pakan: joi.string().required(),
                komposisi: joi.string().required(),
                stok: joi.number().required(),
                satuan: joi.string().required(),
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
            // const update = await this.db.query('UPDATE d_pakan SET nama_pakan = ?, deskripsi = ?, komposisi = ?, jumlah = ? WHERE id_pakan = ?', 
            // [
            //     value.nama_pakan, 
            //     value.deskripsi, 
            //     value.komposisi, 
            //     value.jumlah, 
            //     value.id_pakan, 
            // ]);
            const update = await PakanModel.update({
                nama_pakan: value.nama_pakan,
                jenis_pakan: value.deskripsi,
                komposisi: value.komposisi,
                stok: value.jumlah,
                satuan: value.satuan,
            }, {
                where: {
                    id_pakan: value.id_pakan
                }
            });
            if(update <= 0){
                return{
                    code: 400,
                    error: `Failed to update pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: value.id_pakan,
                    nama_pakan: value.nama_pakan,
                    updatedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('updatePakan pakan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Delete Pakan
    deletePakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_pakan: joi.number().required(),
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
            // const del = await this.db.query('DELETE FROM d_pakan WHERE id_pakan = ?', 
            // [
            //     value.id_pakan
            // ]);
            const del = await PakanModel.destroy({
                where: {
                    id_pakan: value.id_pakan
                }
            });
            if(del <= 0){
                return{
                    code: 400,
                    error: `Failed to delete pakan`
                }
            }

            return {
                code: 200,
                data: {
                    id_pakan: value.id_pakan,
                    deletedAt : date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error) {
            console.error('deletePakan pakan service Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = new _pakan();