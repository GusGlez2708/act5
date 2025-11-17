module.exports = (sequelize, DataTypes) => {
    const New = sequelize.define('new', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoria_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        estado_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.BIGINT,
            allowNull: false
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

    New.associate = function(models) {
        New.belongsTo(models.Category, { 
            as: 'categoria', 
            foreignKey: 'categoria_id' 
        });

        New.belongsTo(models.State, { 
            as: 'estado', 
            foreignKey: 'estado_id' 
        });

        New.belongsTo(models.User, { 
            as: 'usuario', 
            foreignKey: 'usuario_id' 
        });
    };

    return New;
};