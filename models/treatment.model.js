module.exports = (Sequelize, DataTypes) => {
    const Treatment = Sequelize.define("Treatment", {
        id_treatment:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        treatment:{
          type: DataTypes.STRING,
          allowNull: false
        },
        day:{
          type: DataTypes.INTEGER,
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
        tableName: "d_treatments",
    });

    Treatment.associate = function (models) {
        Treatment.hasMany(models.Ternak, {
            foreignKey: 'id_treatments',
            as: 'ternak'
        });
    };
    return Treatment;
}