const productsServices = require('../services/productsServices');

const productsControllers = {

  getAll: async (_req, res) => {
    const products = await productsServices.getAll();
    res.status(200).json(products);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    await productsServices.checkIfExists(id);
    const product = await productsServices.findById(id);
    res.status(200).json(product);
  },

  create: async (req, res) => {
    const { name } = req.body;
    await productsServices.validateName(name);
    const newProduct = await productsServices.create(name);
    res.status(201).json(newProduct);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    await productsServices.checkIfExists(id);
    await productsServices.validateName(name);
    const editedProduct = await productsServices.update(name, id);
    res.status(200).json(editedProduct);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await productsServices.checkIfExists(id);
    await productsServices.delete(id);
    res.status(204).end();
  },
};

module.exports = productsControllers;