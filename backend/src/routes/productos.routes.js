const router = require('express').Router();
const ProductoController = require('../controllers/producto.controller');
const { authenticateToken } = require('../middlewares/auth');

router.get('/', ProductoController.handleGetAllProducts);
router.post('/', authenticateToken, ProductoController.handleCreateProduct);

module.exports = router;
