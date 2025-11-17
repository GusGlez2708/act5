module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'profiles',
        timestamps: true
    });

    Profile.associate = function(models) {
        Profile.hasMany(models.User, { 
            as: 'usuarios', 
            foreignKey: 'perfil_id' 
        });
    };

    return Profile;
};