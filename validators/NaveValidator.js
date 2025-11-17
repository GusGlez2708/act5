const { body } = require('express-validator');

const validateNave = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El nombre no debe exceder los 100 caracteres'),
  body('clase')
    .notEmpty().withMessage('La clase es requerida')
    .isString().withMessage('La clase debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('La clase no debe exceder los 100 caracteres'),
  body('tripulacion')
    .notEmpty().withMessage('La tripulación es requerida')
    .isInt({ min: 0 }).withMessage('La tripulación debe ser un número entero positivo'),
  body('estado_operativo')
    .optional()
    .isIn(['activo', 'en_reparacion', 'destruido']).withMessage('Estado no válido'),
];

module.exports = {
  validateNave,
};
