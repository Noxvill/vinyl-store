const router = require('express').Router();
const { logger } = require('../middlewares/loggerFs');
const loggerManager = require('../middlewares/loggerManager')
const UsersRouter = require('./users.routes'); // Asegúrate de importar correctamente


router.use(loggerManager)
router.use('/users', UsersRouter); // Usa el router de usuarios

module.exports = router;
