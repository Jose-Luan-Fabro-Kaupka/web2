const express = require('express');
const cors = require('cors');
const routes = require('./router');
const db = require('../config/db_sequelize');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.use(express.json());

app.use('/api', routes);

db.start()
  .then(() => {
    const PORT = 8081;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao iniciar o banco de dados:', error);
  });
