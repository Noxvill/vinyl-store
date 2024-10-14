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

module.exports = { handleGetAllUsers, handleRegister, handleLogin };
