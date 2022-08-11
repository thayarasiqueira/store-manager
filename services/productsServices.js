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

  create: async (product) => {
    const newProduct = await productsModels.create(product);
    return newProduct;
  },
};

module.exports = productsServices;