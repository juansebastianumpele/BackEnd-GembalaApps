module.exports = (Sequelize, DataTypes) => {
    const Fase = Sequelize.define("Fase", {
        id_fp:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        fase:{
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
        tableName: "d_fase_pemeliharaan",
    });

    return Fase;
}