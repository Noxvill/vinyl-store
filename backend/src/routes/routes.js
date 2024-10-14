const router = require('express').Router();
const loggerManager = require('../middlewares/loggerManager');
const UsersRouter = require('./users.routes'); 
const AuthRouter = require('./auth.routes'); // Importa correctamente las rutas de autenticación

router.use(loggerManager);
router.use('/users', UsersRouter); 
router.use('/auth', AuthRouter); // Usa el router de autenticación

module.exports = router;

