const db = require('../models'); // Importar el 'cerebro' db

module.exports = {
  getAllNaves: async () => await db.NaveImperial.findAll(),
  getNaveById: async (id) => await db.NaveImperial.findByPk(id),
  createNave: async (naveData) => await db.NaveImperial.create(naveData),
  updateNave: async (id, naveData) => {
    const nave = await db.NaveImperial.findByPk(id);
    if (nave) return await nave.update(naveData);
    return null;
  },
  deleteNave: async (id) => {
    const nave = await db.NaveImperial.findByPk(id);
    if (nave) {
      await nave.destroy();
      return true;
    }
    return false;
  }
};