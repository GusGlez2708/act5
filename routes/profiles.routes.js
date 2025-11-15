var express = require('express');

const {get, getById, }  = require('../controllers/profiles.controller');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

api.get('/', get);
api.get('/:id', getById)


module.exports = api;