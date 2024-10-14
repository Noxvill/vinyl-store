const router = require('express').Router();
const { register, login } = require('../controllers/auth.controller'); 

// Rutas de autenticación
// router.post('/register', register);
router.post('/login', login);

module.exports = router;
