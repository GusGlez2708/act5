const db = require('../models');
module.exports = {
  getAllEmperadores: async () => await db.Emperador.findAll(),
  getEmperadorById: async (id) => await db.Emperador.findByPk(id),
  createEmperador: async (data) => await db.Emperador.create(data),
  updateEmperador: async (id, data) => {
    const item = await db.Emperador.findByPk(id);
    if (item) return await item.update(data);
    return null;
  },
  deleteEmperador: async (id) => {
    const item = await db.Emperador.findByPk(id);
    if (item) {
      await item.destroy();
      return true;
    }
    return false;
  }
};