const { State } = require('../models/StateModel');
const { Op } = require('sequelize');

class StateService {
    async getAllStates() {
        try {
            return await State.findAll({
                where: { activo: true },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener estados: ${error.message}`);
        }
    }

    async getStateById(id) {
        try {
            const state = await State.findByPk(id);
            if (!state) {
                throw new Error('Estado no encontrado');
            }
            return state;
        } catch (error) {
            throw new Error(`Error al obtener estado: ${error.message}`);
        }
    }

    async createState(stateData) {
        try {
            const existingState = await State.findOne({
                where: {
                    [Op.or]: [{ nombre: stateData.nombre }, { abreviacion: stateData.abreviacion }]
                }
            });

            if (existingState) {
                if (existingState.activo) {
                    throw new Error('El estado o la abreviación ya existen.');
                } else {
                    // Reactivate and update the soft-deleted state
                    const dataWithAudit = {
                        ...stateData,
                        activo: true,
                        FechaMod: new Date(),
                        UserMod: stateData.UserMod || 'Admin',
                        FechaBaja: null // Clear the deletion date
                    };
                    await existingState.update(dataWithAudit);
                    return existingState;
                }
            }

            const currentDate = new Date();
            const dataWithAudit = {
                ...stateData,
                FechaAlta: currentDate,
                FechaMod: currentDate
            };
            
            return await State.create(dataWithAudit);
        } catch (error) {
            throw new Error(`Error al crear estado: ${error.message}`);
        }
    }

    async updateState(id, stateData) {
        try {
            const state = await State.findByPk(id);
            if (!state) {
                throw new Error('Estado no encontrado');
            }
            
            const dataWithAudit = {
                ...stateData,
                FechaMod: new Date(),
                UserMod: stateData.UserMod || 'Admin'
            };
            
            return await state.update(dataWithAudit);
        } catch (error) {
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }
    }

    async deleteState(id) {
        try {
            const state = await State.findByPk(id);
            if (!state) {
                throw new Error('Estado no encontrado');
            }
            
            // Soft delete - marcar como inactivo
            await state.update({
                activo: false,
                FechaBaja: new Date(),
                UserBaja: 'Admin'
            });
            
            return { message: 'Estado eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar estado: ${error.message}`);
        }
    }
}

module.exports = new StateService();