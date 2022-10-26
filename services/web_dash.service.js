// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');
const {log_error, log_info} = require('../utils/logging');
const e = require('express');

class _dashboard{
    constructor(db){
        this.db = db;
    }
    // // Get Data Populasi
    // getPopulasi = async (req) => {
    //     try{
    //         const list = await this.db.Populasi.findAll({
    //             attributes : ['id_populasi', 'tanggal', 'populasi'],
    //             where : req.query
    //         });
    //         if(list.length <= 0){
    //             return {
    //                 code: 404,
    //                 error: 'Data Population not found'
    //             }
    //         }
    //         return {
    //             code: 200,
    //             data: {
    //                 total: list.length,
    //                 list: list
    //             }
    //         }
    //     }
    //     catch(err){
    //         log_error('Populasi Service',err);
    //         return err;
    //     }
    // }

    // // Create Jumlah Populasi per hari
    // createPopulasi = async () => {
    //     try {
    //         setInterval(async () => {
    //             const now = new Date();
    //             const tanggal = date.format(now, 'YYYY-MM-DD');
    //             const populasi = await this.db.Ternak.count({});
    //             const add = await this.db.Populasi.create({
    //                 tanggal: tanggal,
    //                 populasi: populasi
    //             });
    //         }, 1000 * 60 * 60 * 24);
    //     }catch (error){
    //         log_error('createPopulasi Service', error);
    //         return {
    //             code: 500,
    //             error
    //         }
    //     }
    // }

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
                    id_peternakan: req.dataAuth.id_peternakan,
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

    // Get total kandang
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
                message: 'Internal Server Error'
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
                message: 'Internal Server Error'
            }
        }
    }

    // Get total ternak by fase
    getTotalTernakByFase = async (req) => {
        try{
            // Get data fase
            const fase = await this.db.Fase.findAll({});
            if(fase == null){
                return {
                    code: 404,
                    message: 'Fase Ternak Not Found'
                }
            }

            // Get total ternak by fase
            let totalTernakByFase = [];
            for(let i = 0; i < fase.length; i++){
                const totalTernak = await this.db.Ternak.count({
                    where: {
                        id_peternakan: req.dataAuth.id_peternakan,
                        id_fp: fase[i].dataValues.id_fp,
                        status_keluar: null
                    }
                });

                totalTernakByFase.push({
                    id_fp: fase[i].dataValues.id_fp,
                    fase: fase[i].dataValues.fase,
                    total_ternak: totalTernak
                });
            }

            return {
                code: 200,
                data: totalTernakByFase
            }

        }catch(error){
            log_error(error);
            return {
                code: 500,
                message: 'Internal Server Error'
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
                    message: 'Jenis Kandang Not Found'
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
                    message: 'Kandang Not Found'
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
                    message: 'Ternak Not Found'
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
                message: 'Internal Server Error'
            }
        }
    }

    // Get ADG Cempe
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
                    message: 'Status Ternak Cempe Not Found'
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
                    message: 'Ternak Cempe Not Found'
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
                message: 'Internal Server Error'
            }
        }
    }

    // get total ternak by status keluar
    getTotalTernakByStatusKeluar = async (req) => {
        try{
            // Get total terjual
            const totalTerjual = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: 'Terjual'
                }
            });

            // Get total disembelih
            const totalDisembelih = await this.db.Ternak.count({
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    status_keluar: 'Disembelih'
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
                    total_terjual: totalTerjual,
                    total_disembelih: totalDisembelih,
                    total_mati: totalMati
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

module.exports = (db) => new _dashboard(db);