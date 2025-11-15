var express = require('express');

const { login, register, } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');
const api = express.Router();

api.post('/login', validatorLogin, login);
api.post('/registro', validatorRegister, register)



module.exports = api;