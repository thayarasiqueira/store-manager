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
    if (!name) {
      res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
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