const salesModels = require('../models/salesModels');

const salesServices = {
  getAll: async () => {
    const sales = await salesModels.getAll();
    return sales;
  },

  findById: async (id) => {
    const sale = await salesModels.findById(id);
    return sale;
  },

  // create: async (sales) => {
  //   const salesArray = sales;
  //   if (salesArray.length === 1) {
  //     const newProduct = await salesModels.create(sales);
  //     return newProduct;
  //   }
  // },
};

module.exports = salesServices;