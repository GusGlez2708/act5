var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/categories.controller');
const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/', get);
api.get('/:id', getById)
api.post('/', authenticateAdmin, validatorCategoryCreate, create)
api.put('/:id', authenticateAdmin, validatorCategoryUpdate, update)
api.delete('/:id', authenticateAdmin, destroy)


module.exports = api;