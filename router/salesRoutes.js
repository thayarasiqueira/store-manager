const { Router } = require('express');
const salesControllers = require('../controllers/salesControllers');

const salesRouter = Router();

salesRouter.post('/sales', salesControllers.create);
salesRouter.get('/sales', salesControllers.getAll);
salesRouter.get('/sales/:id', salesControllers.findById);

module.exports = salesRouter;