const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
require('dotenv').config();
const { authenticateToken } = require('./middlewares/auth');
const loggerManager = require('./middlewares/loggerManager');

const app = express();

app.use(express.json());

// Configuración de CORS según el entorno
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*' 
    // En producción: solo permite el origen definido en CLIENT_URL, en desarrollo: permite todos los orígenes
}));

app.use(loggerManager);
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});

module.exports = app;
