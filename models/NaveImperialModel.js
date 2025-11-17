/**
 * CORRECCIÓN 2:
 * Se restaura el modelo al patrón original de tu proyecto.
 * Importa 'connection' directamente desde 'config.db' y exporta el modelo en un objeto.
 */
const { DataTypes } = require('sequelize');
const { connection } = require('../config.db'); // Importar la conexión directamente

const NaveImperial = connection.define('NaveImperial', {
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

module.exports = { NaveImperial }; // Exportar como un objeto