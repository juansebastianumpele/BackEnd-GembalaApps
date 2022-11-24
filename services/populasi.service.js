// Helper databse yang dibuat
const { Op } = require("sequelize");
 
class _populasi{
    constructor(db){
        this.db = db;
    }
    // Get data populasi
    getPopulasi = async (req) => {
        try {
            // let ternakMasuk = {};
            // let ternakKeluar = {};
            // let populasi = {};
            // const thisYear = new Date().getFullYear();
            // for(let i = 1; i <= 12; i++){
            //     ternakMasuk[`${thisYear}-${i}`] = await this.db.Ternak.count({
            //         attributes: ['tanggal_masuk'],
            //         where: {
            //             tanggal_masuk: {
            //                 [Op.between]: [new Date(thisYear, i-1, 0), new Date(thisYear, i, 1)]
            //             }
            //         }
            //     });
            //     ternakKeluar[`${thisYear}-${i}`] = await this.db.Ternak.count({
            //         where: {
            //             tanggal_keluar: {
            //                 [Op.between]: [new Date(thisYear, i-1, 0), new Date(thisYear, i, 1)]
            //             }
            //         }
            //     });
            //     populasi[`${thisYear}-${i}`] = (ternakMasuk[`${thisYear}-${i}`] - ternakKeluar[`${thisYear}-${i}`]) + (populasi[`${thisYear}-${i-1}`] || 0);
            //     console.log(populasi[`${thisYear}-${i}`]);
            // }

            const thisYear = new Date().getFullYear();
            let data = {};
            for(let i = 1; i <= 12; i++){
                data[`${thisYear}-${i}`] = {
                    masuk: 0,
                    keluar: 0,
                    populasi: 0
                }
            }
            for(let i = 1; i <= 12; i++){
                data[`${thisYear}-${i}`].masuk = await this.db.Ternak.count({
                    attributes: ['tanggal_masuk'],
                    where: {
                        tanggal_masuk: {
                            [Op.between]: [new Date(thisYear, i-1, 0), new Date(thisYear, i, 1)]
                        }
                    }
                });
                data[`${thisYear}-${i}`].keluar = await this.db.Ternak.count({
                    where: {
                        tanggal_keluar: {
                            [Op.between]: [new Date(thisYear, i-1, 0), new Date(thisYear, i, 1)]
                        }
                    }
                });
                data[`${thisYear}-${i}`].populasi = (data[`${thisYear}-${i}`].masuk - data[`${thisYear}-${i}`].keluar) + (data[`${thisYear}-${i-1}`] ? data[`${thisYear}-${i-1}`].populasi : 0);
            }

            // return{
            //     code: 200,
            //     data: {
            //         ternak_masuk: {
            //             total: Object.keys(ternakMasuk).length,
            //             list: Object.keys(ternakMasuk).length > 0 ? ternakMasuk : null
            //         },
            //         ternak_keluar: {
            //             total: Object.keys(ternakKeluar).length,
            //             list: Object.keys(ternakKeluar).length > 0 ? ternakKeluar : null
            //         },
            //         populasi: {
            //             total: Object.keys(populasi).length,
            //             list: Object.keys(populasi).length > 0 ? populasi : null
            //         }
            //     }
            // }
            return{
                code: 200,
                data: {
                    total: Object.keys(data).length,
                    list: Object.keys(data).length > 0 ? data : null
                }
            }

        } catch (error) {
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _populasi(db);