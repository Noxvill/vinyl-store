const { db } = require('../config/db');
const bcrypt = require('bcrypt');

const all = async () => {
    const SQLRequest = "SELECT * FROM usuarios";
    const { rows } = await db.query(SQLRequest);
    return rows;
};

const findByEmail = async (mail) => {
  try {
    const SQLRequest = 'SELECT * FROM usuarios WHERE mail = $1';
    const values = [mail];
    const { rows } = await db.query(SQLRequest, values);
    console.log('Resultados de la consulta:', rows); // <-- Verifica qué devuelve la consulta
    return rows[0]; // Devuelve el usuario encontrado o undefined si no hay coincidencias
  } catch (error) {
    throw error;
  }
};

  const createUser = async (nombre, mail, contraseña) => {
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const SQLRequest = `
            INSERT INTO usuarios (nombre, mail, contraseña, rol, ubicacion) 
            VALUES ($1, $2, $3, 'comprador', 'Chile') 
            RETURNING id, nombre, mail, rol, fecha_registro, foto_perfil, ubicacion`;
        const { rows } = await db.query(SQLRequest, [nombre, mail, hashedPassword]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};


module.exports = { all, findByEmail, createUser };
