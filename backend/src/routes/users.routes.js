const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth');

router.post('/register', UserController.handleRegister);
// router.post('/login', UserController.handleLogin);
router.get('/profile', authenticateToken, UserController.handleGetAllUsers);
router.get('/all', UserController.handleGetAllUsers);

module.exports = router;
