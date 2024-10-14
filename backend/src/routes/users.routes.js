const UsersRouter = require('express').Router();
const UserController = require("../controllers/user.controller")


// Ruta para crear un usuario
UsersRouter.post('/create', (req, res) => {
    res.send('usuario creado');
});

// Ruta para obtener un usuario por ID
UsersRouter.get('/get/:id', (req, res) => {
    res.send('Detalle del user');
});

// Ruta para obtener todos los usuarios
UsersRouter.get('/all', UserController.handleGetAllUsers);

// Ruta para eliminar un usuario por ID
UsersRouter.delete('/delete/:id', (req, res) => {
    res.send('user deleted');
});

// Ruta para actualizar un usuario por ID
UsersRouter.put('/update/:id', (req, res) => {
    res.send('usuario actualizado');
});

module.exports = UsersRouter;
