const { db } = require('../config/db');
const bcrypt = require('bcrypt');
const { updateProfile } = require('../controllers/user.controller');

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


const findById = async (id) => {
  const SQLRequest = 'SELECT * FROM usuarios WHERE id = $1';
  const { rows } = await db.query(SQLRequest, [id]);
  return rows[0]; // Devuelve el primer usuario encontrado
};

const updateUserProfile = async (id, nombre, mail, rol, ubicacion) => {
  const SQLRequest = `
    UPDATE usuarios 
    SET nombre = $1, mail = $2, rol = $3, ubicacion = $4 
    WHERE id = $5 
    RETURNING id, nombre, mail, rol, ubicacion;
  `;
  const values = [nombre, mail, rol, ubicacion, id];
  const { rows } = await db.query(SQLRequest, values);
  return rows[0]; // Devuelve el usuario actualizado o undefined si no encuentra coincidencias
};


// const deleteById = async (id) => {
//   try {
//     const SQLRequest = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
//     const { rows } = await db.query(SQLRequest, [id]);
    
//     return rows[0]; // Devuelve el usuario eliminado, si existía
//   } catch (error) {
//     throw error;
//   }
// };

const deleteUser = async (id) => {
  try {
    const SQLRequest = 'DELETE FROM usuarios WHERE id = $1';
    await db.query(SQLRequest, [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = { all, findByEmail, createUser, findById, updateUserProfile, deleteUser };
