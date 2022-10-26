module.exports = (Sequelize, DataTypes) => {
    const Peternakan = Sequelize.define("Peternakan", {
        id_peternakan:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nama_peternakan:{
          type: DataTypes.STRING,
          allowNull: false
        },
        alamat:{
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt:{
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt:{
          type: DataTypes.DATE,
          allowNull: false
        }
    }, {
        tableName: "d_peternakan_ternak",
    });

    Peternakan.associate = function (models) {
        Peternakan.hasMany(models.Ternak, {
            foreignKey: 'id_peternakan',
            as: 'ternak'
        });
        Peternakan.hasMany(models.AuthUser, {
            foreignKey: 'id_peternakan',
            as: 'user'
        });
        Peternakan.hasMany(models.Kandang, {
            foreignKey: 'id_peternakan',
            as: 'kandang'
        });
        Peternakan.hasMany(models.Pakan, {
            foreignKey: 'id_peternakan',
            as: 'pakan'
        });
        Peternakan.hasMany(models.BahanPakan, {
            foreignKey: 'id_peternakan',
            as: 'bahan_pakan'
        });
        Peternakan.hasMany(models.LKPemasukan, {
            foreignKey: 'id_peternakan',
            as: 'lk_pemasukan'
        });
        Peternakan.hasMany(models.Populasi, {
            foreignKey: 'id_peternakan',
            as: 'populasi'
        });
      }

    return Peternakan;
}