var express = require('express');


const {get, getById, create, update, destroy}  = require('../controllers/states.controller');
const {validatorStateRequire, validatorStateOptional} = require('../validators/StateValidator')
const { authenticateAdmin } = require('../middlewares/jwt')

const api = express.Router();

api.get('/', get);
api.get('/:id', getById)
api.post('/', authenticateAdmin, validatorStateRequire, create)
api.put('/:id', authenticateAdmin, validatorStateOptional, update)
api.delete('/:id', authenticateAdmin, destroy)


module.exports = api;