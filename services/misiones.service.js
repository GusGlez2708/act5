const db = require('../models');
module.exports = {
  getAllMisiones: async () => await db.Mision.findAll(),
  getMisionById: async (id) => await db.Mision.findByPk(id),
  createMision: async (data) => await db.Mision.create(data),
  updateMision: async (id, data) => {
    const item = await db.Mision.findByPk(id);
    if (item) return await item.update(data);
    return null;
  },
  deleteMision: async (id) => {
    const item = await db.Mision.findByPk(id);
    if (item) {
      await item.destroy();
      return true;
    }
    return false;
  }
};