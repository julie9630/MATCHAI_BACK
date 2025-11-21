// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

const testRoutes = require('./routes/test.routes');
app.use('/api/test', testRoutes);


// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta simple para probar que el servidor está vivo
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Puerto
const PORT = process.env.PORT || 4000;

// AQUÍ ES DONDE SE QUEDA "ESCUCHANDO"
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
