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
      res.status(404).json({ message: 'Product not found' });
    }
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

    const product = await productsServices.checkIfExists(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    if (!name) {
      res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    const editedProduct = await productsServices.update(name, id);
    res.status(200).json(editedProduct);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const product = await productsServices.checkIfExists(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    await productsServices.delete(id);
    res.status(204).end();
  },
};

module.exports = productsControllers;