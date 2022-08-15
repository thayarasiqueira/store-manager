const salesServices = require('../services/salesServices');

const salesControllers = {

  getAll: async (_req, res) => {
    const sales = await salesServices.getAll();
    res.status(200).json(sales);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesServices.findById(id);
    await salesServices.checkIfExists(id);
    res.status(200).json(sale);
  },

  create: async (req, res) => {
    const sales = req.body;
    salesServices.validateSale(sales);
    await salesServices.validateProductId(sales);
    const newProduct = await salesServices.create(sales);
    const response = {
      id: newProduct.insertId,
      itemsSold: [...req.body],
    };
    res.status(201).json(response);
  },
};

module.exports = salesControllers;