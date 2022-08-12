const productsModels = require('../models/productsModels');

const productsServices = {
  checkIfExists: async (id) => {
    const product = await productsModels.checkIfExists(id);
    return product;
  },

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

  update: async (name, id) => {
    const editedProduct = await productsModels.update(name, id);
    return editedProduct;
  },

  delete: async (id) => {
    await productsModels.delete(id);
  },
};

module.exports = productsServices;