module.exports = (Sequelize, DataTypes) => {
    const JenisPakan = Sequelize.define("JenisPakan", {
        id_jenis_pakan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_user:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nama_pakan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jenis_pakan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        komposisi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stok: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        satuan: {
            type: DataTypes.ENUM,
            values: [
                'Kg',
                'Pcs'
            ],
            defaultValue: 'Kg',
            allowNull: false
        }
    }, {
        tableName: "d_jenis_pakan",
    });

    JenisPakan.associate = function (models) {
        JenisPakan.hasMany(models.Ternak, {
            foreignKey: 'id_jenis_pakan',
            as: 'ternak'
        });
        JenisPakan.hasMany(models.Kandang, {
            foreignKey: 'id_jenis_pakan',
            as: 'kandang'
        });
        JenisPakan.belongsTo(models.AuthUser, {
            foreignKey: 'id_user',
            as: 'user'
        });
    }
    return JenisPakan;
}