module.exports = (sequelize, DataTypes) => {
  const Mision = sequelize.define('Mision', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_clave: { type: DataTypes.STRING(150), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    planeta_objetivo: { type: DataTypes.STRING(100), allowNull: false },
    estado: { type: DataTypes.ENUM('planificada', 'en_curso', 'completada', 'fallida'), allowNull: false, defaultValue: 'planificada' }
  }, { tableName: 'misiones', timestamps: true });
  Mision.associate = function(models) {};
  return Mision;
};