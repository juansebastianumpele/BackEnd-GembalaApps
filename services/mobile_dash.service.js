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

            // Get status
            const status = await this.db.Status.findAll({});
            if(status == null){
                return {
                    code: 404,
                    message: 'Status Ternak Pejantan Not Found'
                }
            }

            let id_pejantan;
            let id_indukan;
            let id_cempe;
            for(let i = 0; i < status.length; i++){
                if(status[i].dataValues.status_ternak == 'pejantan'){
                    id_pejantan = status[i].dataValues.id_status_ternak;
                }else if(status[i].dataValues.status_ternak == 'indukan'){
                    id_indukan = status[i].dataValues.id_status_ternak;
                }else if(status[i].dataValues.status_ternak == 'cempe'){
                    id_cempe = status[i].dataValues.id_status_ternak;
                }
            }

            // Get total ternak pejantan
            const totalTernakPejantan = await this.db.Ternak.count({
                where: {
                    id_user: req.dataAuth.id_peternakan,
                    id_status_ternak: id_pejantan,
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
                    id_status_ternak: id_indukan,
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
                    id_status_ternak: id_cempe,
                    jenis_kelamin: 'jantan',
                    status_keluar: null
                }
            });

            // Get total ternak cempe betina
            const totalTernakCempeBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: id_cempe,
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