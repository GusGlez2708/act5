'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config.db');

const db = {};

// Importar todos los modelos
db.Profile = require('./ProfileModel')(connection, DataTypes);
db.State = require('./StateModel')(connection, DataTypes);
db.Category = require('./CategoryModel')(connection, DataTypes);
db.User = require('./UserModel')(connection, DataTypes);
db.New = require('./NewModel')(connection, DataTypes);
db.NaveImperial = require('./NaveImperialModel')(connection, DataTypes);

// Asociar modelos si es necesario
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = connection;
db.Sequelize = Sequelize;

module.exports = db;
