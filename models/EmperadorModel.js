module.exports = (sequelize, DataTypes) => {
  const Emperador = sequelize.define('Emperador', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    titulo: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'Lord Sith' },
    estado: { type: DataTypes.ENUM('vivo', 'muerto', 'clonado', 'desconocido'), allowNull: false, defaultValue: 'vivo' }
  }, { tableName: 'emperadores', timestamps: true });
  Emperador.associate = function(models) {};
  return Emperador;
};