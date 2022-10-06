module.exports = (Sequelize, DataTypes) => {
    const Varietas = require('./varietas.model')(Sequelize, DataTypes);
    const Penyakit = require('./penyakit.model')(Sequelize, DataTypes);
    const Pakan = require('./pakan.model')(Sequelize, DataTypes);
    const Fase = require('./fase.model')(Sequelize, DataTypes);
    const Kandang = require('./kandang.model')(Sequelize, DataTypes);

    const Ternak = Sequelize.define("Ternak", {
        id_ternak:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          rf_id:{
            type: DataTypes.STRING,
            allowNull: false
          },
          foto:{
            type: DataTypes.STRING,
            allowNull: true
          },
          jenis_kelamin:{
            type: DataTypes.STRING,
            allowNull: true
          },
          id_varietas:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          id_kandang:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          id_pakan:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          id_fp:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          id_induk:{
            type: DataTypes.INTEGER,
            allowNull: true,
            // references: {
            //   model: 'd_ternak',
            //   key: 'id_ternak'
            // }
          },
          id_pejantan:{
            type: DataTypes.INTEGER,
            allowNull: true,
            // references: {
            //   model: 'd_ternak',
            //   key: 'id_ternak'
            // }
          },
          berat:{
            type: DataTypes.INTEGER,
            allowNull: true
          },
          suhu:{
            type: DataTypes.INTEGER,
            allowNull: true
          },
          status_kesehatan:{
            type: DataTypes.STRING,
            allowNull: true
          },
          tanggal_lahir:{
            type: DataTypes.DATE,
            allowNull: true
          },
          id_penyakit:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          tanggal_masuk:{
            type: DataTypes.DATE,
            allowNull: true
          },
          tanggal_keluar:{
            type: DataTypes.DATE,
            allowNull: true
          },
          status_keluar:{
            type: DataTypes.STRING,
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
        tableName: "s_ternak",
    });

    Ternak.belongsTo(Varietas, {
        foreignKey: 'id_varietas',
        as: 'varietas'
    });
    Ternak.belongsTo(Kandang, {
        foreignKey: 'id_kandang',
        as: 'kandang'
    });
    Ternak.belongsTo(Pakan, {
        foreignKey: 'id_pakan',
        as: 'pakan'
    });
    Ternak.belongsTo(Fase, {
        foreignKey: 'id_fp',
        as: 'fase'
    });
    Ternak.belongsTo(Penyakit, {
        foreignKey: 'id_penyakit',
        as: 'penyakit'
    });
    Ternak.belongsTo(Ternak, {
        foreignKey: 'id_induk',
        as: 'induk'
    });
    Ternak.belongsTo(Ternak, {
        foreignKey: 'id_pejantan',
        as: 'pejantan'
    });

    return Ternak;
}