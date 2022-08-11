const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');

const productsRouter = Router();

productsRouter.get('/products', productsControllers.getAll);
productsRouter.get('/products/:id', productsControllers.findById);
productsRouter.post('/products', productsControllers.create);

module.exports = productsRouter;