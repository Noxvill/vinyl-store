const User = require('../models/user.models');
const jwt = require('jsonwebtoken');

const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.all();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error');
  }
};

const handleRegister = async (req, res) => {
  const { nombre, mail, contraseña } = req.body;
  const userExists = await User.findByEmail(mail);
  if (userExists) return res.status(400).json({ message: 'Email ya registrado' });

  const newUser = await User.createUser(nombre, mail, contraseña);
  res.status(201).json({ message: 'Usuario registrado exitosamente', newUser });
};

const handleLogin = async (req, res) => {
  const { mail, contraseña } = req.body;
  const user = await User.findByEmail(mail);
  if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
  
  const token = jwt.sign({ id: user.id, nombre: user.nombre }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extrae el ID del usuario autenticado desde el token
    const user = await User.findById(userId); // Encuentra el usuario en la base de datos

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      id: user.id,
      nombre: user.nombre,
      email: user.mail,
      fecha_registro: user.fecha_registro,
      rol: user.rol,
      foto_perfil: user.foto_perfil,
      ubicacion: user.ubicacion,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado a partir del token
  const { nombre, mail, rol, ubicacion } = req.body;

  try {
    // Actualiza el perfil del usuario en la base de datos
    const updatedUser = await User.updateUserProfile(userId, nombre, mail, rol, ubicacion);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Perfil actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


const handleDeleteUser = async (req, res) => {
  try {
    // Verifica si el usuario logueado tiene rol de 'admin'
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No autorizado: necesitas ser admin' });
    }

    const userId = req.params.id;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await User.deleteUser(userId);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


module.exports = { handleGetAllUsers, handleRegister, handleLogin, getProfile, updateProfile, handleDeleteUser };
