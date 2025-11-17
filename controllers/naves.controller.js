const { validationResult } = require('express-validator');
const navesService = require('../services/naves.service');

const getAllNaves = async (req, res) => {
  try {
    const naves = await navesService.getAllNaves();
    res.status(200).json(naves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNaveById = async (req, res) => {
  try {
    const { id } = req.params;
    const nave = await navesService.getNaveById(id);
    if (nave) {
      res.status(200).json(nave);
    } else {
      res.status(404).json({ message: 'Nave no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNave = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const naveData = req.body;
    const newNave = await navesService.createNave(naveData);
    res.status(201).json(newNave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNave = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const naveData = req.body;
    const updatedNave = await navesService.updateNave(id, naveData);
    if (updatedNave) {
      res.status(200).json(updatedNave);
    } else {
      res.status(404).json({ message: 'Nave no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNave = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await navesService.deleteNave(id);
    if (result) {
      res.status(200).json({ message: 'Nave eliminada' });
    } else {
      res.status(404).json({ message: 'Nave no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNaves,
  getNaveById,
  createNave,
  updateNave,
  deleteNave,
};
