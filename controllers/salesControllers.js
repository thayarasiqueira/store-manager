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

  // create: async (req, res) => {
  //   const sales = req.body;
  //   const newProduct = await salesServices.create(sales);
  //   res.status(201).json(newProduct);
  // },
};

module.exports = salesControllers;