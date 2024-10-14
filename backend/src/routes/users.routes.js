const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const { authenticateTokenAndRole } = require('../middlewares/auth');

router.post('/register', UserController.handleRegister);
// router.post('/login', UserController.handleLogin);
router.get('/all', UserController.handleGetAllUsers);
// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', authenticateTokenAndRole, UserController.getProfile);
// Ruta para actualizar el perfil del usuario autenticado
router.put('/profile', authenticateTokenAndRole, UserController.updateProfile);
// Ruta para eliminar un usuario, protegido con autenticación y verificación de rol
router.delete('/delete/:id', authenticateTokenAndRole, UserController.handleDeleteUser);



module.exports = router;
