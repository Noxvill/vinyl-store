const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config();
const { authenticateToken } = require('./middlewares/auth');
const loggerManager = require('./middlewares/loggerManager');

const app = express();

app.use(express.json());

// Configuración de CORS para permitir peticiones desde cualquier origen
app.use(cors({
    origin: '*',  // Permitir peticiones desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
}));

app.use(loggerManager);
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});

module.exports = app;
