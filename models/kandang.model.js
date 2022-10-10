module.exports = (Sequelize, DataTypes) => {
    // const Ternak = require('./ternak.model')(Sequelize, DataTypes);

    const Kandang = Sequelize.define("Kandang", {
        id_kandang: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        kode_kandang: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jenis_kandang: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: "d_kandang",
    });

    Kandang.associate = function (models) {
        Kandang.hasMany(models.Ternak, {
            foreignKey: 'id_kandang',
            as: 'ternak'
        });
    };

    return Kandang;
}