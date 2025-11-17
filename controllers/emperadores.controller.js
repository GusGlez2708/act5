const { validationResult } = require('express-validator');
const service = require('../services/emperadores.service');

module.exports = {
  getAllEmperadores: async (req, res) => {
    try {
      const items = await service.getAllEmperadores();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getEmperadorById: async (req, res) => {
    try {
      const item = await service.getEmperadorById(req.params.id);
      if (item) res.status(200).json(item);
      else res.status(404).json({ message: 'Emperador no encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createEmperador: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newItem = await service.createEmperador(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateEmperador: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedItem = await service.updateEmperador(req.params.id, req.body);
      if (updatedItem) res.status(200).json(updatedItem);
      else res.status(404).json({ message: 'Emperador no encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteEmperador: async (req, res) => {
    try {
      const result = await service.deleteEmperador(req.params.id);
      if (result) res.status(200).json({ message: 'Emperador eliminado' });
      else res.status(404).json({ message: 'Emperador no encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};