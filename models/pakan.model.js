module.exports = (Sequelize, DataTypes) => {
    const Pakan = Sequelize.define("Pakan", {
        id_pakan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        tableName: "d_pakan",
    });

    return Pakan;
}