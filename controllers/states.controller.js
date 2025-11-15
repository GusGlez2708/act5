const stateService = require('../services/states.service');

const get = async (req, res) => {
    try {
        const states = await stateService.getAllStates();
        res.status(200).json({
            success: true,
            message: 'Estados obtenidos correctamente',
            data: states
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await stateService.getStateById(id);
        res.status(200).json({
            success: true,
            message: 'Estado obtenido correctamente',
            data: state
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const state = await stateService.createState(req.body);
        res.status(201).json({
            success: true,
            message: 'Estado creado correctamente',
            data: state
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const state = await stateService.updateState(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Estado actualizado correctamente',
            data: state
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await stateService.deleteState(id);
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    get,
    getById,
    create,
    update,
    destroy
};