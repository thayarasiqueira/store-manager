const productsModels = require('../models/productsModels');

const productsServices = {

  checkIfExists: async (id) => {
    const product = await productsModels.checkIfExists(id);
    if (!product) {
      const err = { status: 404, message: 'Product not found' };
      throw err;
    }
  },

  validateName: (name) => {
    if (!name) {
      const err = { status: 400, message: '"name" is required' };
      throw err;
    }

    if (name.length < 5) {
      const err = { status: 422, message: '"name" length must be at least 5 characters long' };
      throw err;
    }
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