module.exports = (sequelize, DataTypes) => {
  const NaveImperial = sequelize.define('NaveImperial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    clase: { type: DataTypes.STRING(100), allowNull: false },
    tripulacion: { type: DataTypes.INTEGER, allowNull: false },
    estado_operativo: { type: DataTypes.ENUM('activo', 'en_reparacion', 'destruido'), allowNull: false, defaultValue: 'activo' }
  }, { tableName: 'naves_imperiales', timestamps: true });
  NaveImperial.associate = function(models) {
    // futuras asociaciones
  };
  return NaveImperial;
};