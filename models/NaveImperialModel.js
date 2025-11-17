/**
 * CORRECCIÓN:
 * Se cambia la exportación para que sea una función que acepte (sequelize, DataTypes),
 * siguiendo el mismo patrón que tus otros modelos (UserModel, CategoryModel, etc.).
 * Se elimina la importación directa de '../config.db' porque 'sequelize' (la conexión)
 * será inyectada por 'models/index.js'.
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const NaveImperial = sequelize.define('NaveImperial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    clase: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tripulacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_operativo: {
      type: DataTypes.ENUM('activo', 'en_reparacion', 'destruido'),
      allowNull: false,
      defaultValue: 'activo',
    },
  }, {
    tableName: 'naves_imperiales',
    timestamps: true,
  });

  // Aquí podrías definir asociaciones en el futuro si quisieras
  // NaveImperial.associate = (models) => {
  //   ...
  // };

  return NaveImperial;
};