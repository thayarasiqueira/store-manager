const productsModels = require('../models/productsModels');

const productsServices = {
  getAll: async () => {
    const products = await productsModels.getAll();
    return products;
  },

  findById: async (id) => {
    const product = await productsModels.findById(id);
    return product;
  },
};

module.exports = productsServices;