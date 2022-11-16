const { newError, errorHandler } = require('../utils/errorHandler');

class _riwayatPerkawinan {
    constructor(db) {
        this.db = db;
    }
    // Get riwayat perkawinan
    getRiwayatPerkawinan = async (req) => {
        try {
            // Add id_peternakan to params
            req.query.id_peternakan = req.dataAuth.id_peternakan
            req.query.usg = 2
            // Get data riwayat perkawinan
            const list = await this.db.RiwayatPerkawinan.findAll({ 
                attributes: ['id_riwayat_perkawinan', 'id_indukan', 'id_pejantan', 'id_kandang', 'status', 'tanggal_perkawinan'],
                include: [
                    {
                        model: this.db.Kandang,
                        as: 'kandang',
                        attributes: ['id_kandang', 'kode_kandang']
                    }
                ],
                where: req.query });
            if (list.length <= 0) newError(404, 'Data Riwayat Perkawinan not found', 'getRiwayatPerkawinan Service');

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
}


module.exports = (db) => new _riwayatPerkawinan(db);