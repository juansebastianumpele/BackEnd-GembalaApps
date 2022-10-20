module.exports = (Sequelize, DataTypes) => {
    const AuthUser = Sequelize.define("AuthUser", {
        id_users:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        image:{
          type: DataTypes.STRING,
          allowNull: true
        },
        username:{
          type: DataTypes.STRING,
          allowNull: false
        },
        email:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phone:{
          type: DataTypes.STRING,
          allowNull: false
        },
        alamat:{
          type: DataTypes.STRING,
          allowNull: false
        },
        password:{
          type: DataTypes.STRING,
          allowNull: false
        },
        role:{
          type: DataTypes.STRING,
          allowNull: false
        },
        status:{
          type: DataTypes.STRING,
          allowNull: false
        },
        nama_peternakan:{
          type: DataTypes.STRING,
          allowNull: true
        },
        lastAccess:{
          type: DataTypes.DATE,
          allowNull: true
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
        tableName: "auth_users",
    });

    AuthUser.associate = function (models) {
        AuthUser.hasMany(models.Ternak, {
            foreignKey: 'id_user',
            as: 'ternak'
        });
        AuthUser.hasMany(models.Kandang, {
            foreignKey: 'id_user',
            as: 'kandang'
        });
        AuthUser.hasMany(models.JenisPakan, {
            foreignKey: 'id_user',
            as: 'jenispakan'
        });
    }

    return AuthUser;
}