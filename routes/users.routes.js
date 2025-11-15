var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/users.controller');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/', authenticateAdmin, get);
api.get('/:id', authenticateAdmin, getById)
api.post('/', authenticateAdmin, validatorUserCreate, create)
api.put('/:id',authenticateAdmin, validatorUserUpdate, update)
api.delete('/:id', authenticateAdmin, destroy)


module.exports = api;