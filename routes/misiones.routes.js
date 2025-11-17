const express = require('express');
const router = express.Router();
const controller = require('../controllers/misiones.controller');
const { validateMision } = require('../validators/MisionValidator');
const { checkJwt } = require('../middlewares/jwt');

router.get('/', [checkJwt], controller.getAllMisiones);
router.get('/:id', [checkJwt], controller.getMisionById);
router.post('/', [checkJwt, ...validateMision], controller.createMision);
router.put('/:id', [checkJwt, ...validateMision], controller.updateMision);
router.delete('/:id', [checkJwt], controller.deleteMision);

module.exports = router;