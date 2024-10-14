const router = require('express').Router();
const ProductoController = require('../controllers/producto.controller');
const { authenticateTokenAndRole } = require('../middlewares/auth');

router.get('/all', ProductoController.handleGetAllProducts);
router.post('/newproduct', authenticateTokenAndRole, ProductoController.handleCreateProduct);
router.put('/:id', authenticateTokenAndRole, ProductoController.handleUpdateProduct); // Ruta para actualizar productos
router.delete('/:id', authenticateTokenAndRole, ProductoController.handleDeleteProduct); // Ruta para eliminar productos

module.exports = router;
