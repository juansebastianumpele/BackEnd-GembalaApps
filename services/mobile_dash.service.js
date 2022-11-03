// Helper databse yang dibuat
const {log_error} = require('../utils/logging');

class _mobileDash{
    constructor(db){
        this.db = db;
    }
    // Get Data total ternak
    getTotalTernak = async (req) => {
        try{
            // Get total ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: null
                }
            });
            const totalTernak = ternak.length;

            // Get total kandang
            const totalKandang = await this.db.Kandang.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });

            // Get total ternak sakit
            const ternakSakit = await this.db.RiwayatKesehatan.findAll({
                attributes: [
                    [this.db.Sequelize.fn('DISTINCT', this.db.Sequelize.col('id_ternak')), 'id_ternak']
                ],
                where: {
                    tanggal_sembuh: null
                }
            });
            let totalTernakSakit = 0;
            for(let i = 0; i < ternak.length; i++){
                for(let j = 0; j < ternakSakit.length; j++){
                    if(ternak[i].id_ternak == ternakSakit[j].id_ternak){
                        totalTernakSakit++;
                    }
                }
            }

            // Get total ternak sehat
            const totalTernakSehat = totalTernak - totalTernakSakit;

            return {
                code: 200,
                data: {
                    total_ternak: totalTernak,
                    total_kandang: totalKandang,
                    total_ternak_sakit: totalTernakSakit,
                    total_ternak_sehat: totalTernakSehat
                }
            }
        }catch(error){
            log_error(error);
            return {
                code: 500,
                message: 'Internal Server Error'
            }
        }
    }

    // Get Data total ternak by status
    getTotalTernakByStatus = async (req) => {
        try{
            // Get total ternak
            const totalTernak = await this.db.Ternak.count({
                attributes: ['id_ternak'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: null
                }
            });

            // Get status id cempe
            const statusCempe = await this.db.Status.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Cempe'
                }
            });
            if(!statusCempe){
                return {
                    status: 404,
                    message: 'Status Cempe tidak ditemukan'
                }
            }

            // Get status is pejantan
            const statusPejantan = await this.db.Status.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Pejantan'
                }
            });
            if(!statusPejantan){
                return {
                    status: 404,
                    message: 'Status Pejantan tidak ditemukan'
                }
            }

            // Get status is indukan
            const statusIndukan = await this.db.Status.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Indukan'
                }
            });
            if(!statusIndukan){
                return {
                    status: 404,
                    message: 'Status Indukan tidak ditemukan'
                }
            }

            // Get total ternak pejantan
            const totalTernakPejantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusPejantan.dataValues.id_status_ternak,
                    status_keluar: null
                }
            });

            // Get total ternak jantan
            const totalTernakJantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'jantan',
                    status_keluar: null
                }
            });

            // Get total ternak indukan
            const totalTernakIndukan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusIndukan.dataValues.id_status_ternak,
                    status_keluar: null
                }
            });

            // Get total ternak betina
            const totalTernakBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'betina',
                    status_keluar: null
                }
            });

            // Get total ternak cempe jantan
            const totalTernakCempeJantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusCempe.dataValues.id_status_ternak,
                    jenis_kelamin: 'jantan',
                    status_keluar: null
                }
            });

            // Get total ternak cempe betina
            const totalTernakCempeBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusCempe.dataValues.id_status_ternak,
                    jenis_kelamin: 'betina',
                    status_keluar: null
                }
            });

            return {
                code: 200,
                data: {
                    total_ternak: totalTernak,
                    total_ternak_pejantan: totalTernakPejantan,
                    total_ternak_jantan: totalTernakJantan,
                    total_ternak_indukan: totalTernakIndukan,
                    total_ternak_betina: totalTernakBetina,
                    total_ternak_cempe_jantan: totalTernakCempeJantan,
                    total_ternak_cempe_betina: totalTernakCempeBetina
                }
            }
        }catch(error){
            log_error(error);
            return {
                code: 500,
                message: 'Internal Server Error'
            }
        }
    }
}

module.exports = (db) => new _mobileDash(db);