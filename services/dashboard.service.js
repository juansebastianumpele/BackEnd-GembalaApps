// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const db = require('../models');
const {log_error} = require('../utils/logging');

class _dashboard{

    // Get Data Populasi
    getPopulasi = async (req) => {
        try{
            const list = await db.Populasi.findAll({
                attributes : ['id_populasi', 'tanggal', 'populasi'],
                where : req.query
            });
            if(list.length <= 0){
                return {
                    code: 404,
                    error: 'Data Population not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: list.length,
                    list: list
                }
            }
        }
        catch(err){
            log_error('Populasi Service',err);
            return err;
        }
    }

    // Create Jumlah Populasi per hari
    createPopulasi = async () => {
        try {
            setInterval(async () => {
                const now = new Date();
                const tanggal = date.format(now, 'YYYY-MM-DD');
                const populasi = await db.Ternak.count({});
                const add = await db.Populasi.create({
                    tanggal: tanggal,
                    populasi: populasi
                });
            }, 1000 * 60 * 60 * 24);
        }catch (error){
            log_error('createPopulasi Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Get Data Status Kesehatan
    getStatusKesehatan = async (req) => {
        try{
            const sehat = await db.Ternak.count({
                where: {
                    status_kesehatan: 'Sehat'
                }
            });
            const sakit = await db.Ternak.count({
                where: {
                    status_kesehatan: 'Sakit'
                }
            });
            if(sehat <= 0 && sakit <= 0){
                return {
                    code: 404,
                    error: 'Data Status Kesehatan not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: sehat + sakit,
                    sehat: sehat,
                    sakit: sakit,
                }
            }
        }
        catch(err){
            log_error('Status Kesehatan Service',err);
            return err;
        }
    }
}

module.exports = new _dashboard();