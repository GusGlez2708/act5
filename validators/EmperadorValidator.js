const { body } = require('express-validator');
const validateEmperador = [
  body('nombre').notEmpty().withMessage('El nombre es requerido').isString().isLength({ max: 100 }),
  body('titulo').optional().isString().isLength({ max: 100 }),
  body('estado').optional().isIn(['vivo', 'muerto', 'clonado', 'desconocido'])
];
module.exports = { validateEmperador };