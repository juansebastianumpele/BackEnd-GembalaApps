module.exports = (Sequelize, DataTypes) => {
    const Penyakit = require('./penyakit.model')(Sequelize, DataTypes);
    const Ternak = require('./ternak.model')(Sequelize, DataTypes);

    const RiwayatKesehatan = Sequelize.define("RiwayatKesehatan", {
          id_riwayat_kesehatan:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          id_ternak:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          id_penyakit:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          tanggal_sakit:{
            type: DataTypes.DATE,
            allowNull: false
          },
          tanggal_sembuh:{
            type: DataTypes.DATE,
            allowNull: true
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
    }, {
        tableName: "d_riwayat_kesehatan",
    });

    RiwayatKesehatan.belongsTo(Penyakit, {
      foreignKey: 'id_penyakit',
      as: 'penyakit'
    });

    RiwayatKesehatan.belongsTo(Ternak, {
      foreignKey: 'id_ternak',
      as: 'ternak'
    });

    return RiwayatKesehatan;
}