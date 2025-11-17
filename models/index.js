/**
 * CORRECCIÓN:
 * Se restaura el 'models/index.js' original de tu proyecto y SE AÑADE
 * la línea para cargar el nuevo modelo 'NaveImperialModel'.
 * Este archivo es el que realmente exporta el objeto 'db' que usan
 * todos los servicios.
 */
const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require('../config.db'); // Tu conexión principal
const db = {};

// Importar modelos existentes
db.Profile = require('./ProfileModel')(connection, DataTypes);
db.State = require('./StateModel')(connection, DataTypes);
db.Category = require('./CategoryModel')(connection, DataTypes);
db.User = require('./UserModel')(connection, DataTypes);
db.New = require('./NewModel')(connection, DataTypes);

// --- AÑADIR ESTA LÍNEA PARA EL NUEVO MODELO ---
db.NaveImperial = require('./NaveImperialModel')(connection, DataTypes);
// ------------------------------------------

// Definir asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.connection = connection;

module.exports = db;