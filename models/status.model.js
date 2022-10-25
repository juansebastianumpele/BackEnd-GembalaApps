module.exports = (Sequelize, DataTypes) => {
    const Status = Sequelize.define("Status", {
        id_status_ternak:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        status_ternak:{
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
        tableName: "d_status_ternak",
    });

    Status.associate = function (models) {
        Status.hasMany(models.Ternak, {
            foreignKey: 'id_status_ternak',
            as: 'ternak'
        });
    };
    return Status;
}