module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        perfil_id: {
            type: DataTypes.BIGINT,
            allowNull: false
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

    User.associate = function(models) {
        User.belongsTo(models.Profile, { 
            as: 'perfil', 
            foreignKey: 'perfil_id' 
        });
        User.hasMany(models.New, { 
            as: 'noticias', 
            foreignKey: 'usuario_id' 
        });
    };

    return User;
};