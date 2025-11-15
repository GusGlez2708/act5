const { check } = require('express-validator');
const { Profile } = require('../models/ProfileModel'); // Asume que este modelo existe

// Validación para la creación de un perfil (Nombre obligatorio y único)
const validatorProfileCreate = [
    // Usamos .trim() para limpiar espacios y isLength para asegurar que no esté vacío
    check('nombre').trim().notEmpty().withMessage('El nombre del perfil es obligatorio')
        .isString().withMessage('El nombre del perfil debe ser texto')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .custom(async (value, { req }) => {
            // Verifica que no exista otro perfil con el mismo nombre (asíncrono)
            const profile = await Profile.findOne({ where: { nombre: value } });
            if (profile) {
                throw new Error('Ya existe un perfil con ese nombre');
            }
        }),
];

// Validación para la actualización (Todos los campos son opcionales)
const validatorProfileUpdate = [
    check('nombre').optional().trim()
        .isString().withMessage('El nombre del perfil debe ser texto')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .custom(async (value, { req }) => {
            // Verifica que el nuevo nombre no sea igual al de otro perfil existente
            const profile = await Profile.findOne({ where: { nombre: value } });
            if (profile) {
                throw new Error('Ya existe un perfil con ese nombre');
            }
        }),
    
    check('activo').optional()
        .isBoolean().withMessage('El campo activo debe ser con valor booleano'),
];

module.exports = {
    validatorProfileCreate,
    validatorProfileUpdate
};
