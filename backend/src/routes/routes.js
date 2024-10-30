const router = require('express').Router();
const loggerManager = require('../middlewares/loggerManager');
const UsersRouter = require('./users.routes'); 
const AuthRouter = require('./auth.routes'); // Importa correctamente las rutas de autenticación
const ProductsRouter = require('./productos.routes')
const BuyRouter = require('./buy.routes'); // Importar la nueva ruta de compras

router.use(loggerManager);
router.use('/users', UsersRouter); 
router.use('/auth', AuthRouter); // Usa el router de autenticación
router.use('/products', ProductsRouter)
router.use('/buys', BuyRouter); // Añadir la ruta de compras

module.exports = router;

