const salesModels = require('../models/salesModels');
const productsServices = require('./productsServices');

const salesServices = {
  validateSale: (sales) => {
    if (!sales.every((sale) => sale.productId)) {
      const err = { status: 400, message: '"productId" is required' };
      throw err;
    }
    if (!sales.every((sale) => sale.quantity !== undefined)) {
      const err = { status: 400, message: '"quantity" is required' };
      throw err;
    }
    if (!sales.every((sale) => sale.quantity > 0)) {
      const err = { status: 422, message: '"quantity" must be greater than or equal to 1' };
      throw err;
    }
  },

  validateProductId: async (sales) => {
    if (sales.length === 1) {
      await productsServices.checkIfExists(sales[0].productId);
    }
    if (sales.length > 1) {
      await productsServices.checkIfExists(sales[0].productId);
      await productsServices.checkIfExists(sales[1].productId);
    }
  },

  checkIfExists: async (id) => {
    const sale = await salesModels.checkIfExists(id);
    if (!sale) {
      const err = { status: 404, message: 'Sale not found' };
      throw err;
    }
  },

  getAll: async () => {
    const sales = await salesModels.getAll();
    return sales;
  },

  findById: async (id) => {
    const sale = await salesModels.findById(id);
    return sale;
  },

  create: async (sales) => {
    const newProduct = await salesModels.create(sales);
    return newProduct;
  },

};

module.exports = salesServices;