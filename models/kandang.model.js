module.exports = (Sequelize, DataTypes) => {
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

    return Kandang;
}