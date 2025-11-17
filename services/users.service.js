const db = require('../models');

class UserService {
    async getAllUsers() {
        try {
            return await db.User.findAll({
                where: { activo: true },
                // Removed include for Profile as it's no longer available
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await db.User.findByPk(id, {
                // Removed include for Profile as it's no longer available
            });
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    async createUser(userData) {
        try {
            const currentDate = new Date();
            const dataWithAudit = {
                ...userData,
                FechaAlta: currentDate,
                FechaMod: currentDate,
                FechaBaja: currentDate
            };
            
            const user = await db.User.create(dataWithAudit);
            
            // Retornar el usuario (without profile as it's removed)
            return await this.getUserById(user.id);
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    async updateUser(id, userData) {
        try {
            const user = await db.User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            const dataWithAudit = {
                ...userData,
                FechaMod: new Date(),
                UserMod: userData.UserMod || 'Admin'
            };
            
            await user.update(dataWithAudit);
            
            // Retornar el usuario actualizado (without profile as it's removed)
            return await this.getUserById(id);
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const user = await db.User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            // Soft delete - marcar como inactivo
            await user.update({
                activo: false,
                FechaBaja: new Date(),
                UserBaja: 'Admin'
            });
            
            return { message: 'Usuario eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            return await db.User.findOne({
                where: { correo: email, activo: true },
                // Removed include for Profile as it's no longer available
            });
        } catch (error) {
            throw new Error(`Error al buscar usuario por email: ${error.message}`);
        }
    }
}

module.exports = new UserService();