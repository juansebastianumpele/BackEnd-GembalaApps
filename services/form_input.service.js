// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error} = require('../utils/logging');

class _formInput{
    constructor(db){
        this.db = db;
    }
    // Get Jenis Ternak
    getDataFormInput = async (req) => {
        try{
            // Get jenis ternak
            const jenisTernak = await this.db.JenisTernak.findAll({});
            if(jenisTernak.length <= 0){
                return{
                    code: 404,
                    error: 'Data janis ternak not found'
                }
            }

            // Get kode kandang
            const kodeKandang = await this.db.Kandang.findAll({
                attributes: ['id_kandang','kode_kandang'],
                include: [
                    {
                        model: this.db.JenisKandang,
                        as: 'jenis_kandang',
                        attributes: ['jenis_kandang']
                    }
                ],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(kodeKandang.length <= 0){
                return{
                    code: 404,
                    error: 'Data kode kandang not found'
                }
            }

            for(let i = 0; i < kodeKandang.length; i++){
                kodeKandang[i].dataValues.jenis_kandang = kodeKandang[i].dataValues.jenis_kandang.jenis_kandang;
            }

            // Get jenis pakan
            const jenisPakan = await this.db.JenisPakan.findAll({
                attributes: ['id_jenis_pakan','jenis_pakan'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(jenisPakan.length <= 0){
                return{
                    code: 404,
                    error: 'Data jenis pakan not found'
                }
            }

            // Get penyakit
            const penyakit = await this.db.Penyakit.findAll({
                attributes: ['id_penyakit','nama_penyakit'],
            });
            if(penyakit.length <= 0){
                return{
                    code: 404,
                    error: 'Data penyakit not found'
                }
            }

            // Get jenis kandang
            const jenisKandang = await this.db.JenisKandang.findAll({
                attributes: ['id_jenis_kandang','jenis_kandang']
            });
            if(jenisKandang.length <= 0){
                return{
                    code: 404,
                    error: 'Data jenis kandang not found'
                }
            }

            // Get bangsa
            const bangsa = await this.db.Bangsa.findAll({
                attributes: ['id_bangsa','bangsa']
            });
            if(bangsa.length <= 0){
                return{
                    code: 404,
                    error: 'Data bangsa not found'
                }
            }
            
            // Get jenis ternak indukan
            const jenisIndukan = await this.db.JenisTernak.findOne({
                where: {
                    jenis_ternak: 'Indukan'
                }
            });
            if(!jenisIndukan){
                return{
                    code: 404,
                    error: 'Data jenis ternak indukan not found'
                }
            }

            // Get jenis ternak pejantan
            const jenisPejantan = await this.db.JenisTernak.findOne({
                where: {
                    jenis_ternak: 'Pejantan'
                }
            });
            if(!jenisPejantan){
                return{
                    code: 404,
                    error: 'Data jenis ternak pejantan not found'
                }
            }

            // Get data indukan
            const indukan = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'betina',
                    id_jenis_ternak: jenisIndukan.dataValues.id_jenis_ternak
                }
            });
            if(indukan.length <= 0){
                return{
                    code: 404,
                    error: 'Data indukan not found'
                }
            }

            // Get data pejantan
            const pejantan = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'jantan',
                    id_jenis_ternak: jenisPejantan.dataValues.id_jenis_ternak
                }
            });
            if(pejantan.length <= 0){
                return{
                    code: 404,
                    error: 'Data pejantan not found'
                }
            }

            return {
                code: 200,
                data: {
                    jenis_ternak: jenisTernak,
                    kode_kandang: kodeKandang,
                    jenis_pakan: jenisPakan,
                    penyakit: penyakit,
                    jenis_kandang: jenisKandang,
                    bangsa: bangsa,
                    indukan: indukan,
                    pejantan: pejantan
                }
            }

        }catch (error){
            log_error('getDataInput Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _formInput(db);