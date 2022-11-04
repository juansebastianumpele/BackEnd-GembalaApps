// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error, log_info} = require('../utils/logging');
const e = require('express');

class _dashboard{
    constructor(db){
        this.db = db;
    }

    /// Get Data total ternak by status
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
                    error: 'Status Cempe tidak ditemukan'
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
                    error: 'Status Pejantan tidak ditemukan'
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
                    error: 'Status Indukan tidak ditemukan'
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
                error: 'Internal Server Error'
            }
        }
    }

    /// Get total kandang
    getTotalKandang = async (req) => {
        try{
            const totalKandang = await this.db.Kandang.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });

            return {
                code: 200,
                data: {
                    total_kandang: totalKandang
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

    // Get total ternak
    getTotalTernak = async (req) => {
        try{
            const totalTernak = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: null
                }
            });

            return {
                code: 200,
                data: {
                    total_ternak: totalTernak
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

                if(fase[i].dataValues.fase.toLowerCase().startsWith('adaptasi')){
                    totalTernakByFase[1].total_ternak += totalTernak;
                }else if(fase[i].dataValues.fase.toLowerCase().includes('perkawinan')){
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

    // Get total ternak by jenis kandang
    getTotalTernakByJenisKandang = async (req) => {
        try{
            // Get data jenis kandang
            const jenisKandang = await this.db.JenisKandang.findAll({});
            if(jenisKandang.length <= 0){
                return {
                    code: 404,
                    error: 'Jenis Kandang Not Found'
                }
            }

            // Get data kandang
            const kandang = await this.db.Kandang.findAll({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(kandang.length <= 0){
                return {
                    code: 404,
                    error: 'Kandang Not Found'
                }
            }
            
            // Get data ternak
            const ternak = await this.db.Ternak.findAll({
                attributes: ['id_kandang'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: null
                }
            });
            if(ternak.length <= 0){
                return {
                    code: 404,
                    error: 'Ternak Not Found'
                }
            }

            // Get total ternak by jenis kandang
            let totalTernakByJenisKandang = [];
            for(let i = 0; i < jenisKandang.length; i++){
                let totalTernak = 0;
                for(let j = 0; j < kandang.length; j++){
                    if(jenisKandang[i].dataValues.id_jenis_kandang == kandang[j].dataValues.id_jenis_kandang){
                        for(let k = 0; k < ternak.length; k++){
                            if(kandang[j].dataValues.id_kandang == ternak[k].dataValues.id_kandang){
                                totalTernak++;
                            }
                        }
                    }
                }

                totalTernakByJenisKandang.push({
                    id_jenis_kandang: jenisKandang[i].dataValues.id_jenis_kandang,
                    jenis_kandang: jenisKandang[i].dataValues.jenis_kandang,
                    total_ternak: totalTernak
                });
            }

            return {
                code: 200,
                data: totalTernakByJenisKandang
            }

        }catch(error){
            log_error(error);
            return {
                code: 500,
                error: 'Internal Server Error'
            }
        }
    }

    /// Get ADG Cempe
    getADGCempe = async (req) => {
        try{
            // Get data status ternak cempe
            const statusTernak = await this.db.Status.findOne({
                attributes: ['id_status_ternak'],
                where: {
                    status_ternak: 'cempe'
                }
            });
            if(statusTernak == null){
                return {
                    code: 404,
                    error: 'Status Ternak Cempe Not Found'
                }
            }

            // Get data ternak cempe
            const ternakCempe = await this.db.Ternak.findAll({
                attributes: ['id_ternak'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_status_ternak: statusTernak.dataValues.id_status_ternak,
                    status_keluar: null
                }
            });
            if(ternakCempe.length <= 0){
                return {
                    code: 404,
                    error: 'Ternak Cempe Not Found'
                }
            }

            // Get data berat badan ternak cempe
            let beratBadanTernakCempe = {};
            for(let i = 0; i < ternakCempe.length; i++){
                const dataTimbangCempe = await this.db.Timbangan.findAll({
                    where: {
                        id_ternak: ternakCempe[i].dataValues.id_ternak
                    },
                    order: [
                        ['tanggal_timbang', 'ASC']
                    ]
                });
                if(dataTimbangCempe != null){
                    dataTimbangCempe.forEach((data) => {
                        const dateID = data.dataValues.tanggal_timbang.getFullYear() + '-' + (data.dataValues.tanggal_timbang.getMonth()) 
                        if(beratBadanTernakCempe[dateID]){
                            beratBadanTernakCempe[dateID] = {
                                total_berat: beratBadanTernakCempe[dateID].total_berat + data.dataValues.berat,
                                total_ternak: beratBadanTernakCempe[dateID].total_ternak + 1,
                            }
                        }else{
                            beratBadanTernakCempe[dateID] = {
                                total_berat: data.dataValues.berat,
                                total_ternak: 1,
                            }
                        }
                        beratBadanTernakCempe[dateID].average = beratBadanTernakCempe[dateID].total_berat / beratBadanTernakCempe[dateID].total_ternak;
                    });
                }   
            }
            return{
                code: 200,
                data: beratBadanTernakCempe
            }
        }catch(error){
            log_error(error);
            return {
                code: 500,
                error: 'Internal Server Error'
            }
        }
    }

    // get total ternak by status keluar
    getTotalTernakByStatusKeluar = async (req) => {
        try{
            // Get total terjual
            const totalDijual = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: 'Jual'
                }
            });

            // Get total disembelih
            const totalDisembelih = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: 'Sembilah'
                }
            });

            // Get total mati
            const totalMati = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: 'Mati'
                }
            });

            return {
                code: 200,
                data: {
                    total_dijual: totalDijual,
                    total_mati: totalMati,
                    total_disembelih: totalDisembelih,
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

}

module.exports = (db) => new _dashboard(db);