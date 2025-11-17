const express = require('express');
const router = express.Router();
const navesController = require('../controllers/naves.controller');
const { validateNave } = require('../validators/NaveValidator');
const { checkJwt } = require('../middlewares/jwt');

router.get('/', [checkJwt], navesController.getAllNaves);
router.get('/:id', [checkJwt], navesController.getNaveById);
router.post('/', [checkJwt, ...validateNave], navesController.createNave);
router.put('/:id', [checkJwt, ...validateNave], navesController.updateNave);
router.delete('/:id', [checkJwt], navesController.deleteNave);

module.exports = router;
