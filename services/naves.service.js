/**
 * ARCHIVO 3 (DE 3)
 * Este archivo es el servicio.
 * Importa el archivo "agregador" (models/index.js) y
 * destructura 'NaveImperial' de él.
 * (Esta es la CORRECCIÓN 3, que es correcta).
 */
const db = require('../models');

const getAllNaves = async () => {
  return await db.NaveImperial.findAll();
};

const getNaveById = async (id) => {
  return await db.NaveImperial.findByPk(id);
};

const createNave = async (naveData) => {
  return await db.NaveImperial.create(naveData);
};

const updateNave = async (id, naveData) => {
  const nave = await getNaveById(id);
  if (nave) {
    return await nave.update(naveData);
  }
  return null;
};

const deleteNave = async (id) => {
  const nave = await getNaveById(id);
  if (nave) {
    await nave.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllNaves,
  getNaveById,
  createNave,
  updateNave,
  deleteNave,
};