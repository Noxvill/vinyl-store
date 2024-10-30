const router = require('express').Router();
const { authenticateTokenAndRole } = require('../middlewares/auth'); // Middleware de autenticación
const BuyController = require('../controllers/buy.controller');

// Ruta para registrar una compra
router.post('/newbuy', authenticateTokenAndRole, BuyController.handleCreatePurchase);

// Ruta para obtener todas las compras
router.get('/all', BuyController.handleGetAllPurchases);

module.exports = router;
