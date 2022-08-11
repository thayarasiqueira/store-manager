const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');
const productsRouter = require('./router/productsRouter');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', productsRouter);

app.use((err, _req, res, _next) => {
  const { message, status } = err;
  res.status(status).json({ message });
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;