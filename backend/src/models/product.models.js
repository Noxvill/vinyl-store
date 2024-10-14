const { db } = require('../config/db');

const getAllProducts = async (query) => {
    const { categoria, artista, precio_min, precio_max } = query;
    let SQLRequest = "SELECT * FROM productos WHERE 1=1";

    if (categoria) SQLRequest += ` AND categoria_id = ${categoria}`;
    if (artista) SQLRequest += ` AND artista ILIKE '%${artista}%'`;
    if (precio_min) SQLRequest += ` AND precio >= ${precio_min}`;
    if (precio_max) SQLRequest += ` AND precio <= ${precio_max}`;

    const { rows } = await db.query(SQLRequest);
    return rows;
};

const createProduct = async (productoData) => {
    const SQLRequest = `
        INSERT INTO productos (titulo, descripcion, precio, categoria_id, vendedor_id, artista, ano, formato, condicion) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`;
    const { rows } = await db.query(SQLRequest, Object.values(productoData));
    return rows[0];
};

module.exports = { getAllProducts, createProduct };
