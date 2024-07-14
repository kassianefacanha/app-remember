// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Importando rotas
const usersRouter = require('./routes/users');

// Usando rotas
app.use('/users', usersRouter);

// Rota básica
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
