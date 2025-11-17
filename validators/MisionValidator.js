const { body } = require('express-validator');
const validateMision = [
  body('nombre_clave').notEmpty().withMessage('El nombre clave es requerido').isString(),
  body('planeta_objetivo').notEmpty().withMessage('El planeta es requerido').isString(),
  body('estado').optional().isIn(['planificada', 'en_curso', 'completada', 'fallida'])
];
module.exports = { validateMision };