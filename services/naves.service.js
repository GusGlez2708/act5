const { NaveImperial } = require('../models');

const getAllNaves = async () => {
  return await NaveImperial.findAll();
};

const getNaveById = async (id) => {
  return await NaveImperial.findByPk(id);
};

const createNave = async (naveData) => {
  return await NaveImperial.create(naveData);
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
