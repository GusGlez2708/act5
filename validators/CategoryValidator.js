const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');

// Las validaciones para la creación (POST) son más estrictas
const validatorCategoryCreate = [
    // --- Campo: nombre ---
    check('nombre')
        .trim() // Saneamiento: elimina espacios al inicio y fin
        .notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom((value, { request }) => {
            // Validación Custom: Verifica si el nombre ya existe
            return Category.findOne({ where: { nombre: value } })
                .then((category) => { // Renombrado de Category a category
                    if (category) {
                        throw new Error('Ya existe una categoría con el mismo nombre');
                    }
                });
        }),

    // --- Campo: descripcion ---
    check('descripcion')
        .trim() // Saneamiento: elimina espacios al inicio y fin
        .notEmpty().withMessage('El campo descripcion es obligatorio')
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres')
        .custom((value, { request }) => {
             // Validación Custom: Verifica si la descripción ya existe
            return Category.findOne({ where: { descripcion: value } })
                .then((category) => { // Renombrado de Category a category
                    if (category) {
                        throw new Error('Ya existe una descripcion con el mismo nombre');
                    }
                });
        }),
        
    // --- Campo: activo ---
    check('activo').optional() // El campo es opcional
        .isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

// Las validaciones para la actualización (PUT) permiten campos opcionales (optional())
const validatorCategoryUpdate = [
    // --- Campo: nombre ---
    check('nombre').optional()
        .trim()
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom((value, { request }) => {
            // Validación Custom: Verifica si el nombre ya existe
            return Category.findOne({ where: { nombre: value } })
                .then((category) => { // Renombrado de Category a category
                    if (category) {
                        throw new Error('Ya existe una categoría con el mismo nombre');
                    }
                });
        }),

    // --- Campo: descripcion ---
    check('descripcion').optional()
        .trim()
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres')
        .custom((value, { request }) => {
            // Validación Custom: Verifica si la descripción ya existe
            return Category.findOne({ where: { descripcion: value } })
                .then((category) => { // Renombrado de Category a category
                    if (category) {
                        throw new Error('Ya existe una descripcion con el mismo nombre');
                    }
                });
        }),

    // --- Campo: activo ---
    check('activo').optional()
        .isBoolean().withMessage('El campo activo debe ser con valor booleano'),
]

module.exports = {
    validatorCategoryCreate,
    validatorCategoryUpdate
}
