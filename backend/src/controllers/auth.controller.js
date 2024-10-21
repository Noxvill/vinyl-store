const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login de usuario
const login = async (req, res) => {
  const { mail, contraseña } = req.body;
  try {
    const user = await User.findByEmail(mail);
    console.log('Usuario encontrado:', user); // <-- Para verificar si se encuentra el usuario
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    console.log('¿Contraseña válida?:', validPassword); // <-- Para verificar si la contraseña coincide

    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, mail: user.mail, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar el token y los datos adicionales del usuario en la respuesta
    res.status(200).json({ 
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        mail: user.mail,
        rol: user.rol
      }
    });
  } catch (error) {
    console.log('Error en el login:', error); // <-- Para registrar cualquier error
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  login,
};



module.exports = {
  
  login,
};
