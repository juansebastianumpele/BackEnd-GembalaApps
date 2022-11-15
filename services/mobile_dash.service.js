const {Op} = require('sequelize');
const {newError, errorHandler} = require('../utils/errorHandler');

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
            if(!idFasePemasukan) newError(404, 'Fase Pemasukan not found');

            // Get total ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: {
                        [Op.not] : idFasePemasukan.dataValues.id_fp,
                        [Op.not] : null
                    },
                    id_status_ternak: {
                        [Op.not]: null
                    },
                    jenis_kelamin: {
                        [Op.not]: null
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
            return errorHandler(error);
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
            if(!statusCempe) newError(404, 'Status Cempe not found');

            // Get status id pejantan
            const statusPejantan = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Pejantan'
                }
            });
            if(!statusPejantan) newError(404, 'Status Pejantan not found');

            // Get status id indukan
            const statusIndukan = await this.db.StatusTernak.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'Indukan'
                }
            });
            if(!statusIndukan) newError(404, 'Status Indukan not found');

            // Get total ternak pejantan
            const totalTernakPejantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusPejantan.dataValues.id_status_ternak,
                    jenis_kelamin: "Jantan",
                    status_keluar: null
                }
            });

            // Get total ternak jantan
            const totalTernakJantan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: {
                        [Op.not]: null
                    },
                    jenis_kelamin: 'Jantan',
                    status_keluar: null
                }
            });

            // Get total ternak indukan
            const totalTernakIndukan = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusIndukan.dataValues.id_status_ternak,
                    jenis_kelamin: "Betina",
                    status_keluar: null
                }
            });

            // Get total ternak betina
            const totalTernakBetina = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: {
                        [Op.not]: null
                    },
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
            return errorHandler(error);
        }
    }

    /// Get total ternak by fase
    getTotalTernakByFase = async (req) => {
        try{
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'id_fp'],
                include: [
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    }
                ],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: null,
                    id_fp: {
                        [Op.not]: null
                    }
                }
            });

            // Get data fase
            const fase = await this.db.Fase.findAll({
                attributes: ['id_fp', 'fase']
            });
            if(!fase) newError(404, 'Fase not found');

            // Create Object Fase
            let list = {};
            for(let i = 0; i < fase.length; i++){
                if(fase[i].dataValues.fase.toLowerCase().startsWith('adaptasi')){
                    list['adaptasi'] = 0;
                }else if(fase[i].dataValues.fase.toLowerCase().includes('perkawinan')){
                    list['perkawinan'] = 0;
                }else{
                    list[fase[i].dataValues.fase.toLowerCase()] = 0;
                }
            }

            // Count ternak by fase
            for(let i = 0; i < ternak.length; i++){
                if(ternak[i].dataValues.fase.dataValues.fase.toLowerCase().startsWith('adaptasi')){
                    list['adaptasi']++;
                }else if(ternak[i].dataValues.fase.dataValues.fase.toLowerCase().includes('perkawinan')){
                    list['perkawinan']++;
                }else{
                    list[ternak[i].dataValues.fase.dataValues.fase.toLowerCase()]++;
                }
            }

            return {
                code: 200,
                data: list
            }
        }catch(error){
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _mobileDash(db);