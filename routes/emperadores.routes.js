const express = require('express');
const router = express.Router();
const controller = require('../controllers/emperadores.controller');
const { validateEmperador } = require('../validators/EmperadorValidator');
const { checkJwt } = require('../middlewares/jwt');

router.get('/', [checkJwt], controller.getAllEmperadores);
router.get('/:id', [checkJwt], controller.getEmperadorById);
router.post('/', [checkJwt, ...validateEmperador], controller.createEmperador);
router.put('/:id', [checkJwt, ...validateEmperador], controller.updateEmperador);
router.delete('/:id', [checkJwt], controller.deleteEmperador);

module.exports = router;