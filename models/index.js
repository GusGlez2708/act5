'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require('../config.db'); // Importar la conexión configurada

const db = {};

// Cargar los únicos modelos que nos importan
db.User = require('./UserModel')(connection, DataTypes);
db.NaveImperial = require('./NaveImperialModel')(connection, DataTypes);
db.Emperador = require('./EmperadorModel')(connection, DataTypes);
db.Mision = require('./MisionModel')(connection, DataTypes);

// Ejecutar asociaciones si existen
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = connection;
db.Sequelize = Sequelize;

module.exports = db;