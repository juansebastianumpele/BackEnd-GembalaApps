module.exports = (Sequelize, DataTypes) => {
  const Ternak = require('./ternak.model')(Sequelize, DataTypes);

  const Kawin = Sequelize.define("Kawin", {
    id_kawin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_ternak: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_pemacek: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggal_kawin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_fp: {
      type: DataTypes.INTEGER,
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
    tableName: "d_kawin",
  });

  Kawin.associate = function (models) {
    Kawin.belongsTo(models.Ternak, {
      foreignKey: 'id_ternak',
      as: 'ternak'
    });
    Kawin.belongsTo(models.Ternak, {
      foreignKey: 'id_pemacek',
      as: 'pemacek'
    });
    Kawin.belongsTo(models.Fase, {
      foreignKey: 'id_fp',
      as: 'fase'
    });
  };

  return Kawin;
}