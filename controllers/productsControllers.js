const productsServices = require('../services/productsServices');

const productsControllers = {
  getAll: async (_req, res) => {
    const products = await productsServices.getAll();
    res.status(200).json(products);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const product = await productsServices.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    res.status(200).json(product);
  },
};

module.exports = productsControllers;