const {log_error} = require('../utils/logging');
const {Op} = require('sequelize');

class _mobileDash{
    constructor(db){
        this.db = db;
    }
    /// Get Data total ternak
    getTotalTernak = async (req) => {
        try{
            // Get id fase pemasukan
            const idFasePemasukan = await this.db.Fase.findOne({
                attributes: ['id_fp'],
                where: {
                    fase: 'Pemasukan'
                }
            });
            if(!idFasePemasukan){
                log_error('getTotalTernak', 'Fase Pemasukan not found');
                return {
                    code: 500,
                    error: `Something went wrong, fase pemasukan not found`
                }
            }

            // Get total ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: {
                        [Op.not] : idFasePemasukan.dataValues.id_fp,
                        [Op.not] : null
                    },
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
                error: 'Internal Server Error'
            }
        }
    }

    /// Get Data total ternak by status
    getTotalTernakByStatus = async (req) => {
        try{
            // Get status id cempe
            const statusCempe = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Cempe'
                }
            });
            if(!statusCempe){
                return {
                    code: 404,
                    error: 'Status ternak Cempe tidak ditemukan'
                }
            }

            // Get status id pejantan
            const statusPejantan = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Pejantan'
                }
            });
            if(!statusPejantan){
                return {
                    code: 404,
                    error: 'Status ternak Pejantan tidak ditemukan'
                }
            }

            // Get status id indukan
            const statusIndukan = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Indukan'
                }
            });
            if(!statusIndukan){
                return {
                    code: 404,
                    error: 'Status ternak Indukan tidak ditemukan'
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
                    jenis_kelamin: 'Jantan',
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
                    jenis_kelamin: 'Betina',
                    status_keluar: null
                }
            });

            // Get total ternak cempe jantan
            const totalTernakCempeJantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusCempe.dataValues.id_status_ternak,
                    jenis_kelamin: 'Jantan',
                    status_keluar: null
                }
            });

            // Get total ternak cempe betina
            const totalTernakCempeBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusCempe.dataValues.id_status_ternak,
                    jenis_kelamin: 'Betina',
                    status_keluar: null
                }
            });

            return {
                code: 200,
                data: {
                    total_ternak: totalTernakJantan + totalTernakBetina,
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
                error: 'Internal Server Error'
            }
        }
    }

    /// Get total ternak by fase
    getTotalTernakByFase = async (req) => {
        try{
            // Get data fase
            const fase = await this.db.Fase.findAll({});
            if(fase == null){
                return {
                    code: 404,
                    error: 'Fase Ternak Not Found'
                }
            }

            // Get ternak fase pemasukan
            const ternakFasePemasukan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: null,
                    status_keluar: null
                }
            });

            // Get total ternak by fase
            let totalTernakByFase = [];
            totalTernakByFase.push({
                fase: 'Pemasukan',
                total_ternak: ternakFasePemasukan
            })
            totalTernakByFase.push({
                fase: 'Adaptasi',
                total_ternak: 0
            });
            totalTernakByFase.push({
                fase: 'Perkawinan',
                total_ternak: 0
            });
            for(let i = 0; i < fase.length; i++){
                const totalTernak = await this.db.Ternak.count({
                    where: {
                        id_peternakan: req.dataAuth.id_peternakan,
                        id_fp: fase[i].dataValues.id_fp,
                        status_keluar: null
                    }
                });

                if(fase[i].dataValues.fase.toLowerCase().startsWith('Adaptasi')){
                    totalTernakByFase[1].total_ternak += totalTernak;
                }else if(fase[i].dataValues.fase.toLowerCase().includes('Perkawinan')){
                    totalTernakByFase[2].total_ternak += totalTernak;
                }else{
                    totalTernakByFase.push({
                        fase: fase[i].dataValues.fase,
                        total_ternak: totalTernak
                    });
                }
            }

            return {
                code: 200,
                data: totalTernakByFase
            }

        }catch(error){
            log_error(error);
            return {
                code: 500,
                error: 'Internal Server Error'
            }
        }
    }
}

module.exports = (db) => new _mobileDash(db);