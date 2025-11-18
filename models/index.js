'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require('../config.db'); // Importar la conexión configurada

const db = {};

// Cargar los modelos que SÍ existen en la DB
db.Profile = require('./ProfileModel')(connection, DataTypes); // Modelo de Perfil (requerido por User)
db.User = require('./UserModel')(connection, DataTypes);     // Modelo de Usuario (requerido por Auth)

// Cargar los nuevos modelos
db.NaveImperial = require('./NaveImperialModel')(connection, DataTypes);
db.Emperador = require('./EmperadorModel')(connection, DataTypes);
db.Mision = require('./MisionModel')(connection, DataTypes);

// Ejecutar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = connection;
db.Sequelize = Sequelize;

module.exports = db;