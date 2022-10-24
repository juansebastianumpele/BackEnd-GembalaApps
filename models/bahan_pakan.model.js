module.exports = (Sequelize, DataTypes) => {
    const BahanPakan = Sequelize.define("BahanPakan", {
        id_bahan_pakan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_user:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_jenis_bahan_pakan:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tanggal:{
            type: DataTypes.DATE,
            allowNull: false
        },
        keterangan:{
            type: DataTypes.ENUM,
            values: [
                'Masuk',
                'Keluar'
            ],
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: "d_bahan_pakan",
    });

    BahanPakan.associate = function (models) {
        BahanPakan.belongsTo(models.JenisBahanPakan, {
            foreignKey: 'id_jenis_bahan_pakan',
            as: 'jenis_bahan_pakan'
        });
        BahanPakan.belongsTo(models.AuthUser, {
            foreignKey: 'id_user',
            as: 'user'
        });
    };

    return BahanPakan;
}