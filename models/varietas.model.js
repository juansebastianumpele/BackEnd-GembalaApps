module.exports = (Sequelize, DataTypes) => {
    const Varietas = Sequelize.define("Varietas", {
        id_varietas:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          varietas:{
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: "d_varietas",
    });

    Varietas.associate = function (models) {
        Varietas.hasMany(models.Ternak, {
            foreignKey: 'id_varietas',
            as: 'ternak'
        });
    }

    return Varietas;
}