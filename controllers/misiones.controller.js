const { validationResult } = require('express-validator');
const service = require('../services/misiones.service');

module.exports = {
  getAllMisiones: async (req, res) => {
    try {
      const items = await service.getAllMisiones();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getMisionById: async (req, res) => {
    try {
      const item = await service.getMisionById(req.params.id);
      if (item) res.status(200).json(item);
      else res.status(404).json({ message: 'Misión no encontrada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createMision: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newItem = await service.createMision(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateMision: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedItem = await service.updateMision(req.params.id, req.body);
      if (updatedItem) res.status(200).json(updatedItem);
      else res.status(404).json({ message: 'Misión no encontrada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteMision: async (req, res) => {
    try {
      const result = await service.deleteMision(req.params.id);
      if (result) res.status(200).json({ message: 'Misión eliminada' });
      else res.status(404).json({ message: 'Misión no encontrada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};