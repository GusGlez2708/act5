const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const New = connection.define('new', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    estado_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: State,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT('medium'),
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
    tableName: 'news',
    timestamps: true
});

// Relaciones: New pertenece a Category, State y User
New.belongsTo(Category, { 
    as: 'categoria', 
    foreignKey: 'categoria_id' 
});

New.belongsTo(State, { 
    as: 'estado', 
    foreignKey: 'estado_id' 
});

New.belongsTo(User, { 
    as: 'usuario', 
    foreignKey: 'usuario_id' 
});

// Relaciones inversas
Category.hasMany(New, { 
    as: 'noticias', 
    foreignKey: 'categoria_id' 
});

State.hasMany(New, { 
    as: 'noticias', 
    foreignKey: 'estado_id' 
});

User.hasMany(New, { 
    as: 'noticias', 
    foreignKey: 'usuario_id' 
});

module.exports = { New };