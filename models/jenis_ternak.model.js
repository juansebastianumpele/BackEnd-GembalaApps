module.exports = (Sequelize, DataTypes) => {
    const JenisTernak = Sequelize.define("JenisTernak", {
        id_jenis_ternak:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        jenis_ternak:{
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
        tableName: "d_jenis_ternak",
    });

    JenisTernak.associate = function (models) {
        JenisTernak.hasMany(models.Ternak, {
            foreignKey: 'id_jenis_ternak',
            as: 'ternak'
        });
    };

    return JenisTernak;
}