module.exports = (Sequelize, DataTypes) => {
    const AuthUser = Sequelize.define("AuthUser", {
        id_users:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          foto:{
            type: DataTypes.STRING,
            allowNull: true
          },
          nama_lengkap:{
            type: DataTypes.STRING,
            allowNull: false
          },
          username:{
            type: DataTypes.STRING,
            allowNull: false
          },
          email:{
            type: DataTypes.STRING,
            allowNull: false
          },
          no_hp:{
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
          lastAccess:{
            type: DataTypes.DATE,
            allowNull: true
          },
          createdAt:{
            type: DataTypes.DATE,
            allowNull: true
          },
          updatedAt:{
            type: DataTypes.DATE,
            allowNull: true
          }
    }, {
        tableName: "auth_users",
    });

    return AuthUser;
}