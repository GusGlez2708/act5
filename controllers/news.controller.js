const newsService = require('../services/news.service');

const get = async (req, res) => {
    try {
        const news = await newsService.getAllNews();
        res.status(200).json({
            success: true,
            message: 'Noticias obtenidas correctamente',
            data: news
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
        const news = await newsService.getNewById(id);
        res.status(200).json({
            success: true,
            message: 'Noticia obtenida correctamente',
            data: news
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const news = await newsService.createNew(req.body);
        res.status(201).json({
            success: true,
            message: 'Noticia creada correctamente',
            data: news
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
        const news = await newsService.updateNew(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Noticia actualizada correctamente',
            data: news
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
        const result = await newsService.deleteNew(id);
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

const getNewsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const news = await newsService.getNewsByCategory(categoryId);
        res.status(200).json({
            success: true,
            message: 'Noticias por categoría obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNewsByState = async (req, res) => {
    try {
        const { stateId } = req.params;
        const news = await newsService.getNewsByState(stateId);
        res.status(200).json({
            success: true,
            message: 'Noticias por estado obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
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
    destroy,
    getNewsByCategory,
    getNewsByState
};