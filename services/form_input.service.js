// Helper databse yang dibuat
const {newError, errorHandler} = require('../utils/errorHandler');

class _formInput{
    constructor(db){
        this.db = db;
    }
    // Get Status Ternak
    getDataFormInput = async (req) => {
        try{
            // Get status ternak
            const statusTernak = await this.db.StatusTernak.findAll({});

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

            // Get penyakit
            const penyakit = await this.db.Penyakit.findAll({
                attributes: ['id_penyakit','nama_penyakit'],
            });

            // Get jenis kandang
            const jenisKandang = await this.db.JenisKandang.findAll({
                attributes: ['id_jenis_kandang','jenis_kandang']
            });

            // Get bangsa
            const bangsa = await this.db.Bangsa.findAll({
                attributes: ['id_bangsa','bangsa']
            });
            
            // Get status ternak indukan
            const statusIndukan = await this.db.StatusTernak.findOne({
                where: {
                    status_ternak: 'Indukan'
                }
            });
            if(!statusIndukan) newError(404, 'Data Status Ternak Indukan not found', 'getDataFormInput Service');

            // Get status ternak pejantan
            const statusPejantan = await this.db.StatusTernak.findOne({
                where: {
                    status_ternak: 'Pejantan'
                }
            });
            if(!statusPejantan) newError(404, 'Data Status Ternak Pejantan not found', 'getDataFormInput Service');

            // Get data indukan
            const indukan = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'betina',
                    id_status_ternak: statusIndukan.dataValues.id_status_ternak
                }
            });

            // Get data pejantan
            const pejantan = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'jantan',
                    id_status_ternak: statusPejantan.dataValues.id_status_ternak
                }
            });

            // Get fase perkawinan
            const fasePerkawinan = await this.db.Fase.findOne({
                where: {
                    fase: 'Perkawinan'
                }
            });
            if(!fasePerkawinan) newError(500, 'Data Fase Perkawinan not found', 'getDataFormInput Service');

            // Get Pejantan in perkawinan
            const pejantanInPerkawinan = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'jantan',
                    id_status_ternak: statusPejantan.dataValues.id_status_ternak,
                    id_fp: fasePerkawinan.dataValues.id_fp
                },
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['kode_kandang']
                    }
                ]
            });
            for(let i = 0; i < pejantanInPerkawinan.length; i++){
                pejantanInPerkawinan[i].dataValues.text = pejantanInPerkawinan[i].dataValues.kandang ? `${pejantanInPerkawinan[i].dataValues.id_ternak} - ${pejantanInPerkawinan[i].dataValues.kandang.kode_kandang}` : `${pejantanInPerkawinan[i].dataValues.id_ternak} - null`
                delete pejantanInPerkawinan[i].dataValues.kandang;
            }

            // Get ternak jantan
            const ternakJantan = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'Jantan'
                }
            });

            // Get ternak betina
            const ternakBetina = await this.db.Ternak.findAll({
                attributes: ['id_ternak','rf_id'],
                where: {
                    id_peternakan: req.dataAuth.id_peternakan,
                    jenis_kelamin: 'Betina'
                }
            });

            return {
                code: 200,
                data: {
                    status_ternak: statusTernak,
                    kode_kandang: kodeKandang,
                    jenis_pakan: jenisPakan,
                    penyakit: penyakit,
                    jenis_kandang: jenisKandang,
                    bangsa: bangsa,
                    indukan: indukan,
                    pejantan: pejantan,
                    pejantan_perkawinan: pejantanInPerkawinan,
                    ternak_jantan: ternakJantan,
                    ternak_betina: ternakBetina
                }
            }

        }catch (error){
            return errorHandler(error);
        }
    }
}

module.exports = (db) => new _formInput(db);