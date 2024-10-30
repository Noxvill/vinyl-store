const { db } = require('../config/db');

// Crear una nueva compra
const createPurchase = async (purchaseData) => {
  const SQLRequest = `
    INSERT INTO compras (producto_id, comprador_id, monto_pagado) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
  const { rows } = await db.query(SQLRequest, [purchaseData.producto_id, purchaseData.comprador_id, purchaseData.monto_pagado]);
  return rows[0];
};

// Obtener todas las compras
const getAllPurchases = async () => {
  const SQLRequest = `SELECT * FROM compras`;
  const { rows } = await db.query(SQLRequest);
  return rows;
};

module.exports = {
  createPurchase,
  getAllPurchases
};
