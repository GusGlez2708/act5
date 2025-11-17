/**
 * CORRECCIÓN:
 * Se ha modificado la forma en que se importa el modelo.
 * En lugar de: const { NaveImperial } = require('../models');
 * Se importa el objeto 'db' completo, que es el patrón que sigue tu proyecto.
 * Y se usa 'db.NaveImperial' en todas las funciones.
 */
const db = require('../models'); // <-- SE IMPORTA 'db' COMPLETO

const getAllNaves = async () => {
  return await db.NaveImperial.findAll(); // <-- SE USA db.NaveImperial
};

const getNaveById = async (id) => {
  return await db.NaveImperial.findByPk(id); // <-- SE USA db.NaveImperial
};

const createNave = async (naveData) => {
  return await db.NaveImperial.create(naveData); // <-- SE USA db.NaveImperial
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