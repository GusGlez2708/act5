/**
 * ARCHIVO 3 (DE 3)
 * Este archivo es el servicio.
 * Importa el archivo "agregador" (models/index.js) y
 * destructura 'NaveImperial' de él.
 * (Esta es la CORRECCIÓN 3, que es correcta).
 */
const { NaveImperial } = require('../models'); // <-- Así debe ser la importación

const getAllNaves = async () => {
  return await NaveImperial.findAll(); // <-- Usar NaveImperial directamente
};

const getNaveById = async (id) => {
  return await NaveImperial.findByPk(id); // <-- Usar NaveImperial directamente
};

const createNave = async (naveData) => {
  return await NaveImperial.create(naveData); // <-- Usar NaveImperial directamente
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