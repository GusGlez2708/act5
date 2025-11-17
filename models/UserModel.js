const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');
const { Profile } = require('./ProfileModel');

const User = connection.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    perfil_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Profile,
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nick: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    UserAlta: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Admin"
    },
    FechaAlta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    UserMod: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ""
    },
    FechaMod: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    UserBaja: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ""
    },
    FechaBaja: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: true
});

// Relación: User pertenece a Profile
User.belongsTo(Profile, { 
    as: 'perfil', 
    foreignKey: 'perfil_id' 
});

// Relación inversa: Profile tiene muchos Users
Profile.hasMany(User, { 
    as: 'usuarios', 
    foreignKey: 'perfil_id' 
});

module.exports = { User };