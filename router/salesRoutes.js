const { Router } = require('express');
const salesControllers = require('../controllers/productsControllers');

const salesRouter = Router();

salesRouter.post('/products', salesControllers.create);

module.exports = salesRouter;