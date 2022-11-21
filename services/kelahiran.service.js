const { newError, errorHandler } = require('../utils/errorHandler');
const joi = require('joi');

class _kelahiran {
    constructor(db) {
        this.db = db;
    }
    // Get new ternak kelahiran
    getNewTernakKelahiran = async (req) => {
        try {
            // Get data status ternak
            const statusTernak = await this.db.StatusTernak.findOne({
                where: {
                    status_ternak: "Cempe"
                }
            });
            if (!statusTernak) newError(404, 'Data Status Ternak Cempe not found', 'getNewTernakKelahiran Service');
            
            // Add params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            req.query.id_fp = null
            req.query.id_dam = null
            req.query.id_status_ternak = statusTernak.dataValues.id_status_ternak
            // Get data new ternak kelahiran
            const list = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'rf_id'],
                where: req.query
            });
            if (list.length <= 0) newError(404, 'Data New Ternak Kelahiran not found', 'getNewTernakKelahiran Service');

            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                },
            };
        } catch (error) {
            return errorHandler(error);
        }
    }

    // Get data kelahiran
    getKelahiran = async (req) => {
        try {
            // Get data fase kelahiran
            const faseKelahiran = await this.db.Fase.findOne({where: {fase: "Kelahiran"}});
            if (!faseKelahiran) newError(404, 'Data Fase Kelahiran not found', 'getKelahiran Service');

            // Get data kelahiran
            const list = await this.db.Ternak.findAll({
                attributes: ['id_ternak', 'jenis_kelamin', 'tanggal_lahir'],
                include: [
                    {
                        model: this.db.Bangsa,
                        as: 'bangsa',
                        attributes: ['id_bangsa', 'bangsa']
                    },
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang']
                    },
                    {
                        model: this.db.Timbangan,
                        as: 'timbangan',
                        attributes: ['berat', 'suhu', 'tanggal_timbang']
                    }
                ],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_fp: faseKelahiran.dataValues.id_fp
                }
            });
            for(let i=0; i<list.length; i++){
                // Get Umur
                const umurHari = list[i].dataValues.tanggal_lahir ? Math.round((new Date() - new Date(list[i].dataValues.tanggal_lahir)) / (1000 * 60 * 60 * 24)) : 0;
                list[i].dataValues.umur = `${Math.floor(umurHari / 30)} bulan ${umurHari % 30} hari`;

                // Get Berat & Suhu
                list[i].dataValues.berat = list[i].dataValues.timbangan.length > 0 ? list[i].dataValues.timbangan[list[i].dataValues.timbangan.length - 1].berat : 0;
                list[i].dataValues.suhu = list[i].dataValues.timbangan.length > 0 ? list[i].dataValues.timbangan[list[i].dataValues.timbangan.length - 1].suhu : 0;

                delete list[i].dataValues.timbangan;
            }
            if (list.length <= 0) newError(404, 'Data Kelahiran not found', 'getKelahiran Service');

            const total = list.length;
            const totalCempeJantan = list.filter(item => item.dataValues.jenis_kelamin.toLowerCase() == 'jantan').length;
            const totalCempeBetina = list.filter(item => item.dataValues.jenis_kelamin.toLowerCase() == 'betina').length;

            let totalByKandang = {};
            list.forEach(item => {
                if (totalByKandang[item.dataValues.kandang.kode_kandang]) {
                    totalByKandang[item.dataValues.kandang.kode_kandang] += 1;
                } else {
                    totalByKandang[item.dataValues.kandang.kode_kandang] = 1;
                }
            });

            return {
                code: 200,
                data: {
                    kandang: {
                        total: Object.keys(totalByKandang).length,
                        list: totalByKandang
                    },
                    ternak:{
                        total,
                        total_cempe_jantan: totalCempeJantan,
                        total_cempe_betina: totalCempeBetina,
                        list
                    }
                },
            };
        } catch (error) {
            return errorHandler(error);
        }
    }
            
    // Create kelahiran
    createKelahiran = async (req) => {
        const t = await this.db.sequelize.transaction();
        try {
            // Validate data
            const schema = joi.object({
                id_ternak: joi.number().required(),
                tanggal_masuk: joi.date().allow(null),
                tanggal_lahir: joi.date().allow(null),
                id_sire: joi.number().allow(null),
                id_dam: joi.number().required(),
                jenis_kelamin: joi.string().required(),
                id_bangsa: joi.number().required(),
                id_kandang: joi.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) newError(400, error.details[0].message, 'createKelahiran Service');

            // Get data bangsa
            const bangsa = await this.db.Bangsa.findOne({ where: { id_bangsa: value.id_bangsa } });
            if (!bangsa) newError(404, 'Data Bangsa not found', 'createKelahiran Service');

            // Get data kandang
            const kandang = await this.db.Kandang.findOne({ where: { id_kandang: value.id_kandang } });
            if (!kandang) newError(404, 'Data Kandang not found', 'createKelahiran Service');

            // Get data fase kelahiran
            const faseKelahiran = await this.db.Fase.findOne({ where: { fase: "Kelahiran" } });
            if (!faseKelahiran) newError(404, 'Data Fase Kelahiran not found', 'createKelahiran Service');

            // Check ternak
            const checkTernak = await this.db.Ternak.findOne({where: {id_ternak: value.id_ternak, id_peternakan: req.dataAuth.id_peternakan}});
            if (!checkTernak) newError(404, 'Data Ternak not found', 'createKelahiran Service');
            console.log(checkTernak.dataValues.id_fp);
            console.log(faseKelahiran.dataValues.id_fp);
            if (checkTernak.dataValues.id_fp === faseKelahiran.dataValues.id_fp) newError(400, 'Ternak already in Kelahiran', 'createKelahiran Service');

            // Update ternak
            const ternak = await this.db.Ternak.update({
                tanggal_masuk: value.tanggal_masuk || new Date(),
                tanggal_lahir: value.tanggal_lahir || new Date(),
                id_sire: value.id_sire || null,
                id_dam: value.id_dam,
                jenis_kelamin: value.jenis_kelamin,
                id_bangsa: value.id_bangsa,
                id_kandang: value.id_kandang,
                id_fp: faseKelahiran.dataValues.id_fp,
            }, { 
                where: { 
                    id_ternak: value.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan,
                },
                transaction: t,
            });
            if (ternak[0] <= 0) newError(500, 'Failed to update data Ternak', 'createKelahiran Service');

            // Create data kelahiran
            const kelahiran = await this.db.RiwayatKelahiran.create({
                id_peternakan: req.dataAuth.id_peternakan,
                id_ternak: value.id_ternak,
                tanggal_masuk: value.tanggal_masuk || new Date(),
                tanggal_lahir: value.tanggal_lahir || new Date(),
                id_sire: value.id_sire || null,
                id_dam: value.id_dam,
                jenis_kelamin: value.jenis_kelamin,
                bangsa: bangsa.dataValues.bangsa,
                kode_kandang: kandang.dataValues.kode_kandang,
            }, { transaction: t });
            if (!kelahiran) newError(500, 'Failed to create data Kelahiran', 'createKelahiran Service');

            // Create riwayat fase
            const riwayatFase = await this.db.RiwayatFase.create({
                id_peternakan: req.dataAuth.id_peternakan,
                id_ternak: value.id_ternak,
                id_fp: faseKelahiran.dataValues.id_fp,
                tanggal: new Date(),
            }, { transaction: t });
            if (!riwayatFase) newError(500, 'Failed to create data Riwayat Fase', 'createKelahiran Service');

            // Check fase indukan
            const indukan = await this.db.Ternak.findOne({
                attributes: ['id_ternak'],
                include: [
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['fase'],
                    }
                ],
                where: {id_ternak: value.id_dam, id_peternakan: req.dataAuth.id_peternakan},
            });
            if (!indukan) newError(404, 'Data Indukan not found', 'createKelahiran Service');

            if (indukan.dataValues.fase.dataValues.fase.toLowerCase() !== 'laktasi') {

                // Get fase laktasi
                const faseLaktasi = await this.db.Fase.findOne({ where: { fase: 'Laktasi' } });
                if (!faseLaktasi) newError(404, 'Data Fase Laktasi not found', 'createKelahiran Service');
                
                // Update fase indukan
                const updateIndukan = await this.db.Ternak.update({
                    id_fp: faseLaktasi.dataValues.id_fp,
                }, {
                    where: {
                        id_ternak: value.id_dam,
                        id_peternakan: req.dataAuth.id_peternakan,
                    },
                    transaction: t,
                });
                if (updateIndukan[0] <= 0) newError(500, 'Failed to update data Indukan', 'createKelahiran Service');

                // Create riwayat fase indukan
                const riwayatFaseIndukan = await this.db.RiwayatFase.create({
                    id_peternakan: req.dataAuth.id_peternakan,
                    id_ternak: value.id_dam,
                    id_fp: faseLaktasi.dataValues.id_fp,
                    tanggal: new Date(),
                }, { transaction: t });
                if (!riwayatFaseIndukan) newError(500, 'Failed to create data Riwayat Fase Indukan', 'createKelahiran Service');
            }

            // Commit transaction
            await t.commit();

            return {
                code: 201,
                data: {
                    id_kelahiran: kelahiran.dataValues.id_kelahiran,
                    id_ternak: kelahiran.dataValues.id_ternak,
                    createdAt: kelahiran.dataValues.createdAt,
                }
            };
        } catch (error) {
            // Rollback transaction
            await t.rollback();
            return errorHandler(error);
        }
    }
}


module.exports = (db) => new _kelahiran(db);