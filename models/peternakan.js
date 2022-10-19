module.exports = (Sequelize, DataTypes) => {
    const Peternakan = Sequelize.define("Peternakan", {
        id_peternakan:{
            type: DataTypes.INTEGER,
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
        id_users:{
          type: DataTypes.INTEGER,
          allowNull: false,
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
        tableName: "d_peternakan",
    });

    Peternakan.associate = function (models) {
        Peternakan.hasMany(models.Pakan, {
            foreignKey: 'id_peternakan',
            as: 'pakan'
        });
        Peternakan.hasMany(models.Ternak, {
            foreignKey: 'id_peternakan',
            as: 'ternak'
        });
        Peternakan.hasMany(models.Kandang, {
            foreignKey: 'id_peternakan',
            as: 'kandang'
            });
    }
    return Peternakan;
}