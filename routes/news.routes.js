const express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/news.controller');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');
const { authenticateAdmin, authenticateAny } = require('../middlewares/jwt')



const api = express.Router();

api.get('/', get);
api.get('/:id', getById)
api.post('/', authenticateAny, validatorNewCreate, create)
api.put('/:id', authenticateAny, validatorNewUpdate, update)
api.delete('/:id', authenticateAny,  destroy)

module.exports = api