require('express-async-errors');
const app = require('./app');
const productsRouter = require('./router/productsRouter');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.use('/', productsRouter);

app.use((err, _req, res, _next) => {
  const { message } = err;
  res.status(404).json({ message });
});